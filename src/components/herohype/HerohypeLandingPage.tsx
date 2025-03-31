
import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HeroGallery from "../gallery/HeroGallery";
import Filters from "./Filters";
import HeadlineWithSlider from "../gallery/HeadlineWithSlider";

const HerohypeLandingPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Recent");

  return (
    <div className="bg-white">
      <Header />
      <HeadlineWithSlider />
      <div className="w-full mx-auto mt-6 px-4">
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
