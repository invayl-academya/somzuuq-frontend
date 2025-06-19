import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import Login from "./screens/userScreens/Login";
import Layout from "./screensLayout/userlayout/Layout";
import AdminLayout from "./screensLayout/adminLayout/adminLayout";
import AdminDashboard from "./screens/adminScreens/Dashboard";
import Register from "./screens/userScreens/Register";
import AdminProducts from "./screens/adminScreens/AdminProducts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
