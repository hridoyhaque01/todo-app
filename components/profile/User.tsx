import { IMAGES } from "@/constants";
import Image from "next/image";

function User() {
  return (
    <div className="w-full max-w-[173px] mx-auto text-center">
      <Image
        src={IMAGES.profile}
        alt="profile image"
        width={200}
        height={200}
        className="size-[86px] object-cover rounded-full mx-auto"
        priority
      />
      <h2 className="text-base font-semibold leading-[100%] mt-6">amanuel</h2>
      <p className="text-xs leading-[100%] mt-1">amanuel@gmail.com</p>
    </div>
  );
}

export default User;
