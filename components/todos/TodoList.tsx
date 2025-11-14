import { DeleteIcon, DragIcon, EditIcon } from "@/constants";

function TodoList() {
  return (
    <div>
      <h2 className="mt-10 text-lg font-semibold text-black-900">Your Tasks</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="p-6 flex flex-col gap-4 border border-neutral-100 rounded-lg bg-white">
          <div className="flex items-center gap-1">
            <h2 className="text-blue-900 text-base font-medium flex-1">
              Backend Infrastructure
            </h2>
            <div className="px-2.5 py-1 bg-red-100 rounded-lg text-red-900">
              Extreme
            </div>
            <button
              type="button"
              className="text-grey border-none outline-none cursor-grab"
            >
              <DragIcon />
            </button>
          </div>
          <p className="text-sm text-black-800">
            Upgrading backend infrastructure for better performance
          </p>
          <div className="flex items-center gap-2">
            <p className="flex-1">Due Apr 15, 2025</p>
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
      </div>
    </div>
  );
}

export default TodoList;
