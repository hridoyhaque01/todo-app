"use client";
import { CogIcon, SearchIcon } from "@/constants";
import { useTodo } from "@/contexts";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { cn, getTodoFilters } from "@/lib";
import { ITodoFilter } from "@/types";
import { useRef } from "react";

function TodoFilter() {
  // ref now points to the wrapper that contains both the button and the dropdown panel
  const filters = getTodoFilters();
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    openDropdown,
    setOpenDropdown,
    search,
    setSearch,
    filterBy,
    setFilterBy,
    handleFilter,
  } = useTodo();
  useOnClickOutside(ref, () => setOpenDropdown(false));

  const handleFilterSearch = (item: ITodoFilter) => {
    setFilterBy(item);
    setOpenDropdown(false);
    handleFilter(search, item?.value);
  };

  return (
    <div className="mt-10 flex items-center gap-2">
      <div className="flex border border-neutral-100 border-r-0 rounded-lg  bg-white w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 text-xs text-black font-semibold placeholder:text-black-800 placeholder:opacity-50 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="size-9! btn btn_primary"
          onClick={() => handleFilter(search, filterBy?.value)}
        >
          <SearchIcon className="size-4" />
        </button>
      </div>

      <div className="relative shrink-0" ref={ref}>
        <button
          type="button"
          className="px-3 py-2 border border-neutral-100 rounded-lg text-base text-black leading-[100%] bg-white flex items-center gap-2 cursor-pointer"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          {filterBy?.label || "Filter By"} <CogIcon />
        </button>

        <div
          className={cn(
            "absolute w-[164px] p-3 bg-white shadow-[0px_3px_6px_0px_#00000029] right-0 flex flex-col rounded-xs gap-2 duration-200 origin-top z-10",
            openDropdown
              ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
              : "translate-y-3 scale-95 opacity-0 pointer-events-none"
          )}
        >
          <div className="text-xs text-black-800 leading-[140%] border-b border-neutral-100 pb-2 mb-2">
            Date
          </div>
          {filters.map((item: ITodoFilter) => (
            <label
              htmlFor={item?.value}
              className="flex items-center cursor-pointer gap-2"
              key={item?.value}
            >
              <input
                type="radio"
                name="date"
                value="asc"
                id={item?.value}
                className="accent-blue-700"
                checked={filterBy?.value === item?.value}
                onChange={() => handleFilterSearch(item)}
              />
              <span className="text-xs text-black-800">{item?.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoFilter;
