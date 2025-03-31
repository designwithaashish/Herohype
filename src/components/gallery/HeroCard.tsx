
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize, Heart, Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface HeroCardProps {
  id: string;
  imageUrl: string;
  twitterUsername: string;
  categories: string[];
  likes?: number;
  views?: number;
  savedToCollection?: boolean;
  isLiked?: boolean;
  submissionDate?: string;
}

const HeroCard: React.FC<HeroCardProps> = ({
  id,
  imageUrl,
  twitterUsername,
  categories,
  likes = 0,
  views = 0,
  savedToCollection = false,
  isLiked = false,
  submissionDate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(savedToCollection);
  const [likeCount, setLikeCount] = useState(likes);

  // Increment view count when card is rendered
  useEffect(() => {
    // In a real app, this would be an API call to increment views
    console.log(`Viewed hero section: ${id}`);
  }, [id]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle like status
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    
    // Update like count
    setLikeCount(prev => newLikedStatus ? prev + 1 : prev - 1);
    
    // In a real app, this would be an API call to update likes in the CMS
    console.log(`${newLikedStatus ? 'Liked' : 'Unliked'} hero section: ${id}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle saved status
    const newSavedStatus = !saved;
    setSaved(newSavedStatus);
    
    // In a real app, this would be an API call to update saved status in the CMS
    console.log(`${newSavedStatus ? 'Saved to' : 'Removed from'} collection: ${id}`);
  };

  return (
    <Dialog>
      <div 
        className="group relative bg-white rounded-[32px] shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-4 border-gray-100"
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
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
              
              <div className={`absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ${isHovered ? 'bg-opacity-30' : ''}`}></div>
              
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="bg-white text-black p-2 rounded-full flex items-center justify-center w-10 h-10 transform transition-transform duration-300">
                    <Maximize size={18} />
                  </span>
                </div>
              )}

              {isHovered && (
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <button 
                    onClick={handleLike}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors"
                  >
                    <Heart 
                      size={16} 
                      className={liked ? "fill-red-500 text-red-500" : "text-gray-700"} 
                    />
                  </button>
                  <button 
                    onClick={handleSave}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors"
                  >
                    <Bookmark 
                      size={16} 
                      className={saved ? "fill-black text-black" : "text-gray-700"} 
                    />
                  </button>
                </div>
              )}

              {isHovered && (
                <div className="absolute bottom-3 right-3">
                  <a
                    href={`https://twitter.com/${twitterUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-3 py-1 rounded-full text-sm transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{twitterUsername}
                  </a>
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
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="flex gap-2 mr-3">
              <button 
                onClick={handleLike}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors"
              >
                <Heart 
                  size={16} 
                  className={liked ? "fill-red-500 text-red-500" : "text-gray-700"} 
                />
              </button>
              <button 
                onClick={handleSave}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black p-2 rounded-full flex items-center justify-center w-8 h-8 transition-colors"
              >
                <Bookmark 
                  size={16} 
                  className={saved ? "fill-black text-black" : "text-gray-700"} 
                />
              </button>
            </div>
            <a
              href={`https://twitter.com/${twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-3 py-1 rounded-full text-sm transition-all"
            >
              @{twitterUsername}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeroCard;
