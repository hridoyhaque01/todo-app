import AuthImage from "@/components/auth/AuthImage";
import React from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex">
      <div className="w-full max-w-[606px] h-full flex items-center justify-center bg-blue-100">
        <AuthImage />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}

export default AuthLayout;
