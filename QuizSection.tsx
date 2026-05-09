import React from 'react';
import { Microscope, Layers, Target, Info } from 'lucide-react';

export default function HistologySection() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Histología Respiratoria
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Si la anatomía es la ciudad, el tejido microscópico son los edificios y ciudadanos que hacen que todo funcione.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tissues */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Tipos de Tejidos</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-indigo-800 uppercase tracking-wider">Músculo Esquelético</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                El diafragma y los intercostales son <span className="font-bold text-slate-800">músculo estriado esquelético</span>. Células largas, multinucleadas y voluntarias (aunque automatizadas).
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-indigo-800 uppercase tracking-wider">Tejido Conectivo Elástico</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                El parénquima pulmonar es rico en <span className="font-bold text-slate-800 underline decoration-indigo-200">fibras elásticas</span>, esenciales para el retroceso pasivo en la espiración.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-indigo-800 uppercase tracking-wider">Epitelio Alveolar</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Plano simple en las superficies de intercambio para minimizar la distancia de difusión.
              </p>
            </div>
          </div>
        </div>

        {/* Specialized Cells */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Células Protagonistas</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800">Neumocitos Tipo I</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">95% de Superficie</span>
              </div>
              <p className="text-xs text-slate-600">Células planas ("baldosas") que forman la barrera de difusión. Son extremadamente finas.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800">Neumocitos Tipo II</span>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">Surfactante</span>
              </div>
              <p className="text-xs text-slate-600">Producen el agente tensioactivo que evita el colapso alveolar. Son las "madres" reparadoras.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800">Macrófagos Alveolares</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">Inmunidad</span>
              </div>
              <p className="text-xs text-slate-600">Llamadas "células del polvo". Fagocitan partículas y patógenos en el alvéolo.</p>
            </div>
          </div>
        </div>

        {/* Barrier Detail */}
        <div className="md:col-span-2 bg-slate-900 text-slate-300 p-10 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-indigo-400" />
              <h3 className="text-2xl font-bold text-white tracking-tight">La Barrera Alvéolo-Capilar</h3>
            </div>
            <p className="text-slate-400 max-w-xl">
              Una estructura de aproximadamente <span className="text-white font-bold">0.5 micrómetros</span> de grosor. Consta de:
            </p>
            <div className="flex flex-wrap gap-3">
              {['Capas de Surfactante', 'Neumocito Tipo I', 'Membrana Basal Epitelial', 'Espacio Intersticial', 'Endotelio Capilar'].map((item, idx) => (
                <div key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                  {idx + 1}. {item}
                </div>
              ))}
            </div>
          </div>
          <Microscope className="absolute -bottom-10 -right-10 w-64 h-64 text-indigo-500/10 rotate-12" />
        </div>
      </div>
    </section>
  );
}
