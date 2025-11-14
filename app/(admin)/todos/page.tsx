import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/Textarea";
import {
  CogIcon,
  DeleteIcon,
  DragIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
} from "@/constants";

function Todos() {
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="title">Todos</h2>
          <button type="button" className="btn btn_primary gap-2 max-w-[134px]">
            <PlusIcon />
            New Task
          </button>
        </div>
        <div className="mt-10 flex items-center gap-2">
          <div className="flex border border-neutral-100 border-r-0 rounded-lg  bg-white w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 text-xs text-black font-semibold placeholder:text-black-800 placeholder:opacity-50 focus:outline-none"
            />
            <button type="button" className="size-9! btn btn_primary">
              <SearchIcon className="size-4" />
            </button>
          </div>
          <button
            type="button"
            className="px-3 py-2 border border-neutral-100 rounded-lg text-base text-black leading-[100%] bg-white flex items-center gap-2 cursor-pointer shrink-0"
          >
            Filter By <CogIcon />
          </button>
        </div>
        <div>
          <h2 className="mt-10 text-lg font-semibold text-black-900">
            Your Tasks
          </h2>
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
        {/* <Empty /> */}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/75 p-6 flex items-center justify-center">
        <div className="w-full max-w-[591px] mx-auto max-h-full p-10 bg-white rounded-2xl">
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
        </div>
      </div>
    </>
  );
}

export default Todos;
