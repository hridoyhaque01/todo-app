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
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDropdown: boolean;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
