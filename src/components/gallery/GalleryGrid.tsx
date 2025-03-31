
import React, { useEffect, useRef } from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";

interface GalleryGridProps {
  heroes: HeroCardProps[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ heroes }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    
    const handleImagesLoaded = () => {
      const images = grid.querySelectorAll('img');
      let loadedImages = 0;
      
      const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          // All images are loaded
          grid.classList.add('opacity-100');
          grid.classList.remove('opacity-0');
        }
      };
      
      images.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.complete) {
          imageLoaded();
        } else {
          imgElement.addEventListener('load', imageLoaded);
        }
      });
      
      return () => {
        images.forEach((img) => {
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
      className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 opacity-0 transition-opacity duration-500"
    >
      {heroes.map(hero => (
        <div 
          key={`hero-${hero.id}`} 
          className="masonry-item break-inside-avoid mb-4 transform transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-md overflow-hidden"
        >
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
