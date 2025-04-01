
import React from "react";
import { StarIcon, HeartIcon, BookmarkIcon, XCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface HeroCardProps {
  id: string;
  imageUrl: string;
  twitterUsername: string;
  categories?: string[];
  likes?: number;
  saves?: number;
  status?: "approved" | "pending" | "rejected";
  submissionDate?: string;
  userId?: string;
  submittedBy?: string;
  isCurated?: boolean;
  isFeatured?: boolean;
}

interface HeroCardComponentProps extends HeroCardProps {
  showRemoveOption?: boolean;
  showCuratedControls?: boolean;
  onRemove?: (id: string) => void;
  onToggleCurated?: (id: string, isCurated: boolean) => void;
}

const HeroCard: React.FC<HeroCardComponentProps> = ({
  id,
  imageUrl,
  twitterUsername,
  categories = [],
  likes = 0,
  saves = 0,
  isCurated,
  isFeatured,
  showRemoveOption = false,
  showCuratedControls = false,
  onRemove,
  onToggleCurated
}) => {
  const { toast } = useToast();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(id);
      toast({
        title: "Item removed",
        description: "The item has been removed successfully.",
      });
    }
  };

  const handleToggleCurated = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleCurated) {
      onToggleCurated(id, !isCurated);
      toast({
        title: isCurated ? "Removed from curated" : "Added to curated",
        description: isCurated 
          ? "The item has been removed from curated collection." 
          : "The item has been added to curated collection.",
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg transition-all duration-200 border border-gray-100 hover:shadow-md group">
      <div className="relative">
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-10 bg-[#DAFF00] text-black px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        
        {/* Curated badge */}
        {isCurated && (
          <div className="absolute top-3 right-3 z-10 bg-black text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <StarIcon className="h-3 w-3" />
            <span>Curated</span>
          </div>
        )}
        
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={`Hero design by ${twitterUsername}`}
            className="w-full object-cover transition-transform duration-300"
          />
          
          {/* Hover overlay with details */}
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            <div className="text-white text-sm font-medium mb-2">@{twitterUsername}</div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <div className="flex items-center text-xs text-white">
                  <HeartIcon className="w-3.5 h-3.5 mr-1" />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center text-xs text-white">
                  <BookmarkIcon className="w-3.5 h-3.5 mr-1" />
                  <span>{saves}</span>
                </div>
              </div>
              
              {/* Admin controls */}
              {showCuratedControls && (
                <button 
                  onClick={handleToggleCurated}
                  className={`p-1 rounded-full ${isCurated ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-700'}`}
                >
                  <StarIcon className="w-4 h-4" />
                </button>
              )}
              
              {showRemoveOption && (
                <button 
                  onClick={handleRemove}
                  className="p-1 rounded-full bg-red-500 text-white"
                >
                  <XCircleIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
