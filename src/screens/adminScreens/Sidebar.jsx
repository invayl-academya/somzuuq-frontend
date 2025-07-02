import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  BadgeCent,
  ChartColumnStacked,
  LayoutDashboard,
  ShoppingBasket,
  Users,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export const adminSidebarMenu = [
  {
    id: "dashboard",
    label: "dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "Products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "Orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCent />,
  },
  {
    id: "Users",
    label: "Users",
    path: "/admin/usersList",
    icon: <Users />,
  },
];

export const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 flex flex-col gap-4">
      {adminSidebarMenu?.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl gap-2 rounded-lg text-muted-foreground hover:text-slate-800"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </div>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-62">
          <div>
            <SheetHeader className="border border-b">
              <SheetTitle className="flex items-center gap-4">
                <ChartColumnStacked />
                <b className="text-xl font-extrabold ">Admin Sidebar</b>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>{" "}
      <aside className="hidden w-64 flex flex-col border-r bg-background p-6">
        <div
          className="flex items-center gap-2"
          onClick={() => navigate("/admin/dashoard")}
        >
          <ChartColumnStacked />
          <p>Admin Controls</p>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
