import { DeleteIcon, DragIcon, EditIcon, TODO_COLORS } from "@/constants";

function TodoLoadingWrapper({
  isLoading,
  isError,
  dataLength,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  dataLength: number;
  children: React.ReactNode;
}) {
  if (isLoading) {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        className="p-6 flex flex-col gap-4 border rounded-lg bg-white"
        style={{
          borderColor: TODO_COLORS.extreme?.bg,
        }}
        key={index}
      >
        <div className="flex items-center gap-1">
          <div className="flex-1 h-6 bg-neutral-100 animate-pulse rounded"></div>
          <div
            className="px-2.5 py-1 rounded-lg w-16 h-7"
            style={{
              backgroundColor: TODO_COLORS.extreme.bg,
              color: TODO_COLORS.extreme.text,
            }}
          ></div>
          <button
            type="button"
            className="text-grey border-none outline-none cursor-grab"
          >
            <DragIcon />
          </button>
        </div>
        <div>
          <div className="h-5 w-full rounded bg-neutral-100 animate-pulse mb-1" />
          <div className="h-5 w-full max-w-[90%] rounded bg-neutral-100 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-full rounded bg-neutral-100 animate-pulse" />

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
    ));
  } else if (isError) {
    return (
      <div className="p-6 flex flex-col gap-4 border border-neutral-300 rounded-lg bg-white col-span-3 text-center">
        <p className="text-red-500">Failed to load todos. Please try again.</p>
      </div>
    );
  } else if (dataLength === 0) {
    return (
      <div className="p-6 flex flex-col gap-4 border border-neutral-300 rounded-lg bg-white col-span-3 text-center">
        <p>No todos found.</p>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export default TodoLoadingWrapper;
