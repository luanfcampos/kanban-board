import React from 'react';
import type { Column, Task } from '../../types/kanban';
import { TaskCard } from '../task/TaskCard';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

const themeStyles = {
  slate: 'border-t-slate-500',
  blue: 'border-t-blue-500',
  green: 'border-t-emerald-500',
  rose: 'border-t-rose-500',
  amber: 'border-t-amber-500',
  violet: 'border-t-violet-500',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks }) => {
  const accentColor = themeStyles[column.theme] || themeStyles.slate;

  return (
    <div className="flex-shrink-0 w-80 flex flex-col h-full">
      {/* Header */}
      <div className={`bg-white p-4 rounded-xl shadow-sm border-t-4 ${accentColor} mb-4 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
            {column.title}
          </h2>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Task List (Droppable Area) */}
      <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm italic">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};
