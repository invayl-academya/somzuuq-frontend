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
import { fetchUserProfile, logoutUser } from "@/redux/authSlice";
import { fetchCartItems } from "@/redux/cartSlice";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  AlignJustify,
  Blinds,
  Lock,
  LogOut,
  ShoppingCart,
  UserCog,
  Home,
  ShoppingBag,
  Shirt,
  Watch,
  LogIn,
  Baby,
  Speech,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartScreen from "./CartScreen";

// Navigation items with icons
export const shopingHeaderNav = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/products",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    id: "Men",
    label: "Men",
    path: "/shop/men",
    icon: <Shirt className="w-5 h-5" />,
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/women",
    icon: <Speech className="w-5 h-5" />,
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/kids",
    icon: <Baby className="w-5 h-5" />,
  },
  {
    id: "Accessories",
    label: "Accessories",
    path: "/shop/accessories",
    icon: <Watch className="w-5 h-5" />,
  },
];

export const MenuItems = ({ mobile = false }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleNavigate = (item) => {
    const id = item.id.toLowerCase();
    const isFilterable = !["home", "products"].includes(id);

    if (isFilterable) {
      const filter = { category: [id] };
      sessionStorage.setItem("filters", JSON.stringify(filter));
      navigate(`/shop/products?category=${id}`);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`${
        mobile ? "flex flex-col space-y-4" : "hidden lg:flex items-center gap-8"
      }`}
    >
      <div className={`${mobile ? "space-y-4" : "flex items-center gap-4"}`}>
        {shopingHeaderNav?.map((nav) => (
          <button
            onClick={() => handleNavigate(nav)}
            className={`flex items-center gap-2 ${
              mobile
                ? "text-gray-800 hover:text-indigo-600 w-full p-2 rounded-lg hover:bg-gray-100"
                : "text-gray-100 hover:text-indigo-600"
            }`}
            key={nav.id}
          >
            {mobile && nav.icon}
            <span className="font-medium capitalize">{nav.label}</span>
          </button>
        ))}
      </div>

      {!user && mobile && (
        <Link
          to="/auth/login"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-800 hover:text-indigo-600"
        >
          <LogIn className="w-5 h-5" />
          <span className="font-medium">Login</span>
        </Link>
      )}
    </div>
  );
};

export const UserContent = ({ mobile = false }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems(user?._id));
    }
  }, [user]);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  if (mobile) {
    return (
      <div className="mt-6 space-y-4">
        <button
          onClick={() => setOpenCartSheet(true)}
          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 text-gray-800 hover:text-indigo-600"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems?.items ? cartItems?.items.length : 0}
            </span>
          </div>
          <span className="font-medium">Cart</span>
        </button>

        <Link
          to="/shop/profile"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-800 hover:text-indigo-600"
        >
          <UserCog className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </Link>

        <Link
          to="/shop/myorders"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-800 hover:text-indigo-600"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-medium">My Orders</span>
        </Link>

        {user?.isAdmin && (
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-800 hover:text-indigo-600"
          >
            <Lock className="w-5 h-5" />
            <span className="font-medium">Admin Dashboard</span>
          </Link>
        )}

        <button
          onClick={logoutHandler}
          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 text-gray-800 hover:text-indigo-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>

        {openCartSheet && (
          <CartScreen onClose={() => setOpenCartSheet(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          variant="ghost"
          className="relative text-slate-200 hover:text-blue-500"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart />
          <span className="absolute -top-2 -right-2 text-sm bg-slate-100 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems?.items ? cartItems?.items.length : 0}
          </span>
        </Button>
        <SheetContent>
          <CartScreen onClose={() => setOpenCartSheet(false)} />
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-[#EEEFE0] text-gray-800">
              {user?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="mt-[45px]">
          <DropdownMenuLabel>Logged as {user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/shop/profile" className="flex items-center gap-4">
              <UserCog className="w-4 h-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/shop/myorders" className="flex items-center gap-4">
              <ShoppingBag className="w-4 h-4" />
              My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user?.isAdmin && (
            <DropdownMenuItem>
              <Link to="/admin/dashboard" className="flex items-center gap-4">
                <Lock className="w-4 h-4" />
                Admin View
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={logoutHandler}
            className="flex items-center gap-4"
          >
            <LogOut className="w-4 h-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 w-full bg-[#0B1D51] text-slate-100 shadow-md">
      <div className="container flex justify-between items-center px-4 py-3">
        <Link to="/shop/home" className="flex items-center space-x-2">
          <Blinds size={22} color="orange" />
          <span className="font-semibold">SomZuuq Mrkt</span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-4">
          {isAuthenticated && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="relative p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 text-xs bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {/* Cart count would go here */}
              </span>
            </button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <AlignJustify size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <Link
                    to="/shop/home"
                    className="flex items-center space-x-2 text-lg font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Blinds size={22} color="orange" />
                    <span>SomZuuq Mrkt</span>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <MenuItems mobile />
                  {isAuthenticated && <UserContent mobile />}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} SomZuuq Mrkt
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          <MenuItems />
          {isAuthenticated && <UserContent />}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
