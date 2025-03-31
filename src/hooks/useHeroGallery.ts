
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import { filterHeroes, sortHeroes } from "@/utils/galleryUtils";

export const useHeroGallery = (
  initialHeroes: HeroCardProps[],
  activeFilters: string[],
  sortOption: string
) => {
  const [heroes, setHeroes] = useState<HeroCardProps[]>([]);
  const [visibleHeroes, setVisibleHeroes] = useState<HeroCardProps[]>([]);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Load heroes from CMS (approved submissions) and sync with initialHeroes
  useEffect(() => {
    const syncWithCMS = () => {
      // Get approved submissions from CMS
      const approvedSubmissions = localStorage.getItem("approvedSubmissions");
      const cmsItems = approvedSubmissions ? JSON.parse(approvedSubmissions) : [];
      
      if (Array.isArray(cmsItems) && cmsItems.length > 0) {
        console.log("Syncing gallery with CMS items:", cmsItems.length);
        
        // Create demo items if no CMS items exist
        if (cmsItems.length === 0) {
          const demoItems = [
            {
              id: "demo-1",
              imageUrl: "/placeholder.svg",
              twitterUsername: "demo_user",
              categories: ["Dark", "Minimal"],
              likes: 5,
              saves: 3,
              status: "approved",
              submissionDate: new Date().toISOString()
            }
          ];
          localStorage.setItem("approvedSubmissions", JSON.stringify(demoItems));
          setHeroes(demoItems);
        } else {
          // Set heroes from CMS items
          setHeroes(cmsItems);
        }
      } else {
        // If no CMS items, create a demo item for testing
        const demoItems = [
          {
            id: "demo-1",
            imageUrl: "/placeholder.svg",
            twitterUsername: "demo_user",
            categories: ["Dark", "Minimal"],
            likes: 5,
            saves: 3,
            status: "approved",
            submissionDate: new Date().toISOString()
          }
        ];
        localStorage.setItem("approvedSubmissions", JSON.stringify(demoItems));
        setHeroes(demoItems);
        console.log("No CMS items found, created demo item for testing");
      }
    };
    
    syncWithCMS();
  }, [initialHeroes]); // Keep the dependency on initialHeroes to trigger on component mount
  
  // Apply filters to heroes
  const filteredHeroes = filterHeroes(heroes, activeFilters);
  
  // Sort heroes whenever the sort option or filters change
  useEffect(() => {
    const sortedHeroes = sortHeroes(filteredHeroes, sortOption);
    console.log("Sorted heroes by", sortOption, ":", sortedHeroes.length, sortedHeroes);
    const initialItems = sortedHeroes.slice(0, 12);
    setVisibleHeroes(initialItems);
  }, [sortOption, filteredHeroes]);
  
  // Handle infinite scroll loading
  useEffect(() => {
    if (inView && visibleHeroes.length < filteredHeroes.length) {
      const nextItems = filteredHeroes.slice(
        visibleHeroes.length, 
        visibleHeroes.length + 8
      );
      
      setTimeout(() => {
        setVisibleHeroes(prev => [...prev, ...nextItems]);
      }, 300);
    }
  }, [inView, filteredHeroes, visibleHeroes]);
  
  return {
    filteredHeroes,
    visibleHeroes,
    loadMoreRef,
    hasMore: visibleHeroes.length < filteredHeroes.length
  };
};

export default useHeroGallery;
