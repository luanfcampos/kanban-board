import React, { useState } from 'react';
import type { Column, Task, Id } from '../../types/kanban';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from '../task/TaskModal';

interface KanbanBoardProps {
  columns: Column[];
  tasks: Task[];
  onTaskMove: (taskId: Id, targetColumnId: Id) => void;
  onTaskDelete: (taskId: Id) => void;
  onTaskUpdate: (taskId: Id, updates: Partial<Task>) => void;
  onAddTask: (columnId: Id, title: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  columns, 
  tasks, 
  onTaskMove,
  onTaskDelete,
  onTaskUpdate,
  onAddTask
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDeleteTask = (taskId: Id) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      onTaskDelete(taskId);
      setEditingTask(null); // Fecha o modal se estiver aberto
    }
  };

  const handleAddColumn = () => {
    alert("Column management features are under construction 🚧");
  };

  return (
    <>
      <div className="flex h-full w-full overflow-x-auto overflow-y-hidden gap-6 p-6 items-start bg-slate-50">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={tasks.filter((task) => task.columnId === col.id)}
            onTaskMove={onTaskMove}
            onTaskDelete={handleDeleteTask}
            onEditTask={(task) => setEditingTask(task)}
            onAddTask={onAddTask}
          />
        ))}
        
        <button 
          onClick={handleAddColumn}
          className="shrink-0 w-80 h-14 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500 font-medium hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          + Add New Column
        </button>
      </div>

      {editingTask && (
        <TaskModal 
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(taskId, updates) => {
            onTaskUpdate(taskId, updates);
          }}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default KanbanBoard;