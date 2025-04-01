
import React, { useEffect, useRef } from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface GalleryGridProps {
  heroes: HeroCardProps[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ heroes }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    
    const handleImagesLoaded = () => {
      const imageElements = grid.querySelectorAll('img');
      let loadedImages = 0;
      
      const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === imageElements.length) {
          // All images are loaded
          grid.classList.add('opacity-100');
          grid.classList.remove('opacity-0');
        }
      };
      
      imageElements.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.complete) {
          imageLoaded();
        } else {
          imgElement.addEventListener('load', imageLoaded);
        }
      });
      
      return () => {
        imageElements.forEach((img) => {
          const imgElement = img as HTMLImageElement;
          imgElement.removeEventListener('load', imageLoaded);
        });
      };
    };
    
    handleImagesLoaded();
  }, [heroes]);
  
  return (
    <div 
      ref={gridRef} 
      className={`masonry-grid ${isMobile ? 'columns-1 gap-2' : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2'} w-full opacity-0 transition-opacity duration-500`}
    >
      {heroes.map(hero => (
        <div 
          key={`hero-${hero.id}`} 
          className="masonry-item break-inside-avoid mb-2"
        >
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
