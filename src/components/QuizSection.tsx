import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  BookOpen,
  ChevronRight,
  BrainCircuit,
  Settings2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getAIClient, DEFAULT_MODEL, DEFAULT_GENERATION_CONFIG } from "../lib/gemini";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subtopic: string;
}

type Difficulty = "Basal" | "Intermedio" | "Avanzado";

export default function QuizSection() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Basal");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      setError("Por favor, ingresa un tema para el cuestionario.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setWrongAnswers([]);

    try {
      const prompt = `Actúa como un profesor de medicina experto. Crea un cuestionario de 5 preguntas de opción múltiple con dificultad "${difficulty}" sobre el tema: "${topic}". 
      Cada pregunta debe tener 4 opciones (A, B, C, D) y solo una respuesta correcta.
      Basado en la bibliografía médica clásica (Guyton, Netter, Moore, Ross).
      
      IMPORTANTE: Devuelve la respuesta ÚNICAMENTE en el siguiente formato JSON estrictamente válido, sin texto adicional antes o después:
      
      [
        {
          "question": "Texto de la pregunta",
          "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
          "correctAnswer": 0, // Índice de la respuesta correcta (0 para A, 1 para B, etc.)
          "explanation": "Explicación detallada de por qué es la respuesta correcta basada en fisiología/anatomía",
          "subtopic": "Nombre específico del subtema (ej: Fisiología de la hemostasia, Estructura del Alvéolo)"
        }
      ]`;

      const aiClient = getAIClient();
      const result = await aiClient.models.generateContent({
        model: DEFAULT_MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: DEFAULT_GENERATION_CONFIG,
      });

      const responseText = result.text;
      const cleanJson = responseText.replace(/```json|```/g, "").trim();
      const parsedQuestions = JSON.parse(cleanJson);

      if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
        setQuestions(parsedQuestions);
        setIsQuizStarted(true);
      } else {
        throw new Error("No se pudieron generar preguntas válidas.");
      }
      
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err?.message || String(err);

      setIsLoading(false);
      
      if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("limit")) {
        setError("Capacidad máxima alcanzada temporalmente. El Tutor ARTI 3 está atendiendo a muchos estudiantes en este momento. Por favor, intenta de nuevo en unos minutos.");
      } else if (errorMessage.includes("404")) {
        setError("Error de configuración del modelo (404). Por favor, refresca la página (Ctrl+F5) para cargar la última versión del Tutor.");
      } else if (errorMessage.includes("403") || errorMessage.includes("400")) {
        setError("Error Crítico (403/400): Problema con la Clave API o Región. Por favor, genera una nueva clave gratuita en https://aistudio.google.com/app/apikey y pégala en 'Configuración IA' para reactivar el Tutor.");
      } else {
        setError("Error al generar el cuestionario (Motor 2.5). Asegúrate de tener una conexión estable y una clave API válida.");
      }
    }
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setIsQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setWrongAnswers([]);
  };

  return (
    <section className="relative space-y-8 pb-12 overflow-hidden">
      <header className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Cuestionarios de Práctica (IA)
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Pon a prueba tus conocimientos con cuestionarios personalizados generados por IA. 
          Elige un tema y deja que el Tutor ARTI 3 diseñe el examen para ti.
        </p>
      </header>

      <div className="relative z-10">
        {!isQuizStarted ? (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-indigo-500" /> Configuración del Cuestionario
              </label>
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500">Tema</span>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ej: Potencial de Acción Cardíaco, Filtrado Glomerular..."
                    className="w-full p-4 rounded-2xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500">Dificultad</span>
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                    {(["Basal", "Intermedio", "Avanzado"] as Difficulty[]).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all",
                          difficulty === d 
                            ? "bg-white text-indigo-600 shadow-sm" 
                            : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => generateQuiz()}
                  disabled={isLoading || !topic.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" /> Generando cuestionario...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Crear Cuestionario
                    </>
                  )}
                </button>
                <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                    </div>
                    <span className="text-[8px] font-black text-indigo-500 uppercase tracking-tighter">Motor Gemini 2.5 Flash X-Force Activo</span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-medium">Latencia: Ultra Low</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
               {["Fisiología Respiratoria", "Ciclo Cardíaco", "Anatomía de Pelvis", "Histología de Hígado"].map(sug => (
                 <button 
                  key={sug}
                  onClick={() => setTopic(sug)}
                  className="flex items-center gap-2 p-3 text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-dashed border-slate-200 transition-all text-left bg-white/50"
                 >
                   <BookOpen className="w-4 h-4" />
                   {sug}
                 </button>
               ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {showResult ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6"
              >
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800">¡Cuestionario Completado!</h3>
                <div className="space-y-2">
                  <p className="text-slate-500 font-medium">Tu puntuación final es:</p>
                  <div className="text-6xl font-black text-indigo-600">
                    {score} / {questions.length}
                  </div>
                </div>

                {wrongAnswers.length > 0 && (
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-left space-y-4 max-w-xl mx-auto">
                    <div className="flex items-center gap-2 text-amber-700 font-bold">
                      <AlertCircle className="w-5 h-5" />
                      Áreas que necesitas reforzar
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(wrongAnswers.map(q => q.subtopic))).map((st, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-amber-200 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
                          {st}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-amber-800 leading-relaxed italic">
                      "Para mejorar tu puntaje, te recomiendo revisar la bibliografía específica de los temas marcados arriba."
                    </p>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg"
                  >
                    Volver a Comenzar
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="bg-slate-200/50 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    className="bg-indigo-600 h-full"
                  />
                </div>

                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 min-h-[400px] flex flex-col">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                      Pregunta {currentQuestionIndex + 1} de {questions.length}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                      {questions[currentQuestionIndex].question}
                    </h3>
                  </div>

                  <div className="flex-1 space-y-3">
                    {questions[currentQuestionIndex].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === questions[currentQuestionIndex].correctAnswer;
                      const showFeedback = selectedOption !== null;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          disabled={showFeedback}
                          className={cn(
                            "w-full p-5 rounded-2xl text-left transition-all border-2 flex items-center justify-between group bg-white/50",
                            !showFeedback && "hover:bg-indigo-50 hover:border-indigo-200 border-slate-100 text-slate-600",
                            showFeedback && isCorrect && "bg-emerald-50 border-emerald-500 text-emerald-800",
                            showFeedback && isSelected && !isCorrect && "bg-red-50 border-red-500 text-red-800",
                            showFeedback && !isSelected && !isCorrect && "opacity-50 border-slate-100"
                          )}
                        >
                          <span className="font-medium">{option}</span>
                          {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                          {showFeedback && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-600" />}
                          {!showFeedback && <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedOption !== null && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
                          <HelpCircle className="w-4 h-4" /> Explicación
                        </div>
                        <div className="text-slate-600 text-sm leading-relaxed markdown-sm">
                          <ReactMarkdown>
                            {questions[currentQuestionIndex].explanation}
                          </ReactMarkdown>
                        </div>
                        <button
                          onClick={nextQuestion}
                          className="w-full mt-4 bg-slate-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all font-sans"
                        >
                          {currentQuestionIndex === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"} 
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}

        {error && !isQuizStarted && (
          <div className="flex items-center gap-3 text-red-600 bg-red-50/80 backdrop-blur-sm p-4 rounded-2xl border border-red-100 mt-6">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}
