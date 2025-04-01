
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
      
      // Load moodboard items
      loadMoodboardItems();
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
      // Initialize empty moodboard
      setMoodboardItems([]);
      localStorage.setItem("adminMoodboard", JSON.stringify([]));
    }
  };
  
  // Function to add an item to the moodboard
  const addToMoodboard = (item: HeroCardProps) => {
    setMoodboardItems(prev => {
      // Check if item already exists
      if (prev.some(existing => existing.id === item.id)) {
        toast({
          title: "Already in Moodboard",
          description: "This item is already in your moodboard.",
        });
        return prev;
      }
      
      const newItems = [...prev, item];
      localStorage.setItem("adminMoodboard", JSON.stringify(newItems));
      
      toast({
        title: "Added to Moodboard",
        description: "Item has been added to your moodboard.",
      });
      
      return newItems;
    });
  };
  
  // Function to remove an item from the moodboard
  const removeFromMoodboard = (id: string) => {
    if (!isAdmin) return;
    
    setMoodboardItems(prev => {
      const newItems = prev.filter(item => item.id !== id);
      localStorage.setItem("adminMoodboard", JSON.stringify(newItems));
      return newItems;
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
          <h1 className="text-3xl font-playfair font-bold mb-2">Moodboards</h1>
          <p className="text-gray-600">
            Collections of inspiring hero sections
          </p>
        </div>
        
        {isLoggedIn && (
          <>
            {moodboardItems.length > 0 ? (
              <GalleryGrid heroes={moodboardItems.map(item => ({
                ...item,
                showRemoveOption: isAdmin,
                onRemove: removeFromMoodboard
              }))} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No moodboard items yet</h2>
                <p className="text-gray-600 mb-6">
                  {isAdmin 
                    ? "Start saving hero sections from the gallery to create your moodboard."
                    : "Check back soon for curated moodboards."}
                </p>
                {isAdmin && (
                  <Button onClick={() => navigate("/")} variant="default">
                    Explore Gallery
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCollections;
