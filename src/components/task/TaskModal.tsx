import React, { useState, useEffect } from 'react';
import type { Task, Priority } from '../../types/kanban';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState<Priority>(task.priority);

  useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task.id, {
      title,
      description,
      priority
    });
    onClose();
  };

  const handleDelete = () => {
    // Não chamamos onClose() aqui. Deixamos o componente pai controlar o fechamento
    // caso a exclusão seja confirmada e executada com sucesso.
    // Isso evita fechar o modal se o usuário clicar em "Cancelar" no confirm().
    onDelete(task.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-slate-800">Edit Task</h2>
              <button 
                type="button" 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800"
                placeholder="Task title"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-28 resize-none text-slate-800 text-sm leading-relaxed"
                placeholder="Add a detailed description..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                  <label key={p} className="cursor-pointer relative">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                      className="sr-only peer"
                    />
                    <div className={`
                      text-center py-2 rounded-lg text-sm font-medium border-2 transition-all
                      peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-indigo-500
                      ${p === 'low' 
                        ? 'border-slate-200 text-slate-600 peer-checked:border-slate-500 peer-checked:bg-slate-50 peer-checked:text-slate-900' 
                        : p === 'medium'
                        ? 'border-amber-200 text-amber-600 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:text-amber-900'
                        : 'border-rose-200 text-rose-600 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-900'
                      }
                    `}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100">
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
              Delete
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};