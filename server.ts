import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---- TUS RUTAS DE API AQUÍ ----
const apiRouter = express.Router();

// Middleware logging for API
apiRouter.use((req, res, next) => {
  console.log(`[API LOG] ${req.method} ${req.url}`);
  next();
});

apiRouter.get("/health", (req, res) => {
  console.log("API: Health check requested");
  res.json({ status: "ok", message: "La API integrada funciona correctamente" });
});

// Proxy Seguro para el Tutor IA
apiRouter.post("/chat", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "Servicio de IA no configurado en el servidor Vercel. Verifica las Variables de Entorno." 
      });
    }

    const { messages, model, systemInstruction } = req.body;
    
    // Importación dinámica para evitar problemas en el build si no es necesario
    const { GoogleGenAI } = await import("@google/genai");
    const genAI = new GoogleGenAI({ apiKey });
    const generativeModel = genAI.getGenerativeModel({ 
      model: model || "gemini-3-flash-preview",
      systemInstruction: systemInstruction 
    });

    const result = await generativeModel.generateContent({ contents: messages });
    res.json({ text: result.response.text() });
  } catch (error: any) {
    console.error("Error en Proxy Vercel:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
});

apiRouter.get("/users", (req, res) => {
  console.log("API: Users requested - Sending 3 demo users");
  res.json([
    { id: 1, name: "Ana P.", email: "ana@example.com" },
    { id: 2, name: "Carlos M.", email: "carlos@example.com" },
    { id: 3, name: "Elena R.", email: "elena@example.com" }
  ]);
});

app.use("/api", apiRouter);
// --------------------------------

// El servidor solo maneja la API en Vercel. En local maneja también el frontend.
const isVercel = !!process.env.VERCEL;
const isProduction = process.env.NODE_ENV === "production" || isVercel;

if (!isProduction && !isVercel) {
  // Solo cargamos Vite en desarrollo local
  import("vite").then(async ({ createServer: createViteServer }) => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }).catch(err => {
    console.error("Error al cargar Vite:", err);
  });
} else if (!isVercel) {
  // En producción local (Cloud Run), servimos los archivos estáticos
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}
// En Vercel, el ruteo se define en vercel.json

// Iniciar servidor local si NO estamos en Vercel
const PORT_TO_LISTEN = Number(process.env.PORT) || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT_TO_LISTEN, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT_TO_LISTEN}`);
  });
}

// Exportar la app para que Vercel pueda usarla como función serverless
export default app;
