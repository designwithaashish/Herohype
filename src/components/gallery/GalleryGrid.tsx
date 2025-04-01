
import React, { useEffect, useRef } from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface GalleryGridProps {
  heroes: HeroCardProps[];
  columns?: number;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ heroes, columns = 4 }) => {
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
  
  // Generate column classes based on the columns prop
  const getColumnClasses = () => {
    if (isMobile) return 'grid grid-cols-1 gap-2';
    
    switch (columns) {
      case 2: return 'grid grid-cols-1 sm:grid-cols-2 gap-2';
      case 3: return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2';
      case 5: return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2';
      case 4:
      default: return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2';
    }
  };
  
  return (
    <div 
      ref={gridRef} 
      className={`${getColumnClasses()} w-full opacity-0 transition-opacity duration-500`}
    >
      {heroes.map(hero => (
        <div 
          key={`hero-${hero.id}`} 
          className="mb-2"
        >
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
