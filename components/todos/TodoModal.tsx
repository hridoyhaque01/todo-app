"use client";
import { DeleteIcon } from "@/constants";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import TodoModalWrapper from "./TodoModalWrapper";

function TodoModal() {
  return (
    <TodoModalWrapper>
      <div className="flex items-center justify-between">
        <h2 className="title text-base!">Add New Task</h2>
        <button
          type="button"
          className="border-none outline-none underline cursor-pointer text-sm text-black font-semibold"
        >
          Go Back
        </button>
      </div>
      <form action="" className="flex flex-col gap-4 mt-10">
        <Input label="Title" />
        <Input label="Date" type="date" />
        <div className="flex flex-col select-none gap-2">
          <span className="label">Priority</span>
          <div className="flex items-center gap-10">
            {/* Extreme */}
            <label
              htmlFor="extreme-1"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="size-2 rounded-full bg-red-900"></div>
              <span className="text-sm text-black-800">Extreme</span>
              <input
                type="radio"
                name="severity"
                id="extreme-1"
                value="extreme"
                className="accent-red-700"
              />
            </label>

            {/* High */}
            <label
              htmlFor="extreme-2"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="size-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-black-800">High</span>
              <input
                type="radio"
                name="severity"
                id="extreme-2"
                value="high"
                className="accent-green-700"
              />
            </label>

            {/* Medium */}
            <label
              htmlFor="extreme-3"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-black-800">Medium</span>
              <input
                type="radio"
                name="severity"
                id="extreme-3"
                value="medium"
                className="accent-yellow-700"
              />
            </label>
          </div>
        </div>
        <Textarea label="Title" className="h-[205px]!" />
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="btn btn_primary flex-1 max-w-[90px] h-[34px]!"
          >
            Done
          </button>

          <button
            type="submit"
            className="size-[34px] bg-red-900 rounded-lg flex items-center justify-center border-none outline-none cursor-pointer text-white"
          >
            <DeleteIcon />
          </button>
        </div>
      </form>
    </TodoModalWrapper>
  );
}

export default TodoModal;
