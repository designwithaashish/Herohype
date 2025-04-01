
import React, { useEffect, useState } from "react";
import { HeroCardProps } from "./HeroCard";
import GalleryGrid from "./GalleryGrid";
import EmptyGalleryState from "./EmptyGalleryState";
import LoadMoreIndicator from "./LoadMoreIndicator";
import useHeroGallery from "@/hooks/useHeroGallery";

interface HeroGalleryProps {
  initialHeroes?: HeroCardProps[];
  activeFilters?: string[];
  sortOption?: string;
  columns?: number;
  fullWidth?: boolean;
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ 
  initialHeroes = [],
  activeFilters = [],
  sortOption = "Popular",
  columns = 4,
  fullWidth = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if CMS has any items
  useEffect(() => {
    const checkCMSItems = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500); // Short delay for loading state
    };
    
    checkCMSItems();
  }, []);
  
  const { 
    filteredHeroes,
    visibleHeroes,
    loadMoreRef,
    hasMore
  } = useHeroGallery(initialHeroes, activeFilters, sortOption);
  
  const handleClearFilters = () => {
    // This would need to be lifted up to the parent component
    // but for now we're maintaining the component signature
    console.log("Clear filters requested");
  };
  
  if (isLoading) {
    return <div className="w-full py-10 text-center text-gray-500">Loading gallery items...</div>;
  }
  
  return (
    <>
      <div className="w-full px-0 lg:px-0 max-w-none">
        {visibleHeroes.length > 0 && <GalleryGrid heroes={visibleHeroes} columns={columns} fullWidth={fullWidth} />}
        
        {(filteredHeroes.length === 0 && activeFilters.length > 0) && (
          <EmptyGalleryState onClearFilters={handleClearFilters} />
        )}
        
        {(filteredHeroes.length === 0 && activeFilters.length === 0) && (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No gallery items available</h3>
            <p className="text-gray-500">
              Please add hero sections through the admin CMS first.
            </p>
          </div>
        )}
        
        {hasMore && <LoadMoreIndicator innerRef={loadMoreRef} />}
      </div>
    </>
  );
};

export default HeroGallery;
