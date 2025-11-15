import Header from "@/components/navigation/Header";
import Sidebar from "@/components/navigation/Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex bg-blue-50 h-screen">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto relative">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
