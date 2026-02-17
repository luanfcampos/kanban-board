import { useState, useEffect, useCallback } from 'react';
import type { Column, Task, Id } from '../types/kanban';

const INITIAL_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', theme: 'slate' },
  { id: 'in-progress', title: 'In Progress', theme: 'blue' },
  { id: 'done', title: 'Done', theme: 'green' },
];

export const useKanban = () => {
  // Initialize columns from localStorage or default
  const [columns, setColumns] = useState<Column[]>(() => {
    try {
      const saved = localStorage.getItem('kanban-columns');
      return saved ? JSON.parse(saved) : INITIAL_COLUMNS;
    } catch {
      return INITIAL_COLUMNS;
    }
  });

  // Initialize tasks from localStorage or empty
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('kanban-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist columns changes
  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [columns]);

  // Persist tasks changes
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const moveTask = useCallback((taskId: Id, targetColumnId: Id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: Id) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const updateTask = useCallback((taskId: Id, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  }, []);

  return {
    columns,
    tasks,
    addTask,
    moveTask,
    deleteTask,
    updateTask,
    setColumns,
  };
};