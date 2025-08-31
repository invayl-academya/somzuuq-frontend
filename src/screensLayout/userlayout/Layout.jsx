import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Side - Branding Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 p-8">
        <div className="max-w-md space-y-8 text-center text-white">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
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
            <h1 className="text-3xl font-bold">Somzuuq MRKT</h1>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl font-semibold">Welcome Back!</h2>
          <p className="text-lg opacity-90">
            Discover amazing products and exclusive deals just for you.
          </p>

          {/* Decorative Elements */}
          <div className="pt-8">
            <div className="flex justify-center space-x-4 opacity-80">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-white"
                  style={{ opacity: 0.5 + i * 0.15 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Content Area */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-4 sm:p-8">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm sm:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
