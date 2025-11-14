"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type TodoContextType = {
  todo: any;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDropdown: boolean;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todo, setTodo] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
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
