"use client";
import { useTodo } from "@/contexts";
import { deleteTodo } from "@/lib";
import { useState } from "react";
import { TodoItem } from "./TodoItem";

function TodoList() {
  const { todos, removeTodo,handleSelectTodo } = useTodo();
  const [pending, setPending] = useState<number | null>(null);

  const handleRemoveTodo = async (id: number) => {
    try {
      setPending(id);
      const result: any = await deleteTodo(id);
      if (result?.success) {
        removeTodo(id);
      } else if (result?.errors) {
        alert(result?.errors?.apiError?.[0] || "Failed to delete todo.");
      }
    } catch (_error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div>
      <h2 className="mt-10 text-lg font-semibold text-black-900">Your Tasks</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {todos && todos?.length > 0 ? (
          todos?.map((todo: any) => (
            <TodoItem
              key={todo?.id}
              todo={todo}
              pending={pending}
              removeHandler={handleRemoveTodo}
              handleSelectTodo={handleSelectTodo}
            />
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
