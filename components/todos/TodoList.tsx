"use client";
import { useTodo } from "@/contexts";
import { TodoItem } from "./TodoItem";

function TodoList() {
  const { todos } = useTodo();
  return (
    <div>
      <h2 className="mt-10 text-lg font-semibold text-black-900">Your Tasks</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {todos && todos?.length > 0 ? (
          todos?.map((todo: any) => <TodoItem key={todo?.id} todo={todo} />)
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
