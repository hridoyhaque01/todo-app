"use client";
import { PlusIcon } from "@/constants";
import { useTodo } from "@/contexts";

function TodoTitle() {
  const { setOpenModal } = useTodo();
  return (
    <div className="flex items-center justify-between">
      <h2 className="title">Todos</h2>
      <button
        type="button"
        className="btn btn_primary gap-2 max-w-[134px]"
        onClick={() => setOpenModal(true)}
      >
        <PlusIcon />
        New Task
      </button>
    </div>
  );
}

export default TodoTitle;
