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
  // Inicialização Lazy: Lê do localStorage apenas na montagem inicial
  const [columns, setColumns] = useState<Column[]>(() => {
    try {
      const saved = localStorage.getItem('kanban-columns');
      if (!saved) return INITIAL_COLUMNS;
      
      const parsed = JSON.parse(saved);
      // Validação extra para garantir que é um array
      return Array.isArray(parsed) ? parsed : INITIAL_COLUMNS;
    } catch (error) {
      console.error('Failed to parse columns from localStorage:', error);
      return INITIAL_COLUMNS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('kanban-tasks');
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      // Validação extra para garantir que é um array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse tasks from localStorage:', error);
      return [];
    }
  });

  // Persistência Reativa: Salva sempre que columns mudar
  useEffect(() => {
    try {
      localStorage.setItem('kanban-columns', JSON.stringify(columns));
    } catch (error) {
      console.error('Failed to save columns to localStorage:', error);
    }
  }, [columns]);

  // Persistência Reativa: Salva sempre que tasks mudar
  useEffect(() => {
    try {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
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
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId);
      
      // Otimização: Se a tarefa não existe ou já está na coluna destino, não faz nada
      if (!task || task.columnId === targetColumnId) {
        return prev;
      }

      // Lógica de movimento: Remove da posição atual e adiciona ao final com novo ID de coluna
      const others = prev.filter((t) => t.id !== taskId);
      return [...others, { ...task, columnId: targetColumnId }];
    });
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