
import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HeroGallery from "../gallery/HeroGallery";
import Filters from "./Filters";

const HerohypeLandingPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Popular");

  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-center w-full">
          <Filters 
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
        <div className="w-full mt-6">
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
