
import React from "react";
import { HeroCardProps } from "./HeroCard";
import GalleryGrid from "./GalleryGrid";
import EmptyGalleryState from "./EmptyGalleryState";
import LoadMoreIndicator from "./LoadMoreIndicator";
import useHeroGallery from "@/hooks/useHeroGallery";
import { mockHeroes } from "@/data/mockHeroes";

interface HeroGalleryProps {
  initialHeroes?: HeroCardProps[];
  activeFilters?: string[];
  sortOption?: string;
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ 
  initialHeroes = mockHeroes,
  activeFilters = [],
  sortOption = "Popular"
}) => {
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
  
  return (
    <>
      <div className="w-full px-0 lg:px-0 max-w-none">
        {visibleHeroes.length > 0 && <GalleryGrid heroes={visibleHeroes} />}
        
        {filteredHeroes.length === 0 && (
          <EmptyGalleryState onClearFilters={handleClearFilters} />
        )}
        
        {hasMore && <LoadMoreIndicator innerRef={loadMoreRef} />}
      </div>
    </>
  );
};

export default HeroGallery;
