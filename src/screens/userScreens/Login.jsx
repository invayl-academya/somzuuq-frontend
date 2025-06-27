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
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());

    if (user) {
      navigate("/shop/home");
    }
  }, [navigate, user]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        toast.success(result.payload.message || "Login Succesfully");
        navigate("/shop/home");
      } else {
        toast.error(result.payload || "failed Login");
      }
    });
  };
  return (
    <div className="max-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl  font-bold text-foreground">Login</h1>
        <p className="mt-2 text-sm">don't have an Account</p>

        <Link to="/auth/register">Sign up </Link>
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
