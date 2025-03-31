
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import { filterHeroes, sortHeroes } from "@/utils/galleryUtils";

export const useHeroGallery = (
  initialHeroes: HeroCardProps[],
  activeFilters: string[],
  sortOption: string
) => {
  const [heroes, setHeroes] = useState<HeroCardProps[]>(initialHeroes);
  const [visibleHeroes, setVisibleHeroes] = useState<HeroCardProps[]>([]);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Load heroes from localStorage when component mounts or initialHeroes changes
  useEffect(() => {
    const loadApprovedSubmissions = () => {
      const approvedSubmissions = localStorage.getItem("approvedSubmissions");
      if (approvedSubmissions) {
        try {
          const parsedSubmissions = JSON.parse(approvedSubmissions);
          if (Array.isArray(parsedSubmissions) && parsedSubmissions.length > 0) {
            // Combine with initial heroes but avoid duplicates by id
            const initialHeroIds = new Set(initialHeroes.map(hero => hero.id));
            const uniqueSubmissions = parsedSubmissions.filter(
              (submission: HeroCardProps) => !initialHeroIds.has(submission.id)
            );
            
            // Ensure all submissions have the required properties
            const validSubmissions = uniqueSubmissions.map((submission: any) => ({
              ...submission,
              likes: submission.likes || 0,
              saves: submission.saves || 0,
              categories: submission.categories || [],
              status: submission.status || "approved",
              submissionDate: submission.submissionDate || new Date().toISOString()
            }));
            
            setHeroes([...validSubmissions, ...initialHeroes]);
            console.log("Loaded heroes from localStorage:", validSubmissions.length, validSubmissions);
          }
        } catch (error) {
          console.error("Error loading approved submissions:", error);
        }
      }
    };
    
    loadApprovedSubmissions();
  }, [initialHeroes]);
  
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
