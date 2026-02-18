import React, { useState } from 'react';
import type { Column, Task, Id } from '../../types/kanban';
import { TaskCard } from '../task/TaskCard';

export interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onTaskMove: (taskId: Id, targetColumnId: Id) => void;
  onTaskDelete: (taskId: Id) => void;
  onEditTask: (task: Task) => void;
  onAddTask: (columnId: Id, title: string) => void;
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
  onEditTask,
  onAddTask
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  
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

  const handleCreateSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newTitle.trim()) return;
    
    onAddTask(column.id, newTitle.trim());
    setNewTitle('');
    setIsCreating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateSubmit();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewTitle('');
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

      <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-3 min-h-[100px]">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDelete={() => onTaskDelete(task.id)}
            onClick={onEditTask}
          />
        ))}
        
        {isCreating ? (
          <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-indigo-500 animate-in fade-in zoom-in-95 duration-200">
            <textarea
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 resize-none outline-none bg-transparent mb-3"
              rows={2}
            />
            <div className="flex items-center gap-2 justify-end">
              <button 
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateSubmit}
                disabled={!newTitle.trim()}
                className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Add Card
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="group w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Add Task</span>
          </button>
        )}
      </div>
    </div>
  );
};