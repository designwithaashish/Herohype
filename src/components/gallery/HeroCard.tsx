
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface HeroCardProps {
  id: string;
  imageUrl: string;
  twitterUsername: string;
  categories: string[];
  submissionDate?: string;
  status?: "pending" | "approved" | "rejected";
  likes: number;
  saves: number;
}

const HeroCard: React.FC<HeroCardProps> = ({
  id,
  imageUrl,
  twitterUsername,
  categories,
  submissionDate,
  status = "approved", // Default to approved for backward compatibility
  likes,
  saves,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [saveCount, setSaveCount] = useState(saves);
  const { toast } = useToast();

  // Effect to log when a card is viewed
  useEffect(() => {
    console.log(`Viewed hero section: ${id}`);
  }, [id]);

  // Check if user has previously liked/saved this hero
  useEffect(() => {
    const likedHeroes = JSON.parse(localStorage.getItem("likedHeroes") || "[]");
    const savedHeroes = JSON.parse(localStorage.getItem("savedHeroes") || "[]");
    
    setIsLiked(likedHeroes.includes(id));
    setIsSaved(savedHeroes.includes(id));
  }, [id]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like hero sections",
        variant: "destructive",
      });
      return;
    }
    
    const likedHeroes = JSON.parse(localStorage.getItem("likedHeroes") || "[]");
    
    if (isLiked) {
      // Unlike
      const updatedLikes = likedHeroes.filter((heroId: string) => heroId !== id);
      localStorage.setItem("likedHeroes", JSON.stringify(updatedLikes));
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      // Like
      likedHeroes.push(id);
      localStorage.setItem("likedHeroes", JSON.stringify(likedHeroes));
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
      
      toast({
        title: "Hero section liked",
        description: "This hero section has been added to your likes",
      });
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save hero sections to your collection",
        variant: "destructive",
      });
      return;
    }
    
    const savedHeroes = JSON.parse(localStorage.getItem("savedHeroes") || "[]");
    
    if (isSaved) {
      // Unsave
      const updatedSaves = savedHeroes.filter((heroId: string) => heroId !== id);
      localStorage.setItem("savedHeroes", JSON.stringify(updatedSaves));
      setIsSaved(false);
      setSaveCount(prev => prev - 1);
    } else {
      // Save
      savedHeroes.push(id);
      localStorage.setItem("savedHeroes", JSON.stringify(savedHeroes));
      setIsSaved(true);
      setSaveCount(prev => prev + 1);
      
      toast({
        title: "Hero section saved",
        description: "This hero section has been saved to your collection",
      });
    }
  };

  return (
    <Dialog>
      <div 
        className="group relative bg-white rounded-[32px] shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.05] border-4 border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogTrigger className="w-full" asChild>
          <button className="w-full text-left">
            <div className="relative w-full h-full overflow-hidden rounded-[28px] aspect-auto">
              {!isLoaded && (
                <div className="absolute inset-0 w-full h-full">
                  <Skeleton className="w-full h-full bg-gray-100 animate-pulse" />
                </div>
              )}
              <img
                src={imageUrl}
                alt={`Hero section by @${twitterUsername}`}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
              
              {/* Gradient overlay at the bottom, visible on hover */}
              <div 
                className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>
              
              {isHovered && (
                <div className="absolute bottom-3 left-0 right-0 px-3 flex justify-between items-center z-10">
                  {/* Twitter username */}
                  <a
                    href={`https://twitter.com/${twitterUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:underline transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{twitterUsername}
                  </a>
                  
                  {/* Like and Save buttons */}
                  {status === "approved" && (
                    <div className="flex items-center space-x-3">
                      <button
                        className={`flex items-center text-sm text-white`}
                        onClick={handleLike}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                        <span className="text-xs">{likeCount}</span>
                      </button>
                      
                      <button
                        className={`flex items-center text-sm text-white`}
                        onClick={handleSave}
                      >
                        <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? 'fill-current text-blue-500' : ''}`} />
                        <span className="text-xs">{saveCount}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </button>
        </DialogTrigger>
      </div>
      
      <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] p-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={`Hero section by @${twitterUsername}`}
            className="w-full h-full object-contain"
          />
          
          {/* Bottom gradient and info in modal view */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <a
              href={`https://twitter.com/${twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm hover:underline"
            >
              @{twitterUsername}
            </a>
            
            {/* Like/Save buttons in modal view, only visible for approved images */}
            {status === "approved" && (
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center text-white"
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span>{likeCount}</span>
                </button>
                
                <button
                  className="flex items-center text-white"
                  onClick={handleSave}
                >
                  <Bookmark className={`h-5 w-5 mr-2 ${isSaved ? 'fill-current text-blue-500' : ''}`} />
                  <span>{saveCount}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeroCard;
