import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center  bg-slate-500 p-5 py-4 ">
        <div className="max-w-md space-y-6 text-center text-slate-100">
          <h1>Welcome to Somzuuq MRKT</h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-slate-200 px-4 py-12 sm:px-6 lg:px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
