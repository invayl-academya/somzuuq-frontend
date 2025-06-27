import AdminHeader from "@/screens/adminScreens/AdminHeader";
import AdminSidebar from "@/screens/adminScreens/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />

        <main className="flex-1 flex p-40 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
