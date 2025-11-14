import Header from "@/components/navigation/Header";
import Sidebar from "@/components/navigation/Sidebar";
import React from "react";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-blue-50 h-screen">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
