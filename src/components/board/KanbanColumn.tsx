import React, { useState } from 'react';
import type { Column, Task, Id } from '../../types/kanban';
import { TaskCard } from '../task/TaskCard';

export interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskMove: (taskId: Id, targetColumnId: Id) => void;
  onTaskDelete: (taskId: Id) => void;
  onTaskUpdate: (taskId: Id, updates: Partial<Task>) => void;
}

const themeStyles = {
  slate: 'border-t-slate-500',
  blue: 'border-t-blue-500',
  green: 'border-t-emerald-500',
  rose: 'border-t-rose-500',
  amber: 'border-t-amber-500',
  violet: 'border-t-violet-500',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  column, 
  tasks, 
  onTaskMove,
  onTaskDelete,
  onTaskUpdate
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const accentColor = themeStyles[column.theme] || themeStyles.slate;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onTaskMove(taskId, column.id);
    }
  };

  return (
    <div 
      className={`flex-shrink-0 w-80 flex flex-col h-full transition-all duration-200 rounded-xl ${
        isDragOver ? 'bg-indigo-50 ring-2 ring-indigo-400 ring-inset' : 'bg-transparent'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`bg-white p-4 rounded-xl shadow-sm border-t-4 ${accentColor} mb-4 flex items-center justify-between shrink-0 pointer-events-none`}>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
            {column.title}
          </h2>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-3 min-h-[150px]">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDelete={() => onTaskDelete(task.id)}
            onUpdate={(updates: Partial<Task>) => onTaskUpdate(task.id, updates)}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm italic pointer-events-none">
            Solte as tarefas aqui
          </div>
        )}
      </div>
    </div>
  );
};