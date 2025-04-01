
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginImageCarousel from "@/components/auth/LoginImageCarousel";
import Header from "@/components/herohype/Header";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center p-4 pt-[100px]">
        <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl flex bg-white">
          {/* Left side - Image Carousel (reusing the same component) */}
          <div className="hidden md:block w-1/2 bg-black">
            <LoginImageCarousel />
          </div>
          
          {/* Right side - Register Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
