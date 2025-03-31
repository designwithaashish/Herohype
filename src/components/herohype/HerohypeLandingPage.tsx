
import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Filters from "./Filters";
import HeroGallery from "../gallery/HeroGallery";

const HerohypeLandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <Filters />
      <div className="container mx-auto py-8 px-4">
        <HeroGallery />
      </div>
    </div>
  );
};

export default HerohypeLandingPage;
