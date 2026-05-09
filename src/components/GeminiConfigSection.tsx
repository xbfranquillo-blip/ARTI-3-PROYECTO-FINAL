import React, { useState, useEffect } from "react";
import { KeyRound, ShieldCheck, AlertCircle, CheckCircle2, Sparkles, LogOut, Info, ExternalLink, Globe } from "lucide-react";
import { getCustomKey, setCustomKey, removeCustomKey, getCustomBaseUrl, setCustomBaseUrl, removeCustomBaseUrl, getAIClient, DEFAULT_MODEL, isUsingMasterKey } from "../lib/gemini";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Download } from "lucide-react";

export default function GeminiConfigSection() {
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = getCustomKey();
    const savedUrl = getCustomBaseUrl();
    if (savedKey) {
      setApiKey(savedKey);
      setBaseUrl(savedUrl || "");
      setIsSaved(true);
      setStatus("success");
    }
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError("Por favor, introduce una clave antes de guardar.");
      return;
    }

    setStatus("testing");
    setErrorMessage(null);

    try {
      // Temporarily set to test
      setCustomKey(apiKey.trim());
      if (baseUrl.trim()) setCustomBaseUrl(baseUrl.trim()); else removeCustomBaseUrl();

      const client = getAIClient();
      
      const result = await client.models.generateContent({
        model: DEFAULT_MODEL,
        contents: [{ role: "user", parts: [{ text: "Hola" }] }],
      });

      if (result.text) {
        setIsSaved(true);
        setStatus("success");
      }
    } catch (err: any) {
      console.error("Test error:", err);
      // Revert on failure
      if (!isSaved) {
        removeCustomKey();
        removeCustomBaseUrl();
      }
      setStatus("error");
      const msg = err?.message || String(err);
      if (msg.includes("401") || msg.includes("API_KEY_INVALID")) {
        setError("La clave API no es válida para este endpoint.");
      } else if (msg.includes("429")) {
        setError("Límite de frecuencia excedido (429). La clave es válida pero está saturada.");
      } else if (msg.includes("fetch")) {
        setError("Error de red. Verifica que la URL del endpoint sea correcta y accesible.");
      } else {
        setError("Error al validar: " + msg);
      }
    }
  };

  const handleClear = () => {
    removeCustomKey();
    removeCustomBaseUrl();
    setApiKey("");
    setBaseUrl("");
    setIsSaved(false);
    setStatus("idle");
    setErrorMessage(null);
  };

  const setError = (msg: string) => {
    setErrorMessage(msg);
    setStatus("error");
  };

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <KeyRound className="w-8 h-8 text-rose-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Configuración del Tutor IA
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Configura tu propia clave o un proxy para aumentar la capacidad y evitar límites de cuota con tus estudiantes.
        </p>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
          <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="font-bold text-blue-900">¿Tienes un servidor intermedio o proxy?</h4>
            <p className="text-sm text-blue-800">
              Si usas un servidor propio o un servicio que requiere el encabezado <code>Authorization: TU_CLAVE</code>, introduce la URL base abajo. De lo contrario, deja el campo vacío para usar Google AI Studio directamente.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Campo de Clave API */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Clave API (API Key)
            </label>
            <input
              type={isSaved ? "password" : "text"}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                if (status === "success") setStatus("idle");
              }}
              disabled={isSaved || status === "testing"}
              placeholder="AIzaSy..."
              className={cn(
                "w-full p-4 rounded-2xl border-2 transition-all outline-none font-mono text-sm",
                status === "success" ? "border-emerald-200 bg-emerald-50/30 text-emerald-800" : 
                status === "error" ? "border-red-200 bg-red-50/30 text-red-800" :
                "border-slate-100 bg-slate-50 focus:border-rose-400 focus:bg-white"
              )}
            />
          </div>

          {/* Campo de URL Base */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-500" /> Endpoint URL (Opcional)
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => {
                setBaseUrl(e.target.value);
                if (status === "success") setStatus("idle");
              }}
              disabled={isSaved || status === "testing"}
              placeholder="https://tu-proxy-api.com/v1"
              className={cn(
                "w-full p-4 rounded-2xl border-2 transition-all outline-none font-mono text-sm",
                status === "success" ? "border-emerald-200 bg-emerald-50/30 text-emerald-800" : 
                status === "error" ? "border-red-200 bg-red-50/30 text-red-800" :
                "border-slate-100 bg-slate-50 focus:border-indigo-400 focus:bg-white"
              )}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            {isSaved ? (
              <button
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-2xl font-bold transition-all"
              >
                <LogOut className="w-5 h-5" /> Borrar Configuración
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={status === "testing" || !apiKey.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 rounded-2xl font-bold shadow-lg shadow-rose-200 transition-all"
              >
                {status === "testing" ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" /> Conectando...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" /> Guardar y Activar
                  </>
                )}
              </button>
            )}
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {errorMessage}
              </motion.div>
            )}
            
            {status === "success" && !errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                ¡Conexión establecida! El Tutor ARTI 3 usará ahora tu clave personalizada.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4 mt-6">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="font-bold text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              ¿Tienes errores 403 o 400?
            </h4>
            <p className="text-sm text-amber-800">
              Esto significa que tu Clave API actual no es válida o no tiene permisos. Para solucionarlo:
            </p>
            <ol className="text-xs text-amber-700 list-decimal ml-4 space-y-1">
              <li>Ve a <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline font-bold">Google AI Studio</a> y genera una clave gratuita.</li>
              <li>Pégala arriba en <strong>"Clave API Personalizada"</strong> y pulsa Guardar.</li>
              <li>Si persiste, pégala en el menú <strong>Secrets</strong> de la plataforma con el nombre <code className="bg-amber-100 px-1 rounded">GEMINI_API_KEY</code>.</li>
            </ol>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" /> Estado del Servicio ARTI 3
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">Motor del Sistema</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-bold text-slate-700">Gemini (Optimizado)</p>
                <div className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full animate-pulse">ACTIVO</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">Origen de la Clave</p>
              <p className="font-bold text-slate-700">
                {isSaved ? "Clave Personalizada (Full Access)" : (isUsingMasterKey() ? "Sistema X-Force (Clave Maestra)" : "Configuración de Plataforma")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-500" /> Exportar ARTI 3 a GitHub / ZIP
          </h4>
          <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              Para obtener el código fuente completo y subirlo a tu propio <strong>GitHub</strong> o descargarlo como <strong>ZIP</strong>, sigue estos pasos en esta plataforma (AI Studio):
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <p className="text-sm text-slate-600">Busca el icono de <strong>Ajustes (Settings)</strong> en el menú lateral de la izquierda (abajo).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <p className="text-sm text-slate-600">Haz clic en el botón que dice <span className="font-bold text-slate-800">"Export to GitHub"</span> para vincular tu cuenta y subir el repositorio.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                <p className="text-sm text-slate-600">Alternativamente, usa <span className="font-bold text-slate-800">"Export to ZIP"</span> para descargar todos los archivos directamente.</p>
              </div>
            </div>
            
            <div className="p-4 bg-white/50 rounded-xl border border-indigo-100/50 text-xs text-slate-500 italic">
              <strong>Nota técnica:</strong> Una vez descargado, el proyecto requiere <code className="bg-slate-100 px-1 rounded text-indigo-600">npm install</code> y <code className="bg-slate-100 px-1 rounded text-indigo-600">npm run dev</code> para ejecutarse localmente.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-rose-500" /> Enlace de la Aplicación (App Link)
          </h4>
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
            <p className="text-sm text-slate-600 mb-4">
              Para obtener el <strong>link tal cual</strong> para que otros lo usen, haz clic en el botón <strong>"Share"</strong> arriba a la derecha de esta interfaz. Eso generará un enlace público funcional. 
            </p>
            <div className="text-xs text-rose-700/70 font-medium">
              Nota: En el enlace compartido, asegúrate de que la Clave Maestra esté activa o de que tus usuarios configuren su propia clave en esta sección si el motor IA no responde.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
