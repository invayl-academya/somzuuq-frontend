import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logoutUser } from "@/redux/authSlice";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  AlignJustify,
  Blinds,
  LogOut,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const shopingHeaderNav = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/products",
  },
  {
    id: "Men",
    label: "men",
    path: "/shop/men",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/women",
  },
  {
    id: "kids",
    label: "kids",
    path: "/shop/kids",
  },
  {
    id: "Accessories",
    label: "Accessories",
    path: "/shop/kids",
  },
];

export const MenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(item.path);
  };
  return (
    <div className="flex items-center  mb-3 lg:mb-0 lg:items-center gap-3">
      {shopingHeaderNav?.map((nav) => (
        <button
          onClick={() => handleNavigate(nav)}
          className="text-md font-bold sm:text-gray-700 lg:text-slate-200 pointer"
          key={nav.id}
        >
          {nav.id}
        </button>
      ))}
    </div>
  );
};

export const UserContent = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="flex items-center gap-6">
      <Button
        variant="ghost"
        className="relative text-slate-200 hover:text-blue-500"
      >
        <ShoppingCart />
        <span className="absolute -top-2 -right-2 text-sm  bg-slate-100 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </Button>

      {/* user dropdown  */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-[#EEEFE0]">
              {user?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="mt-[45px]">
          <DropdownMenuLabel>Logged as {user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/shop/profile" className="flex items-center gap-4 ">
              <UserCog />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logoutHandler}
            className="flex items-center gap-4 "
          >
            <LogOut className="" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="sticky top-0 z-40 w-full bg-[#0B1D51] text-slate-100">
      <div className="container flex justify-between items-center px-6 md:px-6 p-2">
        <Link to="/shop/home" className="flex items-center space-x-2">
          <Blinds size={22} color="orange" />
          <span>SomZuuq Mrkt</span>
        </Link>

        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="">
                <AlignJustify size={18} className=" h-5 -5" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <MenuItems />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex gap-6 items-center">
          <MenuItems />

          {isAuthenticated && <UserContent />}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
