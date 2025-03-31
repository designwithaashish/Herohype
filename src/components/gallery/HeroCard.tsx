
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize } from "lucide-react";

export interface HeroCardProps {
  id: string;
  imageUrl: string;
  twitterUsername: string;
  categories: string[];
}

const HeroCard: React.FC<HeroCardProps> = ({
  imageUrl,
  twitterUsername,
  categories,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <div 
        className="group relative bg-white rounded-[32px] shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-4 border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogTrigger className="w-full" asChild>
          <button className="w-full text-left">
            <div className="relative aspect-auto w-full overflow-hidden rounded-[28px]">
              <img
                src={imageUrl}
                alt={`Hero section by @${twitterUsername}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
