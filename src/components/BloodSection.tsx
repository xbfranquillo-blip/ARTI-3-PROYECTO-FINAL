import React from 'react';
import { Droplet, TestTube, ShieldCheck, Waves, Info, GitMerge } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BloodSection() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Droplet className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Tejido Sanguíneo: El Río de la Vida
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          El único tejido conectivo líquido. Es el vehículo de comunicación masiva del organismo, integrando el transporte de gases con la inmunidad y la hemostasia.
        </p>
      </header>

      {/* ANATOMIA */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 text-red-600 rounded-xl">
            <TestTube className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">1. Anatomía (Composición)</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest mb-4">Plasma (55%)</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="font-bold text-slate-700 font-medium">Agua:</span>
                <span className="text-slate-500">91.5%</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="font-bold text-slate-700 font-medium">Proteínas:</span>
                <span className="text-slate-500">7% (Albúmina, Globulinas)</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="font-bold text-slate-700 font-medium">Otros:</span>
                <span className="text-slate-500">Iones, Glucosa, Gases</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <h4 className="font-black text-xs text-red-400 uppercase tracking-widest mb-4">Elementos Formes (45%)</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="font-bold text-red-800">Eritrocitos:</span>
                <span className="text-red-600 font-black">~5 millones/mm³</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="font-bold text-red-800">Leucocitos:</span>
                <span className="text-red-600 font-black">5,000 - 10,000/mm³</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="font-bold text-red-800">Plaquetas:</span>
                <span className="text-red-600 font-black">150k - 400k/mm³</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* HISTOLOGIA */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              <GitMerge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">2. Histología: El Frotis</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Eritrocitos', desc: 'Discos bicóncavos, sin núcleo, llenos de Hb.', color: 'red' },
              { name: 'Neutrófilos', desc: 'Granulocitos. Núcleo multilobulado. Primera línea.', color: 'slate' },
              { name: 'Linfocitos', desc: 'Agranulocitos. Núcleo grande. Inmunidad específica.', color: 'blue' },
              { name: 'Monocitos', desc: 'Los más grandes. Se vuelven macrófagos.', color: 'amber' },
            ].map((cell, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className={`font-bold text-sm text-${cell.color}-600 mb-1`}>{cell.name}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{cell.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Médula Ósea</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              La <span className="text-white font-bold italic">Hemopoyesis</span> ocurre en la médula roja. 
              Todas nacen de una célula madre pluripotencial (Stem Cell).
            </p>
          </div>
          <div className="mt-8 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <ShieldCheck className="w-4 h-4" /> Eritropoyetina (EPO)
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Hormona renal que estimula la producción de glóbulos rojos.</p>
          </div>
        </div>
      </div>

      {/* FISIOLOGIA */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
            <Waves className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">3. Fisiología: Función y Hemostasia</h3>
        </div>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b pb-2 text-sm uppercase tracking-wider">Transporte y Amortiguación</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Transporte de nutrientes, desechos y calor. 
                Función vital de <span className="font-bold">Buffer (pH)</span> gracias a la Hb y las proteínas plasmáticas.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 border-b pb-2 text-sm uppercase tracking-wider">Hemostasia (Parar el sangrado)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Primaria</p>
                  <p className="text-[10px] text-slate-500 font-bold italic">Tapón Plaquetario</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Secundaria</p>
                  <p className="text-[10px] text-slate-500 font-bold italic">Cascada de Coagulación</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex gap-4">
            <Info className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-bold text-amber-800">Grupos Sanguíneos:</span>
              <p className="text-amber-700 leading-relaxed">
                Determinado por <span className="font-bold italic">Aglicanos</span> (Antígenos) en la superficie del eritrocito (Sistema ABO) y el Factor Rh (+ o -).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRACION */}
      <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-200">
        <h4 className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Ejemplo de Integración</h4>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 font-black text-2xl italic">
              Hb
            </div>
            <p className="font-bold text-slate-800 text-sm">Hemoglobina</p>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-red-600">Estructura:</span> La molécula de Hb tiene 4 subunidades proteicas y 4 grupos hemo (Histología molecular).
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-red-600">Función:</span> Su configuración permite la cooperatividad positiva para el transporte de O₂ y actúa como el principal amortiguador (buffer) intracelular del eritrocito (Fisiología).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
