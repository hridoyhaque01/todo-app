import { BellIcon, CalendarIcon, IMAGES } from "@/constants";
import Image from "next/image";

function Header() {
  return (
    <header className="w-full h-[88px] bg-white flex items-center justify-between px-20">
      <Image
        src={IMAGES.logo}
        alt="Logo"
        width={100}
        height={100}
        className="w-auto"
        priority
      />
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="size-[34px] rounded-lg bg-blue-500 flex items-center justify-center text-white justify-self-end"
        >
          <BellIcon className="size-4" />
        </button>
        <button
          type="button"
          className="size-[34px] rounded-lg bg-blue-500 flex items-center justify-center text-white justify-self-end"
        >
          <CalendarIcon className="size-4" />
        </button>
        <div className="text-sm font-medium leading-[100%] text-blue-900">
          <p>
            <span className="text-base">Friday</span> <br /> 07/11/2025
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
