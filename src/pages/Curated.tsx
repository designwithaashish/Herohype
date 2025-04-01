
import React, { useEffect, useState } from "react";
import Header from "@/components/herohype/Header";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";

const Curated: React.FC = () => {
  const [curatedItems, setCuratedItems] = useState<HeroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load curated items from localStorage (marked with isCurated: true by admin)
    const loadCuratedItems = () => {
      const approvedSubmissions = localStorage.getItem("approvedSubmissions");
      if (approvedSubmissions) {
        const items = JSON.parse(approvedSubmissions);
        // Filter for curated items only
        const curatedHeroes = items.filter((item: any) => item.isCurated === true);
        
        if (curatedHeroes.length > 0) {
          setCuratedItems(curatedHeroes);
        } else {
          // If no curated items found, load sample curated items
          const sampleCuratedItems: HeroCardProps[] = [
            {
              id: "curated-item-1",
              imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
              twitterUsername: "curateddesign",
              categories: ["Minimal", "Dark"],
              likes: 78,
              saves: 42,
              isCurated: true,
            },
            {
              id: "curated-item-2",
              imageUrl: "/lovable-uploads/22e3d4c1-cb57-47eb-a8b8-fb1a672b939f.png",
              twitterUsername: "heroinspire",
              categories: ["Typography", "Gradient"],
              likes: 65,
              saves: 37,
              isCurated: true,
            }
          ];
          setCuratedItems(sampleCuratedItems);
        }
      } else {
        // No approved submissions, load sample data
        const sampleCuratedItems: HeroCardProps[] = [
          {
            id: "curated-item-1",
            imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
            twitterUsername: "curateddesign",
            categories: ["Minimal", "Dark"],
            likes: 78,
            saves: 42,
            isCurated: true,
          },
          {
            id: "curated-item-2",
            imageUrl: "/lovable-uploads/22e3d4c1-cb57-47eb-a8b8-fb1a672b939f.png",
            twitterUsername: "heroinspire",
            categories: ["Typography", "Gradient"],
            likes: 65,
            saves: 37,
            isCurated: true,
          }
        ];
        setCuratedItems(sampleCuratedItems);
      }
      setLoading(false);
    };
    
    loadCuratedItems();
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold mb-2">Curated Collection</h1>
          <p className="text-gray-600">
            Hand-picked gallery of exceptional hero sections by our expert team
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <p>Loading curated selections...</p>
          </div>
        ) : (
          <>
            {curatedItems.length > 0 ? (
              <GalleryGrid heroes={curatedItems} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No curated items yet</h2>
                <p className="text-gray-600 mb-6">
                  Check back soon for our hand-picked collection of exceptional hero sections.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Curated;
