import { Button } from "@/components/ui/button";
import { logoutUser } from "@/redux/authSlice";
import { AlignJustify, ArrowBigLeft, LogOut, StepBack } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
          className="bg-blue-800 inline-flex gap-2 items-center hover:bg-slate-200 hover:text-gray-800
          rounded-md text-sm font-medium shadow-lg mr-3"
        >
          <Link to="/shop/products">Go Shopping</Link>
          <ArrowBigLeft />
        </Button>

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
