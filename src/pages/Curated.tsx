
import React, { useEffect, useState } from "react";
import Header from "@/components/herohype/Header";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useToast } from "@/hooks/use-toast";

const Curated: React.FC = () => {
  const [curatedItems, setCuratedItems] = useState<HeroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is admin
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.role === "admin");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Load curated items from localStorage (marked with isCurated: true)
    const loadCuratedItems = () => {
      try {
        console.log("Loading curated items");
        const approvedSubmissions = localStorage.getItem("approvedSubmissions");
        if (approvedSubmissions) {
          const items = JSON.parse(approvedSubmissions);
          // If no items are marked as curated, mark the first 3 as curated
          let curatedHeroes = items.filter((item: any) => item.isCurated === true);
          
          if (curatedHeroes.length === 0 && items.length > 0) {
            // Mark the first 3 items as curated
            const updatedItems = items.map((item: any, index: number) => {
              if (index < 3) {
                return { ...item, isCurated: true };
              }
              return item;
            });
            localStorage.setItem("approvedSubmissions", JSON.stringify(updatedItems));
            curatedHeroes = updatedItems.filter((item: any) => item.isCurated === true);
          }
          
          console.log("Found curated heroes:", curatedHeroes.length, curatedHeroes);
          setCuratedItems(curatedHeroes);
        } else {
          setCuratedItems([]);
        }
      } catch (error) {
        console.error("Error loading curated items:", error);
        setCuratedItems([]);
      }
      setLoading(false);
    };
    
    loadCuratedItems();
  }, []);
  
  const handleToggleCurated = (id: string, isCurated: boolean) => {
    if (!isAdmin) return;
    
    // Update item in approvedSubmissions
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    if (approvedSubmissions) {
      const items = JSON.parse(approvedSubmissions);
      const updatedItems = items.map((item: any) => {
        if (item.id === id) {
          return { ...item, isCurated: isCurated };
        }
        return item;
      });
      
      localStorage.setItem("approvedSubmissions", JSON.stringify(updatedItems));
      
      // Update current view
      if (!isCurated) {
        setCuratedItems(prev => prev.filter(item => item.id !== id));
      }
      
      toast({
        title: "Curated status updated",
        description: isCurated ? "Item added to curated collection." : "Item removed from curated collection."
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold mb-2">Curated Picks</h1>
          <p className="text-gray-600">
            Hand-picked gallery of exceptional hero sections by our expert team
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <p>Loading curated selections...</p>
          </div>
        ) : (
          <>
            {curatedItems.length > 0 ? (
              <GalleryGrid 
                heroes={curatedItems.map(item => ({
                  ...item,
                  showCuratedControls: isAdmin,
                  onToggleCurated: handleToggleCurated
                }))}
                columns={5}
              />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No curated items yet</h2>
                <p className="text-gray-600 mb-6">
                  Check back soon for our hand-picked collection of exceptional hero sections.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Curated;
