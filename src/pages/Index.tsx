
import React, { useEffect } from "react";
import HerohypeLandingPage from "@/components/herohype/HerohypeLandingPage";

const Index: React.FC = () => {
  useEffect(() => {
    // Check if there are any approved submissions
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    const items = approvedSubmissions ? JSON.parse(approvedSubmissions) : [];
    
    // If no items exist, create a demo item for testing
    if (!items || items.length === 0) {
      console.log("Adding demo hero section for testing");
      const demoItem = {
        id: "demo-hero-123",
        imageUrl: "/placeholder.svg",
        twitterUsername: "herohype",
        categories: ["Minimal", "Dark"],
        likes: 12,
        saves: 5,
        status: "approved" as "approved" | "pending" | "rejected",
        submissionDate: new Date().toISOString(),
        userId: "demo-user-id",  // Add userId to the demo item
        submittedBy: "demo-user-id"  // Add submittedBy to the demo item
      };
      
      localStorage.setItem("approvedSubmissions", JSON.stringify([demoItem]));
    }
  }, []);
  
  return <HerohypeLandingPage />;
};

export default Index;
