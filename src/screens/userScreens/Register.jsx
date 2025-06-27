import { registerFormControls } from "@/common";
import CommonForm from "@/common/Form";
import { fetchUserProfile, registerUser } from "@/redux/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { user } = useSelector((state) => state.auth);

  // console.log("formdata", formData);
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

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload.success) {
        toast.success("Register Succesfully");
        navigate("/shop/home");
      }
      console.log("regD", data);
    });
  };
  return (
    <div className="max-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl  font-bold text-foreground">Sign Up</h1>
        <p className="mt-2 text-sm">Already Have an Account</p>

        <Link to="/auth/login">Login </Link>
      </div>

      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Register"
      />
    </div>
  );
};

export default Register;
