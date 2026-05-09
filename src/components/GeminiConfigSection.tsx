import React, { useState, useEffect } from "react";
import { ShieldCheck, AlertCircle, Sparkles, Download, Globe, Server, KeyRound, LogOut, CheckCircle2 } from "lucide-react";
import { DEFAULT_MODEL, getCustomKey, setCustomKey, removeCustomKey, getAIClient, isUsingCustomKey } from "../lib/gemini";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export default function GeminiConfigSection() {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = getCustomKey();
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
      setStatus("success");
    }
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setErrorMessage("Por favor, introduce una clave antes de guardar.");
      setStatus("error");
      return;
    }

    setStatus("testing");
    setErrorMessage(null);

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const testClient = new GoogleGenAI({ apiKey: apiKey.trim() });
      
      const result = await testClient.models.generateContent({
        model: DEFAULT_MODEL,
        contents: [{ role: "user", parts: [{ text: "Hola" }] }],
      });
      
      if (result.text) {
        setCustomKey(apiKey.trim());
        setIsSaved(true);
        setStatus("success");
      }
    } catch (err: any) {
      console.error("Test error:", err);
      setStatus("error");
      setErrorMessage("La clave API no es válida o no tiene permisos: " + (err?.message || String(err)));
    }
  };

  const handleClear = () => {
    removeCustomKey();
    setApiKey("");
    setIsSaved(false);
    setStatus("idle");
    setErrorMessage(null);
  };

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <KeyRound className="w-8 h-8 text-rose-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Configuración Personalizada
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Si no puedes usar los Secrets del sistema, puedes pegar tu clave directamente aquí. Se guardará solo en tu navegador.
        </p>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Clave API Personalizada
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type={isSaved ? "password" : "text"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  if (status === "success") setStatus("idle");
                }}
                disabled={isSaved || status === "testing"}
                placeholder="Pega tu clave AIzaSy aquí..."
                className={cn(
                  "flex-1 p-4 rounded-2xl border-2 transition-all outline-none font-mono text-sm",
                  status === "success" ? "border-emerald-200 bg-emerald-50/30 text-emerald-800" : 
                  status === "error" ? "border-red-200 bg-red-50/30 text-red-800" :
                  "border-slate-100 bg-slate-50 focus:border-rose-400 focus:bg-white"
                )}
              />
              {isSaved ? (
                <button
                  onClick={handleClear}
                  className="px-6 py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Cambiar Clave
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={status === "testing" || !apiKey.trim()}
                  className="px-8 py-4 bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 rounded-2xl font-bold shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2"
                >
                  {status === "testing" ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" /> Validando...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" /> Activar Tutor
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm font-medium flex gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {errorMessage}
              </motion.div>
            )}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-sm font-medium flex gap-3"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                ¡Clave activada correctamente! El Tutor ARTI 3 está listo para usarse.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4">
          <Server className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="font-bold text-indigo-900">Uso de Clave Gratuita</h4>
            <p className="text-sm text-indigo-800 leading-relaxed">
              Puedes obtener una clave gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline font-bold">Google AI Studio</a>. Esta clave tiene límites de cuota, pero es suficiente para uso personal o pequeños grupos de estudio.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" /> Estado del Motor IA
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">Modelo Activo</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-bold text-slate-700 font-bold">{DEFAULT_MODEL}</p>
                <div className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full animate-pulse">OPTIMIZADO</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">Fuente de Autenticación</p>
              <p className="font-bold text-slate-700">
                {isUsingCustomKey() ? "Clave Personalizada (Navegador)" : "Secrets (Seguro)"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-500" /> Exportar ARTI 3 a GitHub / ZIP
          </h4>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              Para obtener el código fuente completo y subirlo a tu propio repositorio o descargarlo:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <p className="text-sm text-slate-600 italic">Menu lateral Ajustes &gt; <strong>"Export to GitHub"</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <p className="text-sm text-slate-600 italic">O bien usa <strong>"Export to ZIP"</strong> para descarga directa.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-500" /> Exportar ARTI 3 a GitHub / ZIP
          </h4>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              Para obtener el código fuente completo y subirlo a tu propio repositorio o descargarlo:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <p className="text-sm text-slate-600 italic">Menu lateral Ajustes &gt; <strong>"Export to GitHub"</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <p className="text-sm text-slate-600 italic">O bien usa <strong>"Export to ZIP"</strong> para descarga directa.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-rose-500" /> Cómo compartir ARTI 3
          </h4>
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 uppercase tracking-wider text-[10px] font-black text-rose-800 text-center">
            Usa el botón "Share" en la parte superior derecha para generar un enlace público funcional. 
          </div>
        </div>
      </div>
    </section>
  );
}
