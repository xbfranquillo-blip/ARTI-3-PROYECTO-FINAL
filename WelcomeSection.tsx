import React from 'react';
import { Combine, ArrowRight, Activity, Microscope } from 'lucide-react';

export default function IntegrationSection() {
  const examples = [
    {
      title: 'El Diafragma: El Pistón Perfecto',
      structure: 'Forma de cúpula (Anatomía) y músculo estriado esquelético (Histología) inervado por el nervio frénico.',
      function: 'Al contraerse, la cúpula se aplana, produciendo el mayor cambio de volumen torácico con el menor desplazamiento muscular. Es el motor más eficiente de la inspiración.',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'La Barrera de Filtración y Difusión',
      structure: 'Neumocitos I planos "baldosas" y capilares íntimamente relacionados (capa de 0.5 micrómetros).',
      function: 'Esta delgadez extrema permite que la difusión de gases (Fisiología de Fick) ocurra casi instantáneamente. Si fuera más gruesa, no satisfaríamos la demanda de O₂.',
      icon: Microscope,
      color: 'indigo'
    },
    {
      title: 'Retroceso Elástico y Espiración Pasiva',
      structure: 'El parénquima pulmonar es rico en fibras elásticas de colágeno y elastina (Histología).',
      function: 'La energía almacenada al estirar estas fibras en la inspiración se libera, permitiendo una espiración tranquila sin gasto energético (Pasiva).',
      icon: Combine,
      color: 'emerald'
    }
  ];

  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          La Clave del Estudio: Integración
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Franco, aquí conectamos todo. La belleza de la biología está en cómo <span className="font-bold text-slate-800 underline decoration-blue-200">la forma dicta la función</span>.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {examples.map((ex, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${ex.color}-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 bg-${ex.color}-100 text-${ex.color}-600 rounded-2xl`}>
                  <ex.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-800">{ex.title}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 relative">
                <div className="space-y-3">
                  <h4 className={`text-[10px] font-black uppercase text-${ex.color}-500 tracking-[0.2em]`}>Estructura</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-bold italic">"{ex.structure}"</p>
                </div>
                
                <div className="space-y-3 relative">
                  <div className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2">
                    <ArrowRight className={`w-4 h-4 text-${ex.color}-300`} />
                  </div>
                  <h4 className={`text-[10px] font-black uppercase text-${ex.color}-500 tracking-[0.2em]`}>Función</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{ex.function}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-slate-900 rounded-[40px] text-white text-center space-y-4">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">Resumen de Oro</p>
        <p className="text-2xl font-black italic tracking-tight">"Entender la estructura es prever la función; entender la función es diagnosticar el fallo".</p>
      </div>
    </section>
  );
}
