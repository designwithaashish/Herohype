
import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HeroGallery from "../gallery/HeroGallery";
import Filters from "./Filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HerohypeLandingPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Popular");
  const [activeView, setActiveView] = useState("gallery");

  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <div className="flex justify-center mt-6">
        <Tabs 
          value={activeView} 
          onValueChange={setActiveView} 
          className="w-full max-w-3xl mx-auto px-4"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="curated">Curated</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="w-full">
            <Filters 
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <div className="w-full">
              <HeroGallery 
                activeFilters={activeFilters}
                sortOption={sortOption}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="curated" className="w-full">
            <div className="flex justify-between items-center mb-6 px-6 lg:px-20">
              <h2 className="text-2xl font-bold">Curated Collections</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-20">
              {curatedCollections.map((collection) => (
                <div 
                  key={collection.id}
                  className="bg-gray-100 p-6 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setActiveView("gallery");
                    setActiveFilters(collection.categories);
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {collection.categories.map(category => (
                      <span key={category} className="px-3 py-1 bg-white rounded-full text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Curated collections data
const curatedCollections = [
  {
    id: "dark-mode",
    title: "Dark Mode Designs",
    description: "Sleek and modern hero sections with dark themes",
    categories: ["Dark"]
  },
  {
    id: "minimalist",
    title: "Minimalist Heroes",
    description: "Clean designs that focus on typography and white space",
    categories: ["Minimal", "Light", "Typography"]
  },
  {
    id: "gradient-collection",
    title: "Gradient Magic",
    description: "Beautiful hero sections with gradient backgrounds",
    categories: ["Gradient"]
  },
  {
    id: "3d-collection",
    title: "3D Elements",
    description: "Hero sections with stunning 3D elements",
    categories: ["3D"]
  },
  {
    id: "animated-heroes",
    title: "Animated Heroes",
    description: "Engage visitors with animated hero sections",
    categories: ["Animated"]
  },
  {
    id: "bento-style",
    title: "Bento Grid Layouts",
    description: "Modern, Japanese-inspired bento grid hero sections",
    categories: ["Bento"]
  }
];

export default HerohypeLandingPage;
