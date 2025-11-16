import { DeleteIcon, DragIcon, EditIcon } from "@/constants";
import { formatedDateString } from "@/lib";
import { ITodo } from "@/types";

export const TodoItem = ({ todo }: { todo: ITodo }) => {
  return (
    <div className="p-6 flex flex-col gap-4 border border-neutral-100 rounded-lg bg-white">
      <div className="flex items-center gap-1">
        <h2 className="text-blue-900 text-base font-medium flex-1">
          {todo?.title}
        </h2>
        <div className="px-2.5 py-1 bg-red-100 rounded-lg text-red-900 capitalize text-sm">
          {todo?.priority}
        </div>
        <button
          type="button"
          className="text-grey border-none outline-none cursor-grab"
        >
          <DragIcon />
        </button>
      </div>
      <p className="text-sm text-black-800">
        {todo?.description || "No description provided."}
      </p>
      <div className="flex items-center gap-2">
        <p className="flex-1">{formatedDateString(todo?.todo_date)}</p>
        <button
          type="button"
          className="size-8 bg-blue-50 rounded-lg flex items-center justify-center border-none outline-none cursor-pointer text-blue-400"
        >
          <EditIcon />
        </button>
        <button
          type="button"
          className="size-8 bg-blue-50 rounded-lg flex items-center justify-center border-none outline-none cursor-pointer text-red-500"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
