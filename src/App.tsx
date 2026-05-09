/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Activity, 
  BookOpen, 
  Microscope, 
  Wind, 
  Combine, 
  BarChart3, 
  Menu, 
  X, 
  GraduationCap,
  Waves,
  Stethoscope,
  ChevronRight,
  Droplet,
  Bot,
  HeartPulse,
  Heart,
  Dna,
  Syringe,
  Pill,
  CircleDot,
  Server,
  HelpCircle,
  Brain,
  Lock,
  KeyRound,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

// Sections
import WelcomeSection from './components/WelcomeSection';
import AnatomySection from './components/AnatomySection';
import HistologySection from './components/HistologySection';
import PhysiologySection from './components/PhysiologySection';
import BloodSection from './components/BloodSection';
import IntegrationSection from './components/IntegrationSection';
import Bibliography from './components/Bibliography';
import TutorSection from './components/TutorSection';
import ClinicalCasesSection from './components/ClinicalCasesSection';
import QuizSection from './components/QuizSection';
import GeminiConfigSection from './components/GeminiConfigSection';

const AnatomicalHeart = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" fillOpacity="0.4" />
    <path d="M12 5v4M10 7h4M12 11v6" strokeOpacity="0.5" />
  </svg>
);

const LungsIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v6M12 9l-4 4M12 9l4 4" />
    <path d="M7 10c-2 0-4 2-4 6s2 5 4 5 3-1 3-5-1-6-3-6z" fill="currentColor" fillOpacity="0.4" />
    <path d="M17 10c2 0 4 2 4 6s-2 5-4 5-3-1-3-5 1-6 3-6z" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

const KidneyIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 6c-3 0-5 3-5 6s2 6 5 6 3-2 3-6-1-6-3-6z" fill="currentColor" fillOpacity="0.4" />
    <path d="M16 6c3 0 5 3 5 6s-2 6-5 6-3-2-3-6 1-6 3-6z" fill="currentColor" fillOpacity="0.4" />
    <path d="M11 12h2M9 12h1M14 12h1" strokeOpacity="0.5" />
  </svg>
);

const ErythrocyteIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.4" />
    <circle cx="12" cy="12" r="3" strokeOpacity="0.3" />
  </svg>
);

const MedicalBackground = () => {
  const doodles = [
    { component: AnatomicalHeart, color: 'text-rose-400' },
    { component: LungsIcon, color: 'text-blue-400' },
    { component: KidneyIcon, color: 'text-orange-400' },
    { component: ErythrocyteIcon, color: 'text-red-500' },
    { component: () => <Activity size={24} strokeWidth={0.5} />, color: 'text-emerald-500' },
    { component: () => <Microscope size={24} strokeWidth={0.5} />, color: 'text-indigo-400' },
    { component: () => <Dna size={24} strokeWidth={0.5} />, color: 'text-purple-500' },
    { component: () => <Stethoscope size={24} strokeWidth={0.5} />, color: 'text-slate-400' },
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FEFBF9]">
      {Array.from({ length: 45 }).map((_, i) => {
        const item = doodles[i % doodles.length];
        const Component = item.component;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = 30 + Math.random() * 70;
        const rotation = Math.random() * 360;
        const opacity = 0.5 + Math.random() * 0.4;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: opacity,
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [rotation, rotation + 25, rotation]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className={cn("absolute", item.color)}
            style={{
              top: `${top}%`,
              left: `${left}%`,
            }}
          >
            <Component size={size} />
          </motion.div>
        );
      })}
      
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/40" />
    </div>
  );
};

