
import React, { useEffect, useState } from "react";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CollectionsTabProps {
  savedHeroes: any[];
}

const CollectionsTab: React.FC<CollectionsTabProps> = ({ savedHeroes }) => {
  const navigate = useNavigate();
  const [heroCards, setHeroCards] = useState<HeroCardProps[]>([]);
  
  useEffect(() => {
    // Map the saved heroes
    if (savedHeroes && savedHeroes.length > 0) {
      const savedHeroCards = savedHeroes.map((hero: any) => ({
        id: hero.id,
        imageUrl: hero.imageUrl,
        twitterUsername: hero.twitterUsername,
        categories: hero.categories || [],
        likes: hero.likes || 0,
        saves: hero.saves || 0,
        status: "approved" as "approved" | "pending" | "rejected",
        submissionDate: hero.submissionDate || hero.createdAt
      }));
      
      setHeroCards(savedHeroCards);
    } else {
      setHeroCards([]);
    }
  }, [savedHeroes]);
  
  if (heroCards.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No saved items</h3>
        <p className="text-gray-500 mb-6">
          You haven't saved any hero sections to your collection yet.
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="hover:bg-gray-100"
        >
          Browse the gallery
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-6">Saved to Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {heroCards.map((hero) => (
          <div key={hero.id} className="overflow-hidden rounded-[30px] border border-gray-200 hover:shadow-md group">
            <div className="overflow-hidden">
              <img
                src={hero.imageUrl}
                alt="Saved hero section"
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsTab;
