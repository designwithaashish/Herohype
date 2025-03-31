
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubmitHeroForm from "@/components/submission/SubmitHeroForm";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/herohype/Header";

const SubmitHero: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a hero section",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Submit Your Hero Section</h1>
          <p className="text-center text-gray-600 mb-8">
            Share your design with the community and inspire others
          </p>
          <SubmitHeroForm />
        </div>
      </div>
    </div>
  );
};

export default SubmitHero;
