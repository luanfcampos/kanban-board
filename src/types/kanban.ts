export type Id = string;

export type Priority = 'low' | 'medium' | 'high';

export type ColumnStatus = string;

export type ColumnTheme = 'slate' | 'blue' | 'green' | 'rose' | 'amber' | 'violet';

export interface Task {
  id: Id;
  columnId: ColumnStatus;
  title: string;
  description?: string;
  priority: Priority;
  tags: string[];
  createdAt: string; // ISO Date string
}

export interface Column {
  id: ColumnStatus;
  title: string;
  theme: ColumnTheme;
}
