import React, { useState } from 'react';
import { 
  Activity, 
  Waves, 
  BarChart3, 
  ArrowRightLeft, 
  Truck, 
  Focus,
  Calculator,
  Info,
  ChevronDown,
  ChevronUp,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

type SubSection = 'mechanics' | 'volumes' | 'diffusion' | 'transport' | 'vq' | 'calc';

export default function PhysiologySection() {
  const [activeSub, setActiveSub] = useState<SubSection>('mechanics');

  const tabs = [
    { id: 'mechanics', label: 'Mecánica', icon: Activity },
    { id: 'volumes', label: 'Volúmenes', icon: BarChart3 },
    { id: 'diffusion', label: 'Difusión', icon: Waves },
    { id: 'transport', label: 'Transporte', icon: Truck },
    { id: 'vq', label: 'V/Q', icon: Focus },
    { id: 'calc', label: 'Cálculos', icon: Calculator },
  ];

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Fisiología: La Función en Acción
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Donde las leyes físicas y la biología se encuentran para mantener la vida.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSub(tab.id as SubSection)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all",
              activeSub === tab.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSub}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            {activeSub === 'mechanics' && <MechanicsSub />}
            {activeSub === 'volumes' && <VolumesSub />}
            {activeSub === 'diffusion' && <DiffusionSub />}
            {activeSub === 'transport' && <TransportSub />}
            {activeSub === 'vq' && <VQSub />}
            {activeSub === 'calc' && <CalculationsSub />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MechanicsSub() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-center">
          <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Presión Pleural</h4>
          <p className="text-2xl font-black text-blue-800">-5 a -8</p>
          <p className="text-[10px] text-blue-600">cmH₂O</p>
          <div className="mt-4 text-xs text-blue-700 leading-relaxed font-medium">
            Mantiene el pulmón pegado a la pared torácica. Siempre negativa.
          </div>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center text-white">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Presión Alveolar</h4>
          <p className="text-2xl font-black text-white">-1 a +1</p>
          <p className="text-[10px] text-slate-400">vs Atmosférica</p>
          <div className="mt-4 text-xs text-slate-400 leading-relaxed font-medium">
            Cambia para permitir el flujo aéreo (Boyle). 0 en reposo.
          </div>
        </div>
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl text-center">
          <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-1">Presión Transpulmonar</h4>
          <p className="text-2xl font-black text-indigo-800">Alv - Pl</p>
          <p className="text-[10px] text-indigo-600">Fuerza de Distensión</p>
          <div className="mt-4 text-xs text-indigo-700 leading-relaxed font-medium">
            La medida de las fuerzas elásticas. Mantiene el alvéolo inflado.
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Mecánica Ventilatoria</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-emerald-600 uppercase text-xs tracking-widest">
              <ChevronDown className="w-4 h-4" /> Inspiración
            </div>
            <ul className="space-y-2 text-sm text-slate-600 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100 pl-4">
              <li>Músculos se contraen, Volumen ↑</li>
              <li>Presión Pleural se hace más negativa</li>
              <li>P. Alveolar cae por debajo de la Atmosférica</li>
              <li><span className="font-bold text-slate-800">Resultado:</span> El aire entra (Flujo de entrada)</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-rose-600 uppercase text-xs tracking-widest">
              <ChevronUp className="w-4 h-4" /> Espiración
            </div>
            <ul className="space-y-2 text-sm text-slate-600 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-100 pl-4">
              <li>Músculos se relajan, Retroceso elástico ↑</li>
              <li>Volumen ↓, Presión Alveolar ↑</li>
              <li>P. Alveolar sube por encima de Atmosférica</li>
              <li><span className="font-bold text-slate-800">Resultado:</span> El aire sale (Flujo de salida)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
        <h4 className="font-bold text-slate-800 mb-4">Compliance (Distensibilidad)</h4>
        <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-blue-200 pl-4 py-2">
          "Es el cambio de volumen por unidad de presión transpulmonar". Refleja la facilidad con que el sistema se estira.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <p className="font-bold text-xs text-rose-600 mb-1">Compliance ↓</p>
            <p className="text-[10px] text-slate-500 font-medium">Pulmón rígido (Fibrosis)</p>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <p className="font-bold text-xs text-blue-600 mb-1">Compliance ↑</p>
            <p className="text-[10px] text-slate-500 font-medium">Híper-distensible (Enfisema)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VolumesSub() {
  const data = [
    { name: '0', volume: 2500 },
    { name: '1', volume: 3000 },
    { name: '2', volume: 2500 },
    { name: '3', volume: 3000 },
    { name: '4', volume: 5500 }, // Inspiración Forzada (VRI)
    { name: '5', volume: 2500 },
    { name: '6', volume: 1500 }, // Espiración Forzada (VRE)
    { name: '7', volume: 2500 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
          Espirometría Clínica
          <span className="text-[10px] uppercase font-black text-slate-400">Soretito Visual</span>
        </h3>
        
        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" hide />
              <YAxis domain={[0, 6000]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} unit="ml" />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2 rounded-lg text-[10px] font-bold">
                        {payload[0].value} ml
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="volume" stroke="#2563EB" strokeWidth={3} fill="#EFF6FF" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Vol. Corriente (VC)', value: '500 ml', desc: 'Respiración normal' },
            { label: 'Vol. Reserva Insp (VRI)', value: '3000 ml', desc: 'Inspiración Profunda' },
            { label: 'Vol. Reserva Esp (VRE)', value: '1100 ml', desc: 'Espiración Forzada' },
            { label: 'Vol. Residual (VR)', value: '1200 ml', desc: 'No se moviliza' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-xl font-black text-slate-800">{item.value}</p>
              <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 bg-blue-600 text-white rounded-3xl shadow-lg border border-blue-500">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4 opacity-80">Capacidades Pulmonares</h4>
          <div className="space-y-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <p className="text-xs font-bold opacity-70">Capacidad Vital (CV)</p>
              <p className="text-lg font-black tracking-tight">VRI + VC + VRE</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl">
              <p className="text-xs font-bold opacity-70">Capacidad Pulmonar Total (CPT)</p>
              <p className="text-lg font-black tracking-tight">CV + VR</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl">
              <p className="text-xs font-bold opacity-70">Capacidad Residual Funcional (CRF)</p>
              <p className="text-lg font-black tracking-tight">VRE + VR</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-slate-400" />
            Ventilación Alveolar
          </h4>
          <div className="p-4 bg-slate-50 rounded-2xl font-mono text-center mb-4">
            V<sub>A</sub> = (VC - V<sub>D</sub>) × FR
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Es el aire que <span className="font-bold text-slate-800 italic">realmente llega al alvéolo</span> por minuto. 
            El <span className="font-bold text-slate-800">Espacio Muerto Anatómico (V<sub>D</sub>)</span> (~150ml) no participa en el intercambio. 
            ¡La profundidad importa más que la frecuencia!
          </p>
        </div>
      </div>
    </div>
  );
}

function DiffusionSub() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Ley de Fick: Velocidad de Difusión</h3>
        <div className="p-6 bg-slate-900 rounded-2xl font-mono text-center mb-8 text-indigo-400 shadow-inner">
          V<sub>gas</sub> ∝ (A × ΔP × S) / d
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg h-fit">ΔP</div>
              <div>
                <p className="font-bold text-slate-800">Gradiente de Presión</p>
                <p className="text-xs text-slate-600">El motor. O₂ (104 vs 40) y CO₂ (45 vs 40).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg h-fit">A</div>
              <div>
                <p className="font-bold text-slate-800">Área de Superficie</p>
                <p className="text-xs text-slate-600">La cancha de tenis. Se reduce en <span className="font-black">Enfisema</span>.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg h-fit">d</div>
              <div>
                <p className="font-bold text-slate-800">Grosor de la Membrana</p>
                <p className="text-xs text-slate-600">Distancia a cruzar. Aumenta en <span className="font-black">Fibrosis</span> o <span className="font-black">Edema</span>.</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl relative overflow-hidden">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Solubilidad (S)
            </h4>
            <p className="text-sm text-blue-800 leading-relaxed mb-4">
              Punto clave del Guyton: El <span className="font-black underline decoration-blue-300 italic">CO₂ es 24 veces más soluble</span> que el O₂.
            </p>
            <div className="p-4 bg-white/80 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Implicación Clínica</p>
              <p className="text-xs text-blue-700 font-medium">
                Por eso la <span className="font-bold">hipoxemia</span> (fallo en O₂) ocurre mucho antes que la hipercapnia (fallo en CO₂) cuando la barrera se daña.
              </p>
            </div>
            <Waves className="absolute -bottom-10 -right-10 w-32 h-32 text-blue-200/50" />
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl shadow-xl overflow-hidden relative group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Tensión Superficial y Surfactante</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Las moléculas de agua tienden a colapsar el alvéolo (Ley de Laplace). 
              El <span className="text-blue-400 font-bold">Surfactante</span> (Neumocitos II) reduce esta tensión para:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Aumentar Compliance', 'Evitar Colapso', 'Estabilizar Alvéolos', 'Reducir Trabajo'].map((t, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <div className="w-1 h-1 bg-blue-500 rounded-full" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-32 h-32 flex-shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full animate-pulse blur-xl absolute" />
            <span className="text-blue-400 font-black text-xl italic group-hover:scale-110 transition-transform">Soretito</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransportSub() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Transporte de O₂</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-xs font-black text-red-900 mb-1">Hemoglobina (Hb)</p>
              <p className="text-xs text-red-700">98.5% viaja unido. 1.5% disuelto.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Efecto Bohr</h4>
              <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-red-200 pl-4 py-1">
                "CADET, face Right!": Factores tisulares desplazan la curva a la derecha, facilitando la descarga de O₂.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['↑ CO₂', '↑ H+ (↓pH)', '↑ T°', '↑ 2,3-DPG'].map((item, idx) => (
                  <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Transporte de CO₂</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Bicarbonato (HCO₃⁻)</span>
                <span className="text-blue-600 font-bold">70%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Carbamino (Hb)</span>
                <span className="text-indigo-600 font-bold">23%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Disuelto</span>
                <span className="text-slate-400 font-bold">7%</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">Efecto Haldane</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                La desoxigenación de la Hb aumenta su afinidad por el CO₂. Ocurre en los tejidos.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-white">
        <h3 className="text-xl font-black text-white mb-4 italic tracking-tight tracking-tighter">Respiración Celular</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          El destino final: La <span className="text-blue-400 font-bold">Mitocondria</span>. 
          Aquí el O₂ acepta electrones para producir ATP. Sin O₂, la cadena se detiene.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Glucólisis</p>
            <p className="text-xs text-slate-300">Citosol. 2 ATP.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">KREBS</p>
            <p className="text-xs text-slate-300">Matriz. Produce CO₂.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Cadena/ATP Sintasa</p>
            <p className="text-xs text-slate-300">Membrana. O₂ → H₂O.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VQSub() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h3 className="text-xl font-bold text-slate-800">Acoplamiento V/Q (Ventilación/Perfusión)</h3>
        <p className="text-sm text-slate-600 leading-relaxed italic">
          "El baile inteligente entre el aire y la sangre".
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-full bg-rose-500" />
            <h4 className="font-black text-slate-800 mb-2">Shunt (V/Q = 0)</h4>
            <p className="text-xs text-slate-500 mb-4">Perfusión sin Ventilación. Sangre que pasa por un "agujero negro".</p>
            <ul className="space-y-1">
              <li className="text-[10px] font-bold text-slate-600 border-l-2 border-slate-100 pl-2">Neumonía</li>
              <li className="text-[10px] font-bold text-slate-600 border-l-2 border-slate-100 pl-2">Atelectasia</li>
              <li className="text-[10px] font-bold text-slate-600 border-l-2 border-slate-100 pl-2">Edema Pulmonar</li>
            </ul>
            <div className="mt-4 p-2 bg-rose-50 text-rose-700 text-[10px] font-black uppercase rounded-lg text-center">Hipoxemia Refractaria</div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500" />
            <h4 className="font-black text-slate-800 mb-2">Espacio Muerto Alveolar (V/Q → ∞)</h4>
            <p className="text-xs text-slate-500 mb-4">Ventilación sin Perfusión. Aire que llega pero no tiene sangre que recoja.</p>
            <ul className="space-y-1">
              <li className="text-[10px] font-bold text-slate-600 border-l-2 border-slate-100 pl-2">Embolia Pulmonar</li>
            </ul>
            <div className="mt-4 p-2 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-lg text-center">Desperdicio de Ventilación</div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-6">
          <div className="p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-200">
            <Focus className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-black text-slate-800">Vasoconstricción Pulmonar Hipóxica</h4>
          <p className="text-xs text-slate-600 leading-relaxed italic max-w-[200px]">
            "El pulmón es inteligente: si una zona no tiene aire (↓PO₂), corta el flujo de sangre para no desperdiciarlo".
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h4 className="font-bold text-slate-800 mb-4">Shunt Fisiológico (2-3%)</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Culpa de las <span className="font-bold underline decoration-slate-200">venas bronquiales</span> y <span className="font-bold underline decoration-slate-200">venas de Tebesio</span>. 
          Vuelven sangre venosa directamente a la aurícula izquierda sin oxigenar. 
          Explica el <span className="font-black">Gradiente A-a</span> normal.
        </p>
      </div>
    </div>
  );
}

function CalculationsSub() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Ecuación del Gas Alveolar</h3>
        <p className="text-slate-500 text-sm mb-10">Calculando la PO₂ antes de la barrera.</p>
        
        <div className="p-8 bg-slate-900 rounded-3xl font-mono text-center mb-10 text-xl text-blue-400 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            P<sub>A</sub>O<sub>2</sub> = [ (P<sub>B</sub> - P<sub>H2O</sub>) × F<sub>i</sub>O<sub>2</sub> ] - (P<sub>a</sub>CO<sub>2</sub> / R)
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase text-slate-400 tracking-[0.2em] mb-4">Variables a nivel del mar</h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-sm font-bold text-slate-600">P<sub>B</sub> (Barométrica)</span>
                <span className="text-sm font-black text-slate-800">760 mmHg</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-sm font-bold text-slate-600">P<sub>H2O</sub> (Humedad)</span>
                <span className="text-sm font-black text-slate-800">47 mmHg</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-sm font-bold text-slate-600">F<sub>i</sub>O<sub>2</sub> (Aire)</span>
                <span className="text-sm font-black text-slate-800">0.21</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-sm font-bold text-slate-600">R (C. Resp)</span>
                <span className="text-sm font-black text-slate-800">0.8</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <h4 className="text-lg font-black mb-4 tracking-tight">Gradiente Alvéolo-arterial (A-a)</h4>
            <div className="p-4 bg-white/10 rounded-2xl font-mono text-center mb-4 text-xl">
              Δ(A-a)O₂ = P<sub>A</sub>O<sub>2</sub> - P<sub>a</sub>O<sub>2</sub>
            </div>
            <p className="text-xs opacity-80 leading-relaxed font-medium">
              Si es <span className="font-black">Normal (5-15)</span>, el problema es de "Bomba" (Hipoventilación). 
              Si está <span className="font-black">Elevado</span>, el problema es el pulmón (V/Q, Shunt, Difusión).
            </p>
            <Stethoscope className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
