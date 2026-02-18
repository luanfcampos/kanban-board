import React from 'react';
import type { Task } from '../../types/kanban';

export interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onClick: (task: Task) => void;
}

const priorityConfig = {
  low: {
    label: 'Low',
    classes: 'bg-slate-100 text-slate-600 ring-slate-200',
  },
  medium: {
    label: 'Medium',
    classes: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  high: {
    label: 'High',
    classes: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onClick }) => {
  const priority = priorityConfig[task.priority];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(task)}
      className="group bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing relative hover:-translate-y-0.5"
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ring-1 ring-inset ${priority.classes}`}
        >
          {priority.label}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-2 -mt-2 cursor-pointer rounded-full hover:bg-red-50"
          title="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-snug break-words">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 break-words">
          {task.description}
        </p>
      )}

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-50">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-2 text-[10px] text-slate-400 text-right">
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};