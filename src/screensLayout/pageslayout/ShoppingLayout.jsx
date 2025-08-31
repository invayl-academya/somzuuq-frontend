import Navigation from "@/screens/pagesScreens/Navigation";
import React from "react";
import { Outlet } from "react-router-dom";

const ShoppingLayout = () => {
  
  return (
    <div className="flex flex-col bg-slate-100 overflow-hidden">
      <Navigation />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
