import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import React from "react";

const AdminHeader = ({ setOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background ">
      <Button onClick={() => setOpen(true)}>
        <AlignJustify size={18} />
      </Button>

      <div className="flex flex-1 justify-end">
        <Button className="bg-orange-800 inline-flex gap-2 items-center rounded-md text-sm font-medium shadow-lg">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
