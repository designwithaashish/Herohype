
import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HeroGallery from "../gallery/HeroGallery";
import Filters from "./Filters";
import { useIsMobile } from "@/hooks/use-mobile";

const HerohypeLandingPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Popular");
  const isMobile = useIsMobile();

  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-6">
        <div className="w-full">
          <Filters 
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
        <div className={`w-full mt-6 ${isMobile ? 'px-2' : 'px-4'}`}>
          <HeroGallery 
            activeFilters={activeFilters}
            sortOption={sortOption}
          />
        </div>
      </div>
    </div>
  );
};

export default HerohypeLandingPage;
