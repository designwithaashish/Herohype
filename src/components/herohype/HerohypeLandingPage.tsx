
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
    </div>
  );
};

export default HerohypeLandingPage;
