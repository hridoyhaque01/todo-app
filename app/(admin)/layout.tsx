import React from "react";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      admin AdminLayout
      {children}
    </div>
  );
}

export default AdminLayout;
