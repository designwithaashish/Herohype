
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import { filterHeroes, sortHeroes } from "@/utils/galleryUtils";
import { supabase } from "@/integrations/supabase/client";

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
  const [loading, setLoading] = useState(true);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Load heroes from Supabase
  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true);
      
      try {
        // Get all approved submissions from Supabase
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('status', 'approved');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Process submissions to match HeroCardProps structure
          const heroItems: HeroCardProps[] = data.map(item => ({
            id: item.id,
            imageUrl: item.image_url,
            twitterUsername: item.twitter_username,
            categories: item.categories || [],
            likes: 0, // We'll fetch actual likes separately
            saves: 0, // We'll fetch actual saves separately
            isCurated: item.is_curated || false,
            status: item.status as "approved" | "pending" | "rejected",
            submissionDate: item.created_at || new Date().toISOString()
          }));
          
          setHeroes(heroItems);
        }
      } catch (error) {
        console.error("Error fetching hero submissions:", error);
        setHeroes([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHeroes();
  }, []);
  
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
    hasMore: visibleHeroes.length < filteredHeroes.length,
    loading
  };
};

export default useHeroGallery;
