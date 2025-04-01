
import React from "react";
import { StarIcon, HeartIcon, BookmarkIcon } from "lucide-react";

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

const HeroCard: React.FC<HeroCardProps> = ({
  imageUrl,
  twitterUsername,
  categories = [],
  likes = 0,
  saves = 0,
  isCurated,
  isFeatured
}) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
