import React from 'react';
import type { Column, Task } from '../../types/kanban';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  columns: Column[];
  tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, tasks }) => {
  return (
    <div className="flex h-full w-full overflow-x-auto overflow-y-hidden gap-6 p-6 items-start bg-slate-50">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          column={col}
          tasks={tasks.filter((task) => task.columnId === col.id)}
        />
      ))}
      
      {/* Add Column Button Placeholder */}
      <button className="flex-shrink-0 w-80 h-14 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500 font-medium hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
        + Add New Column
      </button>
    </div>
  );
};
