"use client";
import {
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  ROUTES,
  TodoIcon,
} from "@/constants";
import { cn, logout } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "../profile/User";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full overflow-auto w-full max-w-[340px] bg-blue-900 pt-[60px] pb-4 flex flex-col gap-4 justify-between text-grey">
      <User />
      <ul className="flex-1 mt-[30px]">
        <li>
          <Link
            className={cn(
              "flex items-center gap-4 py-4 pl-14 pr-4",
              pathname === ROUTES.dashboard ? "nav_bg text-white" : ""
            )}
            href={ROUTES.dashboard}
          >
            <HomeIcon />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex items-center gap-4 py-4 pl-14 pr-4",
              pathname === ROUTES.todos ? "nav_bg" : ""
            )}
            href={ROUTES.todos}
          >
            <TodoIcon />
            <span>Todos</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex items-center gap-4 py-4 pl-14 pr-4",
              pathname === ROUTES.profile ? "nav_bg" : ""
            )}
            href={ROUTES.profile}
          >
            <ProfileIcon />
            <span>Account Information</span>
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="py-4 px-14 flex items-center gap-2 text-grey border-none outline-none cursor-pointer"
        onClick={logout}
      >
        <LogoutIcon />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
