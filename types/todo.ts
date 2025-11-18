interface ITodo {
  id: number;
  title: string;
  description: string;
  priority: string;
  is_completed: boolean;
  position: number;
  todo_date: null | string;
  created_at: string;
  updated_at: string;
}

interface ITodoFilter {
  label: string;
  value: string;
}

export type { ITodo, ITodoFilter };
