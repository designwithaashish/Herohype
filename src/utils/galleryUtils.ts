
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
    activeFilters.every(filter => hero.categories.includes(filter))
  );
};

// Sort heroes based on sort option
export const sortHeroes = (
  heroes: HeroCardProps[],
  sortOption: string
): HeroCardProps[] => {
  const sortedHeroes = [...heroes];
  
  switch (sortOption) {
    case "Popular":
      return sortedHeroes.sort((a, b) => {
        const scoreA = (a.likes || 0) * 2 + (a.views || 0);
        const scoreB = (b.likes || 0) * 2 + (b.views || 0);
        return scoreB - scoreA;
      });
      
    case "Trending":
      return sortedHeroes.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      
    case "Recent":
      return sortedHeroes.sort((a, b) => {
        if (!a.submissionDate) return 1;
        if (!b.submissionDate) return -1;
        return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      });
      
    default:
      return sortedHeroes;
  }
};
