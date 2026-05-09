import React from 'react';
import { HeartHandshake, Target, Users, LayoutList, CheckCircle2, TrendingUp } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-8 h-8 text-rose-600" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Hola, soy Franco
          </h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Bienvenidos a PROYECTO ARTI 3, nuestra plataforma de integración biomédica. He diseñado este espacio para que juntos consolidemos nuestro aprendizaje en Sangre, Respiratorio, y renal de manera interactiva, lógica y clínica. Ademas de optimizar el tiempo del estudiante.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Nuestro Objetivo</h3>
          <p className="text-slate-600 leading-relaxed">
            Pasar de la memoria a largo plazo a través de la comprensión profunda. No solo aprenderemos estructuras y células, sino cómo funcionan en conjunto para mantener la vida.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
            <LayoutList className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Modalidad de Trabajo</h3>
          <p className="text-slate-600 leading-relaxed">
            Utilizaremos un modelo de <strong>aprendizaje invertido y colaborativo</strong>. Cada sección tiene recursos interactivos que deben revisar antes de nuestras discusiones de casos clínicos.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-slate-700" />
          <h3 className="text-2xl font-bold text-slate-800">La Metodología</h3>
        </div>
        
        <ul className="space-y-4">
          {[
            { 
              title: "Estudio Autónomo", 
              desc: "Revisa Anatomía, Histología y Fisiología usando los módulos interactivos de esta app." 
            },
            { 
              title: "Integración Activa", 
              desc: "Conecta las disciplinas en la sección de 'Integración'. Entiende el 'por qué' anatómico de la función fisiológica." 
            },
            { 
              title: "Resolución con IA", 
              desc: "Usa el Tutor IA para resolver dudas y generar Casos Clínicos que pongan a prueba tu razonamiento." 
            },
            { 
              title: "Discusión Grupal", 
              desc: "Llevaremos los casos más complejos a nuestras sesiones para debatir diagnósticos y mecanismos." 
            }
          ].map((item, idx) => (
            <li key={idx} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-rose-500 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block mb-1">{item.title}</span>
                <span className="text-slate-600">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
