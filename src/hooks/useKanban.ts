import { useState, useEffect, useCallback } from 'react';
import type { Column, Task, Id } from '../types/kanban';

const INITIAL_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', theme: 'slate' },
  { id: 'in-progress', title: 'In Progress', theme: 'blue' },
  { id: 'done', title: 'Done', theme: 'green' },
];

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useKanban = () => {
  const [columns, setColumns] = useState<Column[]>(() => {
    try {
      const saved = localStorage.getItem('kanban-columns');
      return saved ? JSON.parse(saved) : INITIAL_COLUMNS;
    } catch {
      return INITIAL_COLUMNS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('kanban-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const createTask = useCallback((columnId: Id, title: string) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      title,
      description: '',
      priority: 'low',
      tags: [],
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
    createTask,
    moveTask,
    deleteTask,
    updateTask,
    setColumns,
  };
};