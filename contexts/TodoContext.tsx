"use client";
import { getTodos } from "@/lib";
import { ITodo } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TodoContextType = {
  todos: ITodo[];
  openModal: boolean;
  openDropdown: boolean;
  selectedTodo: ITodo | null;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  removeTodo: (id: number) => Promise<void>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<ITodo | null>>;
  handleSelectTodo: (todo: ITodo | null, status: boolean) => void;
  handleUpdateTodo: (todo: ITodo) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  // Function to fetch user from API
  const refreshTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data?.results || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setTodos([]);
    }
  };

  // handle remove todo
  const removeTodo = async (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // handle select todo for editing
  const handleSelectTodo = (todo: ITodo | null, status: boolean) => {
    setSelectedTodo(todo);
    setOpenModal(status);
  };

  // additional function to update todo in state
  const handleUpdateTodo = (todo: ITodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              ...todo,
            }
          : t
      )
    );
  };

  // Fetch user once on mount
  useEffect(() => {
    const fetchTodos = async () => {
      await refreshTodos();
    };
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        openModal,
        setOpenModal,
        openDropdown,
        setOpenDropdown,
        removeTodo,
        selectedTodo,
        setSelectedTodo,
        handleSelectTodo,
        handleUpdateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return ctx;
};

export { TodoProvider, useTodo };
