"use client";
import { DeleteIcon } from "@/constants";
import { useTodo } from "@/contexts";
import { cn, createTodo, CreateTodoInput, updateTodo } from "@/lib";
import { ITodo } from "@/types";
import { useEffect, useReducer, useState } from "react";
import ApiErrorText from "../shared/ErrorText";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";

const initialState: CreateTodoInput = {
  title: "",
  description: "",
  priority: "extreme",
  todo_date: "",
};

const reducer = (state: CreateTodoInput, action: any) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_PRIORITY":
      return { ...state, priority: action.payload };
    case "SET_TODO_DATE":
      return { ...state, todo_date: action.payload };
    case "RESET":
      return initialState;
    case "INITIALIZE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
function TodoModal() {
  const {
    setTodos,
    openModal,
    handleSelectTodo,
    selectedTodo,
    handleUpdateTodo,
  } = useTodo();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, setIsPending] = useState(false);
  const [actionErrors, setActionErrors] = useState<any>({});
  const btnText = selectedTodo ? "Update" : "Add";
  const btnPendingText = selectedTodo ? "Updating..." : "Adding...";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTodo?.id) {
      await updateTodoHandler(e);
    } else {
      await addTodoHandler(e);
    }
  };

  // add todo handler
  const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsPending(true);
      setActionErrors({});

      const formData = new FormData(e.currentTarget);
      const result: any = await createTodo(formData);
      setIsPending(false);

      if (result?.success) {
        setTodos((prev: ITodo[]) => [result.todo, ...prev]);
        dispatch({ type: "RESET" });
      } else if (result?.errors) {
        setActionErrors(result.errors);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setIsPending(false);
      setActionErrors({
        apiError: ["An unexpected error occurred. Please try again."],
      });
    }
  };

  // update todo handler

  const updateTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsPending(true);
      setActionErrors({});

      const formData = new FormData(e.currentTarget);
      const result: any = await updateTodo(formData, selectedTodo?.id!);
      setIsPending(false);
      console.log("Update todo result:", result);
      if (result?.success) {
        handleUpdateTodo(result.todo);
        dispatch({ type: "RESET" });
        handleSelectTodo(null, false);
      } else if (result?.errors) {
        setActionErrors(result.errors);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      console.log(_error);
      setIsPending(false);
      setActionErrors({
        apiError: ["An unexpected error occurred. Please try again."],
      });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: "RESET" });
    handleSelectTodo(null, false);
  };

  useEffect(() => {
    if (selectedTodo && selectedTodo?.id) {
      dispatch({ type: "INITIALIZE", payload: selectedTodo });
    }
  }, [selectedTodo]);

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full bg-black/75 p-6 flex items-center justify-center duration-200 ease-in-out",
        openModal
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      )}
      onClick={handleCloseModal}
    >
      <div
        className={cn(
          "w-full max-w-[591px] mx-auto max-h-full p-10 bg-white rounded-2xl duration-200 ease-in-out transform",
          openModal ? "scale-100" : "scale-90"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="title text-base!">Add New Task</h2>
          <button
            type="button"
            className="border-none outline-none underline cursor-pointer text-sm text-black font-semibold"
            onClick={handleCloseModal}
          >
            Go Back
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
          <Input
            label="Title"
            name="title"
            value={state.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
            errorMessage={actionErrors?.title?.[0]}
          />
          <Input
            label="Date"
            type="date"
            name="todo_date"
            value={state.todo_date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_TODO_DATE", payload: e.target.value })
            }
            errorMessage={actionErrors?.todo_date?.[0]}
          />
          <div className="flex flex-col select-none gap-2">
            <span className="label">Priority</span>

            <div className="flex items-center gap-10">
              {/* Extreme */}
              <label
                htmlFor="priority-extreme"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="size-2 rounded-full bg-red-900"></div>
                <span className="text-sm text-black-800">Extreme</span>
                <input
                  type="radio"
                  name="priority"
                  id="priority-extreme"
                  value="extreme"
                  checked={state.priority === "extreme"}
                  onChange={(e) =>
                    dispatch({ type: "SET_PRIORITY", payload: e.target.value })
                  }
                  className="accent-red-700"
                />
              </label>

              {/* Moderate */}
              <label
                htmlFor="priority-high"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="size-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-black-800">Moderate</span>
                <input
                  type="radio"
                  name="priority"
                  id="priority-high"
                  value="moderate"
                  checked={state.priority === "moderate"}
                  onChange={(e) =>
                    dispatch({ type: "SET_PRIORITY", payload: e.target.value })
                  }
                  className="accent-green-700"
                />
              </label>

              {/* low */}
              <label
                htmlFor="priority-low"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="size-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-black-800">Low</span>
                <input
                  type="radio"
                  name="priority"
                  id="priority-low"
                  value="low"
                  checked={state.priority === "low"}
                  onChange={(e) =>
                    dispatch({ type: "SET_PRIORITY", payload: e.target.value })
                  }
                  className="accent-yellow-700"
                />
              </label>
            </div>
          </div>

          <Textarea
            label="Title"
            className="h-[205px]!"
            name="description"
            value={state.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            errorMessage={actionErrors?.description?.[0]}
          />
          <ApiErrorText errors={actionErrors} />
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="btn btn_primary flex-1 max-w-[90px] h-[34px]!"
              disabled={isPending}
            >
              {isPending ? btnPendingText : btnText}
            </button>

            <button
              type="button"
              className="size-[34px] bg-red-900 rounded-lg flex items-center justify-center border-none outline-none cursor-pointer text-white"
              onClick={() => dispatch({ type: "RESET" })}
            >
              <DeleteIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
