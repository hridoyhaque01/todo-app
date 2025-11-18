import {
  DeleteIcon,
  DragIcon,
  EditIcon,
  SpinnerAnimatedIcon,
  TODO_COLORS,
} from "@/constants";
import { formatedDateString } from "@/lib";
import { ITodo } from "@/types";

export const TodoItem = ({
  todo,
  pending = null,
  removeHandler,
  handleSelectTodo,
}: {
  todo: ITodo;
  pending: number | null;
  removeHandler: (id: number) => Promise<void>;
  handleSelectTodo: (todo: ITodo | null, status: boolean) => void;
}) => {
  const color = TODO_COLORS[todo?.priority as keyof typeof TODO_COLORS];
  return (
    <div
      className="p-6 flex flex-col gap-4 border rounded-lg bg-white"
      style={{
        borderColor: color?.bg,
      }}
    >
      <div className="flex items-center gap-1">
        <h2 className="text-blue-900 text-base font-medium flex-1">
          {todo?.title}
        </h2>
        <div
          className="px-2.5 py-1 rounded-lg capitalize text-sm"
          style={{ backgroundColor: color?.bg, color: color?.text }}
        >
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
          onClick={() => handleSelectTodo(todo, true)}
        >
          <EditIcon />
        </button>
        <button
          type="button"
          className="size-8 bg-blue-50 rounded-lg flex items-center justify-center border-none outline-none cursor-pointer text-red-500"
          disabled={pending === todo?.id}
          onClick={() => removeHandler(todo?.id)}
        >
          {pending !== todo?.id ? (
            <DeleteIcon />
          ) : (
            <SpinnerAnimatedIcon className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
