
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import { Button } from "@/components/ui/button";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useToast } from "@/hooks/use-toast";
import { Grid, PlusCircle } from "lucide-react";

const MyCollections: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [moodboardItems, setMoodboardItems] = useState<HeroCardProps[]>([]);
  const [availableItems, setAvailableItems] = useState<HeroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSelectionGrid, setShowSelectionGrid] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in and if they are an admin
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setIsAdmin(user.role === "admin");
        
        // Load moodboard items
        loadMoodboardItems();
        loadAvailableItems();
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      // Not logged in, show public moodboards with empty state
      setIsLoggedIn(false);
      setIsAdmin(false);
      loadMoodboardItems();
    }
    
    setLoading(false);
  }, [navigate]);
  
  const loadMoodboardItems = () => {
    // Check if there are moodboard items in localStorage
    try {
      const moodboardDataStr = localStorage.getItem("adminMoodboard");
      if (moodboardDataStr) {
        const moodboardData = JSON.parse(moodboardDataStr);
        console.log("Loaded moodboard items:", moodboardData.length, moodboardData);
        setMoodboardItems(moodboardData);
      } else {
        // Initialize empty moodboard
        setMoodboardItems([]);
        if (isAdmin) {
          localStorage.setItem("adminMoodboard", JSON.stringify([]));
        }
      }
    } catch (error) {
      console.error("Error loading moodboard items:", error);
      setMoodboardItems([]);
    }
  };
  
  const loadAvailableItems = () => {
    // Load all approved items
    try {
      const approvedItemsStr = localStorage.getItem("approvedSubmissions");
      if (approvedItemsStr) {
        const approvedItems = JSON.parse(approvedItemsStr);
        setAvailableItems(approvedItems.filter((item: HeroCardProps) => item.status === "approved"));
      } else {
        setAvailableItems([]);
      }
    } catch (error) {
      console.error("Error loading available items:", error);
      setAvailableItems([]);
    }
  };
  
  // Function to add an item to the moodboard
  const addToMoodboard = (item: HeroCardProps) => {
    if (!isAdmin) return;
    
    const currentMoodboard = JSON.parse(localStorage.getItem("adminMoodboard") || "[]");
    
    // Check if item is already in the moodboard
    if (currentMoodboard.some((existingItem: any) => existingItem.id === item.id)) {
      toast({
        title: "Already in moodboard",
        description: "This item is already in your moodboard",
      });
      return;
    }
    
    const updatedMoodboard = [...currentMoodboard, item];
    localStorage.setItem("adminMoodboard", JSON.stringify(updatedMoodboard));
    setMoodboardItems(updatedMoodboard);
    
    toast({
      title: "Added to moodboard",
      description: "Item has been added to your moodboard",
    });
  };
  
  // Function to remove an item from the moodboard
  const removeFromMoodboard = (id: string) => {
    if (!isAdmin) return;
    
    setMoodboardItems(prev => {
      const newItems = prev.filter(item => item.id !== id);
      localStorage.setItem("adminMoodboard", JSON.stringify(newItems));
      
      toast({
        title: "Removed from Moodboard",
        description: "Item has been removed from your moodboard.",
      });
      
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair font-bold mb-2">Moodboards</h1>
            <p className="text-gray-600">
              Collections of inspiring hero sections
            </p>
          </div>
          {isAdmin && (
            <Button 
              onClick={() => setShowSelectionGrid(!showSelectionGrid)}
              className="flex items-center gap-2"
              variant={showSelectionGrid ? "destructive" : "default"}
            >
              {showSelectionGrid ? "Close" : (
                <>
                  <PlusCircle size={16} />
                  Add Items
                </>
              )}
            </Button>
          )}
        </div>
        
        {showSelectionGrid && isAdmin && (
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4">Available Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {availableItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative cursor-pointer hover:scale-105 transition-transform border rounded-lg overflow-hidden"
                  onClick={() => addToMoodboard(item)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={`Design by ${item.twitterUsername}`} 
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                    <PlusCircle className="text-white" size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <>
          {moodboardItems.length > 0 ? (
            <>
              <h2 className="text-xl font-medium mb-4">My Moodboard</h2>
              <GalleryGrid heroes={moodboardItems.map(item => ({
                ...item,
                showRemoveOption: isAdmin,
                onRemove: removeFromMoodboard
              }))} />
            </>
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
      </div>
    </div>
  );
};

export default MyCollections;
