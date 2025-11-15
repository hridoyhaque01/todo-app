import { logout } from "@/actions";
import { LogoutIcon, ProfileIcon, ROUTES, TodoIcon } from "@/constants";
import Link from "next/link";
import User from "../profile/User";

function Sidebar() {
  return (
    <aside className="h-full overflow-auto w-full max-w-[340px] bg-blue-900 pt-[60px] pb-4 flex flex-col gap-4 justify-between text-white">
      <User />
      <ul className="flex-1 mt-[30px]">
        <li>
          <Link
            className="flex items-center gap-4 py-4 pl-14 pr-4 nav_bg"
            href={ROUTES.todos}
          >
            <TodoIcon />
            <span>Todos</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-4 py-4 pl-14 pr-4"
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
