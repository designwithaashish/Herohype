
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import LoginImageCarousel from "@/components/auth/LoginImageCarousel";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl flex bg-white">
        {/* Left side - Image Carousel */}
        <div className="hidden md:block w-1/2 bg-black">
          <LoginImageCarousel />
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
