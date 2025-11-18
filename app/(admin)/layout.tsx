import Header from "@/components/navigation/Header";
import Sidebar from "@/components/navigation/Sidebar";
import { TodoProvider } from "@/contexts";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TodoProvider>
      <div className="flex bg-blue-50 h-screen">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto relative">{children}</div>
        </div>
      </div>
    </TodoProvider>
  );
}
