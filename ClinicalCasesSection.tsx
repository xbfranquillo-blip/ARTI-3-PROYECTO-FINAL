import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Plus, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
  title: string;
  authors: string;
  role: string;
  tag: string;
  isCustom?: boolean;
}

export default function Bibliography() {
  const [customBooks, setCustomBooks] = useState<Book[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBook, setNewBook] = useState<Book>({
    title: '',
    authors: '',
    role: '',
    tag: 'Mi Libro'
  });

  useEffect(() => {
    const saved = localStorage.getItem('arti3_custom_books');
    if (saved) {
      try {
        setCustomBooks(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing custom books", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('arti3_custom_books', JSON.stringify(customBooks));
  }, [customBooks]);

  const defaultBooks: Book[] = [
    {
      title: 'Anatomía con orientación clínica',
      authors: 'Moore, Dalley & Agur',
      role: 'Anatomía y Correlación Clínica',
      tag: 'Texto Principal'
    },
    {
      title: 'Atlas de anatomía humana',
      authors: 'Frank H. Netter',
      role: 'Referencia Visual Indispensable',
      tag: 'Atlas'
    },
    {
      title: 'Histología: Texto y Atlas color',
      authors: 'Ross & Pawlina',
      role: 'La Biblia de la Histología',
      tag: 'Microscopía'
    },
    {
      title: 'Tratado de Fisiología Médica',
      authors: 'Guyton & Hall',
      role: 'Pilar de la Regulación y Mecanismos',
      tag: 'El Clásico'
    },
    {
      title: 'Fisiología Humana',
      authors: 'Bernardo Houssay',
      role: 'Rigor Científico y Base Experimental',
      tag: 'Legado Nobel'
    },
    {
      title: 'Fisiología',
      authors: 'Linda Costanzo',
      role: 'Didáctica y Conceptos de Alto Rendimiento',
      tag: 'Favorito de Estudiantes'
    },
    {
      title: 'Patología Estructural y Funcional',
      authors: 'Robbins & Cotran',
      role: 'Integración Fisiopatológica',
      tag: 'Complementario'
    }
  ];

  const allBooks = [...defaultBooks, ...customBooks];

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.authors) return;
    
    setCustomBooks([...customBooks, { ...newBook, isCustom: true }]);
    setNewBook({ title: '', authors: '', role: '', tag: 'Mi Libro' });
    setIsAdding(false);
  };

  const removeBook = (title: string) => {
    setCustomBooks(customBooks.filter(b => b.title !== title));
  };

  const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

  return (
    <section className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Bibliografía de Referencia
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Estudiante, estas son nuestras fuentes de verdad. Un buen médico se pregunta siempre por la validez de su información.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 shrink-0"
        >
          <Plus className="w-5 h-5" />
          Añadir mi bibliografía
        </button>
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 bg-white border-2 border-indigo-100 rounded-[32px] shadow-xl shadow-indigo-50/50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Añadir Nuevo Libro</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Título</label>
                <input 
                  type="text" 
                  value={newBook.title}
                  onChange={e => setNewBook({...newBook, title: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="Ej: Anatomía de Gray"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Autores</label>
                <input 
                  type="text" 
                  value={newBook.authors}
                  onChange={e => setNewBook({...newBook, authors: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="Ej: Susan Standring"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Función/Rol</label>
                <input 
                  type="text" 
                  value={newBook.role}
                  onChange={e => setNewBook({...newBook, role: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="Ej: Referencia clínica avanzada"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Etiqueta (Tag)</label>
                <input 
                  type="text" 
                  value={newBook.tag}
                  onChange={e => setNewBook({...newBook, tag: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="Ej: Especialidad"
                />
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Guardar Libro Personal
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allBooks.map((book, idx) => (
          <div key={`${book.title}-${idx}`} className="p-6 bg-white border border-slate-200 rounded-3xl group hover:border-blue-300 transition-colors relative">
            {book.isCustom && (
              <button 
                onClick={() => removeBook(book.title)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-100 text-slate-400 rounded-lg">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                book.isCustom ? "text-indigo-500 bg-indigo-50" : "text-blue-500 bg-blue-50"
              )}>
                {book.tag}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 leading-tight mb-1 pr-8">{book.title}</h3>
            <p className="text-xs text-slate-500 font-medium mb-3">{book.authors}</p>
            <p className="text-xs text-slate-600 italic border-l-2 border-slate-100 pl-3 py-1">
              {book.role}
            </p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-blue-50 border border-blue-100 rounded-[40px] flex gap-6 items-center">
        <div className="hidden sm:block p-4 bg-white rounded-2xl shadow-sm">
          <GraduationCap className="w-10 h-10 text-blue-600" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-1">Consejo Académico</h4>
          <p className="text-sm text-blue-700 leading-relaxed">
            Considéralos una inversión para toda tu carrera. Guyton te dará el **cómo**, Houssay el **porqué** y Netter el **dónde**.
          </p>
        </div>
      </div>
    </section>
  );
}
