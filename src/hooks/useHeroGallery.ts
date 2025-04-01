
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import { filterHeroes, sortHeroes } from "@/utils/galleryUtils";

// Function to generate random avatars
export const generateRandomAvatar = () => {
  const avatarUrls = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&h=150",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&h=150"
  ];
  
  const randomIndex = Math.floor(Math.random() * avatarUrls.length);
  return avatarUrls[randomIndex];
};

// Function to generate random avatar background colors
export const generateRandomAvatarColor = () => {
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500",
    "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
    "bg-orange-500", "bg-cyan-500", "bg-emerald-500", "bg-fuchsia-500"
  ];
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

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
        
        // Process CMS items to ensure proper typing
        const processedItems: HeroCardProps[] = cmsItems.map((item: any) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          twitterUsername: item.twitterUsername,
          categories: item.categories || [],
          likes: item.likes || 0,
          saves: item.saves || 0,
          isCurated: item.isCurated || false,
          status: (item.status === "approved" || item.status === "pending" || item.status === "rejected") 
            ? item.status as "approved" | "pending" | "rejected"
            : "approved" as "approved" | "pending" | "rejected",
          submissionDate: item.submissionDate || new Date().toISOString()
        }));
        
        // Set heroes with properly typed items
        setHeroes(processedItems);
      } else {
        // If no CMS items, display nothing
        setHeroes([]);
        console.log("No CMS items found, gallery will be empty");
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
