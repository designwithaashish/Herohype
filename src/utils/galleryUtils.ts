
import { HeroCardProps } from "@/components/gallery/HeroCard";

// Filter heroes based on active filters
export const filterHeroes = (
  heroes: HeroCardProps[],
  activeFilters: string[]
): HeroCardProps[] => {
  if (activeFilters.length === 0) {
    return heroes;
  }
  
  return heroes.filter(hero => 
    activeFilters.every(filter => hero.categories?.includes(filter))
  );
};

// Sort heroes based on sort option with updated logic
export const sortHeroes = (
  heroes: HeroCardProps[],
  sortOption: string
): HeroCardProps[] => {
  const sortedHeroes = [...heroes];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  switch (sortOption) {
    case "Popular":
      // Sort by most likes + 2x saves
      return sortedHeroes.sort((a, b) => 
        ((b.likes || 0) + ((b.saves || 0) * 2)) - ((a.likes || 0) + ((a.saves || 0) * 2))
      );
      
    case "Trending":
      // Show images from last 7 days, sorted by likes + saves
      return sortedHeroes
        .filter(hero => {
          if (!hero.submissionDate) return false;
          const heroDate = new Date(hero.submissionDate);
          return heroDate >= sevenDaysAgo;
        })
        .sort((a, b) => {
          // Sort by likes + saves, with newer items getting higher priority on ties
          const aScore = (a.likes || 0) + (a.saves || 0);
          const bScore = (b.likes || 0) + (b.saves || 0);
          
          if (aScore === bScore && a.submissionDate && b.submissionDate) {
            return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
          }
          
          return bScore - aScore;
        });
      
    case "Recent":
      // Sort by submission date, newest first
      return sortedHeroes.sort((a, b) => {
        if (!a.submissionDate) return 1;
        if (!b.submissionDate) return -1;
        return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      });
      
    default:
      return sortedHeroes;
  }
};
