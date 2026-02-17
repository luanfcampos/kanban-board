import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 transform hover:scale-105 transition-transform duration-300">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
          <h1 className="text-2xl font-bold text-white text-center tracking-tight">
            Kanban Board
          </h1>
          <p className="text-indigo-100 text-center text-sm mt-1 font-medium opacity-90">
            Ambiente Local
          </p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
              <span role="img" aria-label="check">✓</span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-slate-800 text-center mb-2">
            Etapa 1 Concluída
          </h2>
          
          <p className="text-slate-500 text-center mb-8 text-sm leading-relaxed">
            Se você está vendo este card estilizado, o Tailwind v4 e o Vite estão configurados corretamente no seu ambiente local.
          </p>

          <div className="space-y-3">
            <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
              src/main.tsx importado
            </div>
            <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="w-2.5 h-2.5 bg-sky-400 rounded-full mr-3 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
              @import "tailwindcss" funcionando
            </div>
            <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-3 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
              Estrutura Vite Padrão
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;