import React from 'react';
import { KanbanBoard } from './components/board/KanbanBoard';
import { useKanban } from './hooks/useKanban';
import type { Priority } from './types/kanban';

const App: React.FC = () => {
  const { columns, tasks, addTask, moveTask, deleteTask } = useKanban();

  // Temporary function to simulate adding tasks
  const handleAddRandomTask = () => {
    const priorities: Priority[] = ['low', 'medium', 'high'];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    
    addTask({
      columnId: 'todo',
      title: `Task ${Math.floor(Math.random() * 1000)}`,
      description: 'Drag me to another column!',
      priority: randomPriority,
      tags: ['Test', 'DnD'],
    });
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Kanban Board</h1>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleAddRandomTask}
             className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
           >
             + Add Random Task
           </button>
           <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"></div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <KanbanBoard 
          columns={columns} 
          tasks={tasks} 
          onTaskMove={moveTask}
          onTaskDelete={deleteTask}
        />
      </main>
    </div>
  );
};

export default App;