
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MyCollections: React.FC = () => {
  const [savedItems, setSavedItems] = useState<HeroCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Mock loading saved items
    // In a real app, this would be an API call to get the user's saved items
    setTimeout(() => {
      // Mock data - in a real app, this would come from the API
      const mockSavedItems: HeroCardProps[] = [
        {
          id: "2",
          imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400",
          twitterUsername: "webdev_sarah",
          categories: ["Light", "Minimal", "Typography"],
          likes: 85,
          views: 320,
          savedToCollection: true,
        },
        {
          id: "5",
          imageUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&h=600",
          twitterUsername: "frontend_dev",
          categories: ["Dark", "Typography"],
          likes: 95,
          views: 380,
          savedToCollection: true,
        },
        {
          id: "8",
          imageUrl: "https://images.unsplash.com/photo-1620121684840-edffcfc4b878?w=800&h=700",
          twitterUsername: "ui_unicorn",
          categories: ["Dark", "Gradient"],
          likes: 180,
          views: 710,
          savedToCollection: true,
        },
      ];
      
      setSavedItems(mockSavedItems);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleRemoveFromCollection = (id: string) => {
    // Remove the item from the saved items
    setSavedItems(prev => prev.filter(item => item.id !== id));
    
    // Show a toast notification
    toast({
      title: "Removed from collection",
      description: "The hero section has been removed from your collection",
    });
    
    // In a real app, this would be an API call to remove the item from the user's collection
    console.log(`Removed item ${id} from collection`);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Collection</h1>
          <p className="text-gray-600">
            Hero sections you've saved for inspiration
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 rounded-full border-t-2 border-b-2 border-gray-500 animate-spin"></div>
          </div>
        ) : savedItems.length > 0 ? (
          <div className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {savedItems.map(item => (
              <div key={item.id} className="masonry-item break-inside-avoid mb-6 transform transition-all duration-500 animate-fade-in">
                <HeroCard {...item} />
                <Button 
                  variant="outline" 
                  className="w-full mt-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleRemoveFromCollection(item.id)}
                >
                  Remove from Collection
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">Your collection is empty</h2>
            <p className="text-gray-600 mb-6">
              You haven't saved any hero sections yet.
            </p>
            <Button onClick={() => navigate("/")} variant="default">
              Browse Gallery
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollections;
