"use client";
import { useTodo } from "@/contexts";
import { useDragAndDrop } from "@/hooks";
import { ITodo } from "@/types";
import { TodoItem } from "./TodoItem";
import TodoLoadingWrapper from "./TodoLoadingWrapper";

function TodoList() {
  const {
    todos,
    handleSelectTodo,
    handleUpdateTodoPosition,
    deletePending,
    handleRemoveTodo,
    todoStatus,
  } = useTodo();

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
    onItemsChange: handleUpdateTodoPosition,
  });

  return (
    <div>
      <h2 className="mt-10 text-lg font-semibold text-black-900">Your Tasks</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <TodoLoadingWrapper
          isLoading={todoStatus.isLoading}
          isError={todoStatus.isError}
          dataLength={todos.length}
        >
          {todos?.map((todo: ITodo, index: number) => (
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
                pending={deletePending}
                removeHandler={handleRemoveTodo}
                handleSelectTodo={handleSelectTodo}
              />
            </div>
          ))}
        </TodoLoadingWrapper>
      </div>
    </div>
  );
}

export default TodoList;
