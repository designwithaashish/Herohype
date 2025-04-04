
import React, { useEffect } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginImageCarousel from "@/components/auth/LoginImageCarousel";
import Header from "@/components/herohype/Header";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is already logged in, redirect to profile if they are
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/profile');
      }
    };
    
    checkSession();
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center p-4 pt-[50px]">
        <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl flex bg-white">
          {/* Left side - Image Carousel */}
          <div className="hidden md:block w-1/2 bg-black">
            <LoginImageCarousel showText={false} />
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
