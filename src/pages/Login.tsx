
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import LoginImageCarousel from "@/components/auth/LoginImageCarousel";
import Header from "@/components/herohype/Header";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center p-4 pt-[50px]">
        <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl flex bg-white">
          {/* Left side - Image Carousel */}
          <div className="hidden md:block w-1/2 bg-black">
            <LoginImageCarousel showText={false} />
          </div>
          
          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
