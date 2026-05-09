import React from 'react';
import { Wind, MapPin, Zap, Info } from 'lucide-react';

export default function AnatomySection() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          Anatomía Respiratoria
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          La arquitectura macroscópica de la "bomba ventilatoria". No es solo un órgano, es un sistema coordinado de fuelles y válvulas.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Músculos Principales */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Músculos Ventilatorios</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-700 border-b pb-2 flex items-center justify-between">
                Inspiración Tranquila (Activa)
                <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">Esencial</span>
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">Diafragma:</span>
                    <p className="text-sm text-slate-600">El motor principal (75%). Forma de cúpula que separa tórax de abdomen.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">Intercostales Externos:</span>
                    <p className="text-sm text-slate-600">Elevan y expanden la caja torácica ("Asa de balde").</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-700 border-b pb-2 flex items-center justify-between">
                Espiración Forzada (Activa)
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Tranquila = Pasiva</span>
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">Abdominales:</span>
                    <p className="text-sm text-slate-600">Aumentan la presión abdominal empujando el diafragma arriba.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">Intercostales Internos:</span>
                    <p className="text-sm text-slate-600">Deprimen las costillas, reduciendo el volumen.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-bold text-orange-800 text-[10px] uppercase tracking-wider block mb-1">Dato de Oro: Músculos Accesorios</span>
              <p className="text-orange-700 leading-relaxed">
                Durante la inspiración forzada se reclutan el <span className="font-bold italic">Serrato Anterior</span> (si se fija la escápula), el <span className="font-bold italic">Esternocleidomastoideo</span> y los <span className="font-bold italic">Escalenos</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Ubicación y Relaciones */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Ubicación y Caja Torácica</h3>
            </div>
            <p className="text-sm text-slate-600 leading-bold mb-4">
              La ventilación ocurre dentro de la <span className="font-bold text-slate-800 underline decoration-blue-200">Caja Torácica</span>, protegida por:
            </p>
            <div className="space-y-2">
              {['12 vértebras torácicas (Posterior)', '12 pares de costillas (Lateral)', 'Esternón (Anterior)'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-700">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Inervación Clave</h3>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-4 text-center">
              <p className="text-sm font-black text-amber-800 tracking-tight">"C3, 4, 5, keep the diaphragm alive"</p>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Diafragma:</span>
                <span className="font-bold text-slate-800">Nervio Frénico</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Intercostales:</span>
                <span className="font-bold text-slate-800">Nervios Intercostales</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Accesorios:</span>
                <span className="font-bold text-slate-800">Cervicales y XI par</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
