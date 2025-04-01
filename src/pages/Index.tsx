
import React, { useEffect } from "react";
import HerohypeLandingPage from "@/components/herohype/HerohypeLandingPage";

const Index: React.FC = () => {
  useEffect(() => {
    // Check if there are any approved submissions
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    const items = approvedSubmissions ? JSON.parse(approvedSubmissions) : [];
    
    // If no items exist or fewer than 5, create demo items for testing
    if (!items || items.length < 5) {
      console.log("Adding demo hero sections for testing");
      
      const demoItems = [
        {
          id: "demo-hero-123",
          imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
          twitterUsername: "herohype",
          categories: ["Minimal", "Dark"],
          likes: 24,
          saves: 12,
          status: "approved" as "approved" | "pending" | "rejected",
          submissionDate: new Date().toISOString(),
          userId: "demo-user-id",
          submittedBy: "demo-user-id"
        },
        {
          id: "demo-hero-124",
          imageUrl: "/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png",
          twitterUsername: "webdesigner",
          categories: ["Light", "Gradient"],
          likes: 18,
          saves: 9,
          status: "approved" as "approved" | "pending" | "rejected",
          submissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          userId: "demo-user-id",
          submittedBy: "demo-user-id"
        },
        {
          id: "demo-hero-125",
          imageUrl: "/lovable-uploads/22e3d4c1-cb57-47eb-a8b8-fb1a672b939f.png",
          twitterUsername: "uiuxmaster",
          categories: ["Illustrated", "Bento"],
          likes: 35,
          saves: 22,
          status: "approved" as "approved" | "pending" | "rejected",
          submissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          userId: "demo-user-id",
          submittedBy: "demo-user-id"
        },
        {
          id: "demo-hero-126",
          imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
          twitterUsername: "creativepro",
          categories: ["3D", "Animated"],
          likes: 42,
          saves: 18,
          status: "approved" as "approved" | "pending" | "rejected",
          submissionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          userId: "demo-user-id",
          submittedBy: "demo-user-id"
        },
        {
          id: "demo-hero-127",
          imageUrl: "/lovable-uploads/22e3d4c1-cb57-47eb-a8b8-fb1a672b939f.png",
          twitterUsername: "designsystem",
          categories: ["Typography", "Minimal"],
          likes: 29,
          saves: 15,
          status: "approved" as "approved" | "pending" | "rejected",
          submissionDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          userId: "demo-user-id",
          submittedBy: "demo-user-id"
        }
      ];
      
      // Merge with existing items if any
      const updatedItems = [...items, ...demoItems.slice(0, 5 - items.length)];
      localStorage.setItem("approvedSubmissions", JSON.stringify(updatedItems));
    }
  }, []);
  
  return <HerohypeLandingPage />;
};

export default Index;