const LockScreen = ({ onAccess }: { onAccess: () => void }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const correctCode = 'ESTUDIANTE2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === correctCode) {
      localStorage.setItem('arti3_access_granted', 'true');
      onAccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
      <MedicalBackground />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border-2 border-rose-100 rounded-[40px] shadow-2xl shadow-rose-200/50 p-10 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <Lock className="w-10 h-10 text-rose-600" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Acceso Privado</h1>
          <p className="text-slate-500 mb-8 text-sm font-medium">Contenido exclusivo de ARTI 3 para estudiantes autorizados.</p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input 
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Introduce el Código de Acceso"
                className={cn(
                  "w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold tracking-widest text-center uppercase",
                  error ? "border-red-500 bg-red-50" : "border-slate-100 focus:border-rose-400 focus:bg-white"
                )}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4" />
                  CÓDIGO INCORRECTO
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full bg-rose-600 text-white rounded-2xl py-4 font-bold text-lg shadow-lg shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-6 h-6" />
              Verificar Acceso
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-rose-50 w-full">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black">Plataforma ARTI 3 © 2024</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

type Section = 'welcome' | 'anatomy' | 'histology' | 'physiology' | 'blood' | 'integration' | 'bibliography' | 'tutor' | 'cases' | 'api' | 'quizzes';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('arti3_access_granted') === 'true';
  });
  const [activeSection, setActiveSection] = useState<Section>('welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LockScreen onAccess={() => setIsAuthenticated(true)} />;
  }

  const menuItems = [
    { id: 'welcome', label: 'Presentación', icon: BookOpen, description: 'Modalidad y Objetivos' },
    { id: 'anatomy', label: 'Anatomía', icon: Wind, description: 'Arquitectura Macroscópica' },
    { id: 'histology', label: 'Histología', icon: Microscope, description: 'Tejido Microscópico' },
    { id: 'physiology', label: 'Fisiología', icon: Activity, description: 'La Función en Acción' },
    { id: 'blood', label: 'Sangre', icon: Droplet, description: 'El Tejido Líquido' },
    { id: 'integration', label: 'Integración', icon: Combine, description: 'Estructura + Función' },
    { id: 'cases', label: 'Casos Clínicos', icon: Stethoscope, description: 'Generador por IA' },
    { id: 'quizzes', label: 'Cuestionarios', icon: HelpCircle, description: 'Multiple Choice IA' },
    { id: 'bibliography', label: 'Bibliografía', icon: BookOpen, description: 'Fuentes de Referencia' },
    { id: 'api', label: 'Configuración IA', icon: KeyRound, description: 'Estado y Claves API' },
    { id: 'tutor', label: 'Tutor IA', icon: Bot, description: 'Respuestas Razonadas' },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFB] text-slate-900 font-sans overflow-hidden">
      <MedicalBackground />
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "hidden md:flex flex-col w-72 bg-white border-r border-slate-200 shadow-sm z-20",
      )}>
        <div className="p-6 border-b border-slate-100 bg-[#FDFCFB]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-600 rounded-lg shadow-rose-200 shadow-lg">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">ARTI 3</h1>
          </div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Guía de estudiantes de Franco</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              id={`nav-${item.id}`}
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group text-left",
                activeSection === item.id 
                  ? "bg-rose-50 text-rose-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 active:scale-[0.98]"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                activeSection === item.id ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-none mb-1">{item.label}</p>
                <p className="text-[10px] text-slate-500 font-medium">{item.description}</p>
              </div>
              {activeSection === item.id && (
                <ChevronRight className="ml-auto w-4 h-4" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-400 mb-4">
            <Stethoscope className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profesor Experto</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-[11px] text-slate-600 italic leading-relaxed">
              "El corazón y los pulmones bailan al mismo compás".
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-30 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-rose-600" />
          <span className="font-bold text-slate-800">ARTI 3</span>
        </div>
        <button id="mobile-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-40 md:hidden flex flex-col p-6 pt-20"
          >
            <nav className="space-y-4">
              {menuItems.map((item) => (
                <button
                  id={`mobile-nav-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as Section);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all",
                    activeSection === item.id ? "bg-rose-50 text-rose-700 font-bold" : "text-slate-600"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0 relative">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeSection === 'welcome' && <WelcomeSection />}
              {activeSection === 'anatomy' && <AnatomySection />}
              {activeSection === 'histology' && <HistologySection />}
              {activeSection === 'physiology' && <PhysiologySection />}
              {activeSection === 'blood' && <BloodSection />}
              {activeSection === 'integration' && <IntegrationSection />}
              {activeSection === 'cases' && <ClinicalCasesSection />}
              {activeSection === 'quizzes' && <QuizSection />}
              {activeSection === 'api' && <GeminiConfigSection />}
              {activeSection === 'bibliography' && <Bibliography />}
              {activeSection === 'tutor' && <TutorSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-20 pointer-events-none z-0" />
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 pointer-events-none z-0" />
    </div>
  );
}
