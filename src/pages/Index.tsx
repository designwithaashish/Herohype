
import React, { useEffect } from "react";
import HerohypeLandingPage from "@/components/herohype/HerohypeLandingPage";

const Index: React.FC = () => {
  // Check if we have approved submissions for testing
  useEffect(() => {
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    
    // If no approved submissions exist, create a demo item for testing
    if (!approvedSubmissions || JSON.parse(approvedSubmissions).length === 0) {
      const demoItem = {
        id: "demo-1",
        imageUrl: "/placeholder.svg",
        twitterUsername: "demo_user",
        categories: ["Dark", "Minimal"],
        likes: 5,
        saves: 3,
        status: "approved" as const, // Explicitly type as "approved"
        submissionDate: new Date().toISOString()
      };
      
      localStorage.setItem("approvedSubmissions", JSON.stringify([demoItem]));
      console.log("Created demo item for gallery testing");
    }
  }, []);
  
  return <HerohypeLandingPage />;
};

export default Index;
