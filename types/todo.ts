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

export type { ITodo };
