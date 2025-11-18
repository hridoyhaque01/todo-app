"use client";
import { IMAGES } from "@/constants";
import { useAuth } from "@/contexts";
import Image from "next/image";

function User() {
  const { user } = useAuth();
  const name =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : "Guest User";
  return (
    <div className="w-full max-w-[173px] mx-auto text-center">
      <Image
        src={user?.profile_image || IMAGES.profile}
        alt="profile image"
        width={200}
        height={200}
        className="size-[86px] object-cover rounded-full mx-auto"
        priority
      />
      <h2 className="text-base font-semibold leading-[100%] mt-6">{name}</h2>
      <p className="text-xs leading-[100%] mt-1">{user?.email || "N/A"}</p>
    </div>
  );
}

export default User;
