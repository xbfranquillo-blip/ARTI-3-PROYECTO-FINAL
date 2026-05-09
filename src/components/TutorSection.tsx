import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, AlertCircle, Image as ImageIcon, X, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import ReactMarkdown from "react-markdown";
import { getAIClient, DEFAULT_MODEL, DEFAULT_GENERATION_CONFIG } from "../lib/gemini";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  image?: string; // Base64 image
}

export default function TutorSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "¡Hola Franco! Soy tu tutor de IA especializado en Fisiología Respiratoria. Puedes preguntarme sobre anatomía, histología, mecánica ventilatoria, intercambio de gases o consultas sobre la bibliografía (Guyton, Netter, Ross, etc.). ¡Ahora también puedes enviarme imágenes para que las analicemos juntos! ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("La imagen es demasiado grande. Por favor usa una de menos de 4MB.");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;
    if (!input.trim() && !selectedImage) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
      image: imagePreview || undefined,
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const currentImage = selectedImage;
    const currentPreview = imagePreview;
    removeImage();

    setIsLoading(true);
    setError(null);

    await processRequest(userMsg, currentImage, currentPreview);
  };

  const processRequest = async (userMsg: Message, imageFile: File | null, imageBase64: string | null) => {
    const history = messages.slice(1).map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    try {
      const customKey = localStorage.getItem("arti3_custom_api_key");
      const systemInstruction = "Eres un tutor médico experto especializado en Ciencias Biomédicas para estudiantes de medicina. Tu nombre es 'Tutor ARTI 3'. Tu tarea es responder preguntas usando terminología médica precisa, basándote en la bibliografía médica clásica (Guyton y Hall para fisiología, Netter para anatomía, Ross para histología, Moore para anatomía clínica). Si se te proporciona una imagen, analízala con rigor académico, identificando estructuras o procesos fisiopatológicos visibles. IMPORTANTE: Genera siempre un RAZONAMIENTO PASO A PASO en tus respuestas, deduciendo la respuesta a partir de principios básicos anatómicos, histológicos y fisiológicos antes de dar la conclusión final. Sé directo, didáctico y organiza tus respuestas con viñetas o negritas.";
      
      const parts: any[] = [{ text: userMsg.text || "Analiza esta imagen médica." }];
      
      if (imageFile) {
        parts.push(await fileToGenerativePart(imageFile));
      } else if (imageBase64) {
        const mimeType = imageBase64.split(";")[0].split(":")[1];
        const data = imageBase64.split(",")[1];
        parts.push({ inlineData: { data, mimeType } });
      }

      history.push({ role: "user", parts });

      // MODO PRODUCCIÓN: Si NO hay clave personalizada, usamos nuestro propio servidor (Seguro para salir a la venta)
      if (!customKey) {
        console.log("Tutor ARTI 3: Usando canal seguro (Proxy Servidor)");
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            model: DEFAULT_MODEL,
            config: DEFAULT_GENERATION_CONFIG,
            systemInstruction
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error del servidor (${response.status})`);
        }

        const data = await response.json();
        const modelMsgId = (Date.now() + 1).toString();
        setMessages((prev) => [
          ...prev,
          { id: modelMsgId, role: "model", text: data.text },
        ]);
        setIsLoading(false);
        return;
      }

      // MODO PERSONALIZADO: Si el usuario puso su propia clave en configuración
      console.log("Tutor ARTI 3: Usando clave personalizada del usuario");
      const aiClient = getAIClient();
      const result = await aiClient.models.generateContentStream({
        model: DEFAULT_MODEL,
        contents: history,
        config: {
          ...DEFAULT_GENERATION_CONFIG,
          systemInstruction,
        },
      });

      const modelMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: modelMsgId, role: "model", text: "" },
      ]);

      let fullResponse = "";
      for await (const chunk of result) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullResponse += chunkText;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg,
            ),
          );
        }
      }
      
      setIsLoading(false);
    } catch (err: any) {
      console.error("Error generating response:", err);
      const errorMessage = err?.message || String(err);

      setIsLoading(false);
      if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("limit")) {
        setError("El Tutor ARTI 3 ha alcanzado su límite de consultas por hoy debido al alto tráfico. Por favor, intenta de nuevo en unos minutos.");
      } else if (errorMessage.includes("404")) {
        setError("Error de conexión (404). Por favor, intenta refrescar la página completamente (Ctrl+F5) para actualizar el Tutor ARTI 3.");
      } else if (errorMessage.includes("403") || errorMessage.includes("400")) {
        setError("Error Crítico (403/400): Problema con la Clave API o Región en el Núcleo 2.5 Flash. Genera una clave nueva en https://aistudio.google.com/app/apikey y pégala en 'Configuración IA' para restaurar el servicio.");
      } else {
        setError("Error Crítico: No pudimos obtener respuesta del Núcleo 2.5. Verifica tu clave API en la sección de Configuración.");
      }
      setMessages((prev) => prev.filter((msg) => msg.id !== userMsg.id));
    }
  };

  return (
    <section className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col space-y-6">
      <header className="space-y-4 shrink-0">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Tutor IA: Análisis Integrador
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Consultas bibliográficas y análisis de imágenes médicas con IA.
        </p>
      </header>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-indigo-100 text-indigo-600",
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>

                <div
                  className={cn(
                    "px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm flex flex-col gap-3",
                    msg.role === "user"
                      ? "bg-blue-600 text-white font-medium rounded-tr-none"
                      : "bg-white border border-slate-200 text-slate-700 rounded-tl-none",
                  )}
                >
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt="Uploaded medical content" 
                      className="max-w-full rounded-lg border border-white/20 shadow-md"
                    />
                  )}
                  {msg.role === "model" ? (
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 max-w-[85%] mr-auto"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 rounded-tl-none flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse text-indigo-400" />
                  <span className="text-sm font-medium animate-pulse">
                    ARTI 3 está razonando...
                  </span>
                </div>
              </motion.div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg mx-auto max-w-md text-sm border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <AnimatePresence>
            {imagePreview && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 relative inline-block group"
              >
                <img src={imagePreview} className="h-24 w-auto rounded-xl border border-slate-200 object-cover shadow-sm" alt="Preview" />
                <button 
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-3 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-1">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 rounded-2xl transition-all shadow-sm border border-slate-200"
                title="Subir imagen médica"
                disabled={isLoading}
              >
                <ImageIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex-1 group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Escribe tu duda médica..."
                className="w-full resize-none rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 min-h-[52px] max-h-[200px]"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="h-[52px] w-[52px] rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2 pb-1 border-t border-slate-50 pt-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 overflow-hidden">
               <div className="flex gap-0.5">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-1.5 h-3 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ animationDelay: `${i * 0.2}s` }} />
                 ))}
               </div>
               <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">Capacidad IA Optimizada (Tokens v2)</span>
            </div>
            <p className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              <Sparkles className="w-3 h-3 fill-indigo-500" />
              Núcleo Gemini 3 Flash (Optimización de Tráfico)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
