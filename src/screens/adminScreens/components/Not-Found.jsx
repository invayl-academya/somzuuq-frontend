import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1 className="text-red-500 mb-4 text-5xl">404</h1>
      <p className="text-xl  text-gray-600 mb-6">OOPS - Page Not Found !</p>
      <Link
        className="px-5 bg-blue-600 p-2  rounded-xl hover:bg-blue-900 text-slate-50"
        to="/shop/home"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
