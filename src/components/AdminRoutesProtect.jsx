import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUserProfile } from "@/redux/authSlice"; // adjust path if needed
import { Loading } from "./Loading"; // your spinner component

const AdminRoutesProtect = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isInitialized, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized || isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/shop/home" replace />;
  }

  return children;
};

export default AdminRoutesProtect;
