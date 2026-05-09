import React, { useState } from "react";
import {
  Stethoscope,
  FileText,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Layers,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";
import { getAIClient, DEFAULT_MODEL, DEFAULT_GENERATION_CONFIG } from "../lib/gemini";

const topics = [
  "Mecánica Ventilatoria",
  "Intercambio Gaseoso y Difusión",
  "Relación V/Q",
  "Transporte de O₂ y CO₂",
  "Tejido Sanguíneo y Hemoglobina",
  "Integración Cardiorrespiratoria",
];

const difficulties = [
  "Básico (Conceptos Fundamentales)",
  "Intermedio (Patología Común)",
  "Avanzado (Análisis Complejo)",
];

export default function ClinicalCasesSection() {
  const [topic, setTopic] = useState(topics[0]);
  const [difficulty, setDifficulty] = useState(difficulties[1]);
  const [caseContent, setCaseContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCase = async () => {
    setIsLoading(true);
    setError(null);
    setCaseContent("");

    try {
      const prompt = `Actúa como un médico profesor experto en Ciencias Biomédicas. Crea un CASO CLÍNICO INTEGRADOR original e inédito para un estudiante de medicina sobre el tema: "${topic}" con una dificultad: "${difficulty}". 
      
      El caso debe estar estructurado en formato Markdown utilizando este esquema exacto:
      
      ### 🏥 Presentación del Paciente
      [Incluye edad, sexo, motivo de consulta y signos vitales clave].
      
      ### 📋 Historia Clínica y Examen Físico
      [Describe los antecedentes, hallazgos a la auscultación, inspección y resultados de pruebas complementarias básicas relevantes, como espirometría o gases en sangre si aplica].
      
      ### 🤔 Preguntas de Razonamiento
      1. [Pregunta que integre la anatomía/histología con el problema del paciente].
      2. [Pregunta sobre el mecanismo fisiopatológico subyacente].
      3. [Pregunta sobre la consecuencia funcional o cómo el cuerpo intenta compensar].
      
      ***
      
      ### 💡 Resolución Razonada (Paso a Paso)
      [Proporciona las respuestas a las preguntas anteriores con un razonamiento lógico y paso a paso. Menciona específicamente cómo se altera la fisiología normal (repasando conceptos de Guyton) y la base estructural (Moore/Ross) de esa alteración].`;

      const aiClient = getAIClient();
      if (!aiClient) throw new Error("Motor IA no configurado.");

      const result = await aiClient.models.generateContentStream({
        model: DEFAULT_MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: DEFAULT_GENERATION_CONFIG,
      });

      let fullText = "";
      for await (const chunk of result) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          setCaseContent(fullText);
        }
      }
      
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.message || String(err);

      setIsLoading(false);
      
      if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("limit")) {
        setError("Limite de capacidad alcanzado temporalmente. Por favor, intenta de nuevo en unos minutos.");
      } else if (errorMessage.includes("404")) {
        setError("Error de carga del generador (404). El modelo no está disponible en esta región.");
      } else if (errorMessage.includes("403") || errorMessage.includes("400")) {
        setError("Error de Acceso (403/400). Hay un problema con la configuración de seguridad. Contacta con el administrador.");
      } else {
        setError("No pudimos generar el caso clínico. Verifica tu conexión.");
      }
    }
  };

  return (
    <section className="space-y-8 pb-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Casos Clínicos Integradores
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Genera casos clínicos en tiempo real utilizando la IA para poner a
          prueba tu razonamiento fisiopatológico y tu capacidad de integrar la
          estructura con la función.
        </p>
      </header>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Topic Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" /> Tema Principal
            </label>
            <div className="flex flex-col gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-left text-sm transition-all border",
                    topic === t
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold shadow-sm"
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection & Generate Button */}
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" /> Dificultad
              </label>
              <div className="flex flex-col gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-left text-sm transition-all border",
                      difficulty === d
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold shadow-sm"
                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => generateCase()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-2xl font-bold shadow-md shadow-emerald-200 transition-all disabled:opacity-70 disabled:hover:bg-emerald-600"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Generando
                  caso...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generar Caso Clínico
                </>
              )}
            </button>
            <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-100 mt-2">
              <div className="flex items-center gap-1.5 overflow-hidden">
                 <div className="flex gap-0.5">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-2 h-4 bg-emerald-500 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                   ))}
                 </div>
                 <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">Motor Gemini 2.5 Flash X-Force (Fase 3)</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100/50 px-2 rounded-full">Optimizado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Area */}
      {error && (
        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {caseContent && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <div className="markdown-body">
            <ReactMarkdown>{caseContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </section>
  );
}
