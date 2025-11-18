"use client";
import { deleteTodo, getTodos, updateTodoPosition } from "@/lib";
import { ITodo, ITodoFilter } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TodoContextType = {
  // states
  todos: ITodo[];
  openModal: boolean;
  openDropdown: boolean;
  selectedTodo: ITodo | null;
  deletePending: number | null;
  search: string;
  filterBy: ITodoFilter | null;
  // setters and handlers
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<ITodo | null>>;
  setFilterBy: React.Dispatch<React.SetStateAction<ITodoFilter | null>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  removeTodo: (id: number) => Promise<void>;
  handleSelectTodo: (todo: ITodo | null, status: boolean) => void;
  handleUpdateTodo: (todo: ITodo) => void;
  handleUpdateTodoPosition: (newTodos: ITodo[]) => Promise<void>;
  handleRemoveTodo: (id: number) => Promise<void>;
  handleFilter: (searchValue?: string, filterValue?: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [deletePending, setDeletePending] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filterBy, setFilterBy] = useState<ITodoFilter | null>(null);

  // Function to fetch user from API
  const refreshTodos = async (searchValue?: string, filterValue?: string) => {
    try {
      const data = await getTodos(searchValue, filterValue);
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

  // handle update todo position
  const handleUpdateTodoPosition = async (newTodos: ITodo[]) => {
    setTodos(newTodos);
    // persist the new order to the server
    try {
      const updatePromises = newTodos.map((todo, index) => {
        const newPosition = index + 1;
        if (todo.position !== newPosition) {
          return updateTodoPosition(todo.id, newPosition).then((result) => {
            if (result?.success) {
              // Update context with the new position
              handleUpdateTodo({
                ...todo,
                position: newPosition,
              });
            } else if (result?.errors) {
              console.error(
                `Failed to update position for todo ${todo.id}:`,
                result?.errors?.apiError?.[0]
              );
            }
            return result;
          });
        }
        return Promise.resolve({ success: true });
      });

      const results = await Promise.all(updatePromises);

      // Check if any update failed
      const failedUpdates = results.filter((r) => !r?.success);
      if (failedUpdates.length > 0) {
        console.warn(`${failedUpdates.length} position updates failed`);
      }
    } catch (err) {
      console.error("Failed to save order:", err);
      alert("Failed to save the new order. Please try again.");
    }
  };

  const handleRemoveTodo = async (id: number) => {
    try {
      setDeletePending(id);
      const result: any = await deleteTodo(id);
      if (result?.success) {
        removeTodo(id);
      } else if (result?.errors) {
        alert(result?.errors?.apiError?.[0] || "Failed to delete todo.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setDeletePending(null);
    }
  };

  const handleFilter = async (searchValue?: string, filterValue?: string) => {
    await refreshTodos(searchValue, filterValue);
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
        handleUpdateTodoPosition,
        deletePending,
        handleRemoveTodo,
        search,
        setSearch,
        filterBy,
        setFilterBy,
        handleFilter,
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
