import AdminHeader from "@/screens/adminScreens/AdminHeader";
import AdminSidebar from "@/screens/adminScreens/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 flex p-40 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
