import { fetchUserProfile } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (!isInitialized && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [dispatch, isAuthenticated, isInitialized]);

  if (isLoading && !isInitialized) {
    return <Loading />;
  }

  return children;
};

export default ProtectedRoute;
