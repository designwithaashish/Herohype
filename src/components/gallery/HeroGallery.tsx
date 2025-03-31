
import React, { useState } from "react";
import HeroCard, { HeroCardProps } from "./HeroCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Mock data
const mockHeroes: HeroCardProps[] = [
  {
    id: "1",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1c9a27ca109627531b07f63bf67d7584e234fb6a",
    twitterUsername: "designermark",
    categories: ["Dark", "Gradient", "Animated"],
  },
  {
    id: "2",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/4dcc644b12d8b5262921e7c60355f5cb0e5c7a62",
    twitterUsername: "webdev_sarah",
    categories: ["Light", "Minimal", "Typography"],
  },
  {
    id: "3",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ca9cd70178b9ef63a5165be05724b3eb93b407cb",
    twitterUsername: "creative_jake",
    categories: ["3D", "Bento"],
  },
  {
    id: "4",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ab3789780c6fa063ffec0c5b77c7078251a13a5c",
    twitterUsername: "ui_master",
    categories: ["Light", "Minimal"],
  },
  {
    id: "5",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/10791a020ddba0a8fbf526c0f7a49b4a7fcc2b6a",
    twitterUsername: "frontend_dev",
    categories: ["Dark", "Typography"],
  },
  {
    id: "6",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1959439b6d7922b7efdd6200e76d1ae9326c99a2",
    twitterUsername: "designguru",
    categories: ["Gradient", "3D"],
  },
];

const categories = [
  "All", "Dark", "Light", "Gradient", "3D", "Bento", "Minimal", "Typography", "Animated"
];

interface HeroGalleryProps {
  initialHeroes?: HeroCardProps[];
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ initialHeroes = mockHeroes }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [heroes] = useState<HeroCardProps[]>(initialHeroes);
  
  const toggleFilter = (category: string) => {
    if (category === "All") {
      setActiveFilters([]);
      return;
    }
    
    setActiveFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const filteredHeroes = activeFilters.length > 0
    ? heroes.filter(hero => 
        activeFilters.every(filter => hero.categories.includes(filter))
      )
    : heroes;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          onClick={() => setActiveFilters([])}
          variant={activeFilters.length === 0 ? "default" : "outline"}
          className="rounded-full"
        >
          All
        </Button>
        
        {categories.slice(1).map((category) => (
          <Button
            key={category}
            onClick={() => toggleFilter(category)}
            variant={activeFilters.includes(category) ? "default" : "outline"}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {activeFilters.map(filter => (
              <Badge key={filter} className="flex items-center gap-1">
                {filter}
                <button
                  onClick={() => toggleFilter(filter)}
                  className="ml-1 hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => setActiveFilters([])}
            className="ml-auto text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max items-start">
        {filteredHeroes.map(hero => (
          <HeroCard key={hero.id} {...hero} />
        ))}
      </div>
      
      {filteredHeroes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg">No hero sections match your selected filters</p>
          <Button 
            variant="link" 
            onClick={() => setActiveFilters([])}
            className="mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeroGallery;
