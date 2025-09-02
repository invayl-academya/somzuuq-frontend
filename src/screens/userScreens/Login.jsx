import { loginFormControls } from "@/common";
import CommonForm from "@/common/Form";
import { fetchUserProfile, loginUser } from "@/redux/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { user, isInitialized } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchUserProfile());
    }
  }, []);

  useEffect(() => {
    if (isInitialized && user) {
      navigate("/shop/home");
    }
  }, [navigate, user, isInitialized]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        toast.success(result.payload.message || "Login Succesfully");
        navigate("/shop/products");
      } else {
        toast.error(result.payload || "failed Login");
      }
    });
  };
  return (
    <div className="max-auto w-full max-w-md space-y-6">
      <div className="text-center">
        {/* Logo placeholder - replace with your actual e-commerce logo */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="mt-2 text-gray-600">Sign in to access your account</p>

        <div className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Create one now
          </Link>
        </div>

        <div className="py-3 ">
          <p>Test User</p>
          email : sacda@gmail.com
          <p>Sacda12345#</p>
        </div>
      </div>

      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Login"
      />
    </div>
  );
};

export default Login;
