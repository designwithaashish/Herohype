
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import { Button } from "@/components/ui/button";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useToast } from "@/hooks/use-toast";

const MyCollections: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [moodboardItems, setMoodboardItems] = useState<HeroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in and if they are an admin
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsLoggedIn(true);
      setIsAdmin(user.role === "admin");
      
      // If admin, load moodboard items
      if (user.role === "admin") {
        loadMoodboardItems();
      } else {
        // Non-admin users don't have access to moodboards yet
        toast({
          title: "Access restricted",
          description: "Moodboards are currently only available to admin users.",
        });
        
        setTimeout(() => navigate("/"), 2000);
      }
    } else {
      // Not logged in, redirect to login
      toast({
        title: "Authentication required",
        description: "Please log in to view moodboards.",
        variant: "destructive",
      });
      
      setTimeout(() => navigate("/login"), 1000);
    }
    
    setLoading(false);
  }, [navigate, toast]);
  
  const loadMoodboardItems = () => {
    // Check if there are moodboard items in localStorage
    const moodboardDataStr = localStorage.getItem("adminMoodboard");
    if (moodboardDataStr) {
      const moodboardData = JSON.parse(moodboardDataStr);
      setMoodboardItems(moodboardData);
    } else {
      // For now, load sample items for the admin moodboard
      const sampleItems: HeroCardProps[] = [
        {
          id: "mood-item-1",
          imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
          twitterUsername: "mood_curator",
          categories: ["Minimal", "Dark"],
          likes: 45,
          saves: 30,
        },
        {
          id: "mood-item-2",
          imageUrl: "/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png",
          twitterUsername: "designinspo",
          categories: ["Light", "Gradient"],
          likes: 32,
          saves: 21,
        },
        {
          id: "mood-item-3",
          imageUrl: "/lovable-uploads/22e3d4c1-cb57-47eb-a8b8-fb1a672b939f.png",
          twitterUsername: "heromaker",
          categories: ["Typography", "Bento"],
          likes: 56,
          saves: 38,
        }
      ];
      
      // Save to localStorage for future use
      localStorage.setItem("adminMoodboard", JSON.stringify(sampleItems));
      setMoodboardItems(sampleItems);
    }
  };
  
  // Function to add an item to the moodboard (would be used from admin panel)
  const addToMoodboard = (item: HeroCardProps) => {
    setMoodboardItems(prev => {
      const newItems = [...prev, item];
      localStorage.setItem("adminMoodboard", JSON.stringify(newItems));
      return newItems;
    });
    
    toast({
      title: "Added to Moodboard",
      description: "Item has been added to your moodboard.",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto py-12 px-4">
          <div className="text-center py-16">
            <p>Loading moodboards...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold mb-2">Admin Moodboards</h1>
          <p className="text-gray-600">
            Curated collections of inspiring hero sections by our team
          </p>
        </div>
        
        {isAdmin && (
          <>
            {moodboardItems.length > 0 ? (
              <GalleryGrid heroes={moodboardItems} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No moodboard items yet</h2>
                <p className="text-gray-600 mb-6">
                  Start saving hero sections from the gallery to create your moodboard.
                </p>
                <Button onClick={() => navigate("/")} variant="default">
                  Explore Gallery
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCollections;
