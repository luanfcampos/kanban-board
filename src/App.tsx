import React from 'react';
import { KanbanBoard } from './components/board/KanbanBoard';
import type { Column, Task } from './types/kanban';

// Mock Data for UI Development
const MOCK_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', theme: 'slate' },
  { id: 'in-progress', title: 'In Progress', theme: 'blue' },
  { id: 'review', title: 'Review', theme: 'amber' },
  { id: 'done', title: 'Done', theme: 'green' },
];

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    title: 'Research Competitors',
    description: 'Analyze top 3 competitors in the market and document features.',
    priority: 'medium',
    tags: ['Research', 'Product'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    columnId: 'todo',
    title: 'Setup Project Repo',
    priority: 'high',
    tags: ['Devops'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    columnId: 'in-progress',
    title: 'Design System Implementation',
    description: 'Create basic atoms: Buttons, Inputs, Typography.',
    priority: 'high',
    tags: ['Design', 'Dev'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    columnId: 'done',
    title: 'Initial Meeting',
    priority: 'low',
    tags: ['Meeting'],
    createdAt: new Date().toISOString(),
  },
];

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col">
      {/* App Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Kanban Board</h1>
        </div>
        <div className="flex gap-4">
           {/* Placeholder for future header controls */}
           <div className="w-8 h-8 rounded-full bg-slate-100"></div>
        </div>
      </header>

      {/* Main Board Area */}
      <main className="flex-1 overflow-hidden">
        <KanbanBoard columns={MOCK_COLUMNS} tasks={MOCK_TASKS} />
      </main>
    </div>
  );
};

export default App;
