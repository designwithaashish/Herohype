
import React from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";

interface GalleryGridProps {
  heroes: HeroCardProps[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ heroes }) => {
  return (
    <div className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4">
      {heroes.map((hero, index) => (
        <div key={`hero-${hero.id}-${index}`} className="masonry-item break-inside-avoid mb-4 transform transition-all duration-500 animate-fade-in">
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
