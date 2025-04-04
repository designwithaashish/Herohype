
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import SubmitHeroForm from "@/components/submission/SubmitHeroForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SubmitHero: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please log in to submit a hero section",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        setUserId(session.user.id);
      } catch (error) {
        console.error("Error checking auth:", error);
        toast({
          title: "Authentication error",
          description: "There was a problem verifying your account",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-12 px-6 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Submit a Hero Section</h1>
          
          {userId ? (
            <SubmitHeroForm userId={userId} />
          ) : (
            <div className="text-center py-10">
              <p className="mb-4">Please log in to submit a hero section</p>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitHero;
