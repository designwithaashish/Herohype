
import React from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CollectionsTabProps {
  savedHeroes: any[];
}

const CollectionsTab: React.FC<CollectionsTabProps> = ({ savedHeroes }) => {
  const navigate = useNavigate();
  
  if (savedHeroes.length === 0) {
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

  // Transform the saved heroes to match the HeroCardProps interface
  const heroCards: HeroCardProps[] = savedHeroes.map(hero => ({
    id: hero.id,
    imageUrl: hero.imageUrl,
    twitterUsername: hero.twitterUsername,
    categories: hero.categories || [],
    likes: hero.likes || 0,
    saves: hero.saves || 0,
    status: "approved"
  }));

  return (
    <div>
      <h2 className="text-lg font-medium mb-6">Saved to Collection</h2>
      <GalleryGrid heroes={heroCards} />
    </div>
  );
};

export default CollectionsTab;
