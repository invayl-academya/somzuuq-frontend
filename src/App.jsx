import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import Login from "./screens/userScreens/Login";
import Layout from "./screensLayout/userlayout/Layout";
import AdminLayout from "./screensLayout/adminLayout/adminLayout";
import AdminDashboard from "./screens/adminScreens/Dashboard";
import Register from "./screens/userScreens/Register";
import AdminProducts from "./screens/adminScreens/AdminProducts";
import Listing from "./screens/pagesScreens/Listing";
import ShoppingLayout from "./screensLayout/pageslayout/ShoppingLayout";
import ShoppingProducts from "./screens/pagesScreens/ShoppingProducts";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./screens/userScreens/Profile";
import AdminOrders from "./screens/adminScreens/AdminOrders";
import AdminUsersList from "./screens/adminScreens/AdminUsersList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="usersList" element={<AdminUsersList />} />
        </Route>

        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShoppingLayout />
            </ProtectedRoute>
          }
        >
          <Route path="listing" element={<Listing />} />
          <Route path="home" element={<ShoppingProducts />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
