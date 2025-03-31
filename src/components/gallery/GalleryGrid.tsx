
import React from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";

interface GalleryGridProps {
  heroes: HeroCardProps[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ heroes }) => {
  return (
    <div className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 px-4 lg:px-8">
      {heroes.map(hero => (
        <div key={hero.id} className="masonry-item break-inside-avoid mb-6 transform transition-all duration-500 animate-fade-in">
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
