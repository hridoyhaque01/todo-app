"use client";
import { useTodo } from "@/contexts";
import { cn } from "@/lib";

function TodoModalWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { openModal, setOpenModal } = useTodo();
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full bg-black/75 p-6 flex items-center justify-center duration-200 ease-in-out",
        openModal
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      )}
      onClick={() => setOpenModal(false)}
    >
      <div
        className={cn(
          "w-full max-w-[591px] mx-auto max-h-full p-10 bg-white rounded-2xl duration-200 ease-in-out transform",
          openModal ? "scale-100" : "scale-90"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default TodoModalWrapper;
