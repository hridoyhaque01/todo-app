"use client";

import { TodoItem } from "@/components/todos/TodoItem";
import { useDragAndDrop } from "@/hooks";

import { ITodo } from "@/types";

import { useState } from "react";

function TodoList() {
  // 1. Initialize todos state with hardcoded data

  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 1,

      title: "Sample Todo 1",

      description: "This is a sample todo item.",

      priority: "high",

      is_completed: false,

      position: 1,

      todo_date: null,

      created_at: "2024-06-01T00:00:00Z",

      updated_at: "2024-06-01T00:00:00Z",
    },

    {
      id: 2,

      title: "Sample Todo 2",

      description: "This is another sample todo item.",

      priority: "medium",

      is_completed: false,

      position: 2,

      todo_date: null,

      created_at: "2024-06-01T00:00:00Z",

      updated_at: "2024-06-01T00:00:00Z",
    },
    {
      id: 3,

      title: "Sample Todo 3",

      description: "This is another sample todo item.",

      priority: "medium",

      is_completed: false,

      position: 3,

      todo_date: null,

      created_at: "2024-06-01T00:00:00Z",

      updated_at: "2024-06-01T00:00:00Z",
    },

    // Add more sample todos here if needed
  ]);

  const [pending] = useState<number | null>(null);

  const {
    dragOverIndex,
    draggedIndex,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop({
    items: todos,
    onItemsChange: (newItems: ITodo[]) => setTodos(newItems),
  });

  // --- Placeholder Handlers ---

  const handleRemoveTodo = async () => {
    alert("Delete functionality is currently disabled in this example.");
  };

  const handleSelectTodo = () => {
    alert("Edit functionality is currently disabled in this example.");
  };

  return (
    <div>
      <h2 className="mt-10 text-lg font-semibold text-black-900">Your Tasks</h2>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {todos && todos?.length > 0 ? (
          todos?.map((todo: ITodo, index: number) => (
            <div
              key={todo?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={handleDragOver}
              onDragLeave={(e) => handleDragLeave(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`transition-all duration-150 ease-in-out ${
                draggedIndex === index
                  ? "opacity-50 border-2 border-gray-400 rounded-lg"
                  : ""
              } ${
                dragOverIndex === index
                  ? "border-2 border-blue-500 rounded-lg shadow-md scale-105"
                  : ""
              }`}
            >
              <TodoItem
                todo={todo}
                pending={pending}
                removeHandler={handleRemoveTodo}
                handleSelectTodo={handleSelectTodo}
              />
            </div>
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
