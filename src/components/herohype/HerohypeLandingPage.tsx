
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
      <div className="w-full max-w-7xl mx-auto mt-6 px-4">
        <Filters 
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
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
