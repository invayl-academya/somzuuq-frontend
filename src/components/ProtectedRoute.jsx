import { fetchUserProfile } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isInitialized } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // only fetch if we haven't checked yet
    if (!isInitialized) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    // ✅ Redirect only after initialization
    if (isInitialized && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  // You can show a spinner while checking auth
  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }

  return children;
};

export default ProtectedRoute;
