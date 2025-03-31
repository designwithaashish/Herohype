
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MyCollections: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Notify the user that collections are no longer available
    toast({
      title: "Feature discontinued",
      description: "The collections feature has been removed. Redirecting to the gallery.",
      variant: "destructive",
    });
    
    // Redirect to home page after a short delay
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [navigate, toast]);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Feature Discontinued</h2>
          <p className="text-gray-600 mb-6">
            The collections feature is no longer available. Redirecting to the gallery...
          </p>
          <Button onClick={() => navigate("/")} variant="default">
            Go to Gallery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyCollections;
