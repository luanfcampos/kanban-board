import React from 'react';
import type { Task } from '../../types/kanban';

interface TaskCardProps {
  task: Task;
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

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priority = priorityConfig[task.priority];

  return (
    <div className="group bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ring-1 ring-inset ${priority.classes}`}
        >
          {priority.label}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-snug">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-3">
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