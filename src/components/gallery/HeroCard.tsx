
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

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
        className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogTrigger className="w-full" asChild>
          <button className="w-full text-left">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={imageUrl}
                alt={`Hero section by @${twitterUsername}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className={`absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ${isHovered ? 'bg-opacity-30' : ''}`}></div>
              
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center gap-1.5 transform transition-transform duration-300">
                    <ExternalLink size={16} /> View Full Screen
                  </span>
                </div>
              )}

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
