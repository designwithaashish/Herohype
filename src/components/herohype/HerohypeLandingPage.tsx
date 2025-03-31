
import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HeroGallery from "../gallery/HeroGallery";
import Filters from "./Filters";

const HerohypeLandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <Filters />
      <div className="w-full px-4 py-8">
        <HeroGallery />
      </div>
    </div>
  );
};

export default HerohypeLandingPage;
