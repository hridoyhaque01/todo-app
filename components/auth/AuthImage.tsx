"use client";
import { IMAGES } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

function AuthImage() {
  const pathname = usePathname();
  const isLogin = pathname.includes("login");
  const imageSrc = isLogin ? IMAGES.loginBg : IMAGES.signupBg;
  const altText = isLogin ? "Login Background" : "Signup Background";

  return (
    <Image
      src={imageSrc}
      alt={altText}
      width={606}
      height={606}
      priority
      className="w-full"
    />
  );
}

export default AuthImage;
