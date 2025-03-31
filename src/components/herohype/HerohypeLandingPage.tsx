import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Filters from "./Filters";

const HerohypeLandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <Filters />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1c9a27ca109627531b07f63bf67d7584e234fb6a?placeholderIfAbsent=true"
        className="aspect-[1.39] object-contain w-full mt-5 max-md:max-w-full"
        alt="Hero section examples"
      />
    </div>
  );
};

export default HerohypeLandingPage;
