
import React, { useEffect, useRef } from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface GalleryGridProps {
  heroes: HeroCardProps[];
  columns?: number;
  fullWidth?: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  heroes, 
  columns = 4,
  fullWidth = false 
}) => {
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
    if (isMobile) return 'columns-1 gap-2';
    
    switch (columns) {
      case 2: return 'columns-1 sm:columns-2 gap-2';
      case 3: return 'columns-1 sm:columns-2 md:columns-3 gap-2';
      case 5: return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2';
      case 4:
      default: return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2';
    }
  };
  
  return (
    <div 
      ref={gridRef} 
      className={`${getColumnClasses()} ${fullWidth ? 'w-full' : 'w-full'} opacity-0 transition-opacity duration-500 space-y-2`}
    >
      {heroes.map(hero => (
        <div 
          key={`hero-${hero.id}`} 
          className="mb-2 break-inside-avoid-column"
        >
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
