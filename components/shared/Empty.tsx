import { PlusIcon } from "@/constants";
import Image from "next/image";

function Empty({
  onAction,
  title = "",
}: {
  onAction?: () => void;
  title?: string;
}) {
  return (
    <div className="bg-white h-[469px] flex flex-col gap-1 items-center justify-center py-5 px-7 rounded-2xl mt-6">
      <div className="relative">
        <Image
          src="/images/empty.png"
          alt="No Data"
          width={150}
          height={150}
          priority
          className="w-60"
        />
        <button
          type="button"
          className="btn btn_primary size-[52px]! rounded-full! absolute bottom-0 right-0"
          onClick={onAction}
        >
          <PlusIcon className="size-8" />
        </button>
      </div>
      <p className="text-2xl text-black2">{title}</p>
    </div>
  );
}

export default Empty;
