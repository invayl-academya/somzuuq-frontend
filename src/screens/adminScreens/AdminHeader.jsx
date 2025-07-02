import { Button } from "@/components/ui/button";
import { logoutUser } from "@/redux/authSlice";
import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
    // navigate("/auth/login");
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background ">
      <Button onClick={() => setOpen(true)}>
        <AlignJustify size={18} />
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => logoutHandler()}
          className="bg-orange-800 inline-flex gap-2 items-center rounded-md text-sm font-medium shadow-lg"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
