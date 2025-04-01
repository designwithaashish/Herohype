
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImageSlider from "./HeroImageSlider";

const HeroSection: React.FC = () => {
  const [itemCount, setItemCount] = useState<number>(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Get the count of approved submissions in CMS
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    if (approvedSubmissions) {
      try {
        const parsedSubmissions = JSON.parse(approvedSubmissions);
        if (Array.isArray(parsedSubmissions)) {
          setItemCount(parsedSubmissions.length);
        }
      } catch (error) {
        console.error("Error parsing approved submissions:", error);
      }
    }
  }, []);

  const handleExploreClick = () => {
    // Scroll down to the gallery section
    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmitClick = () => {
    navigate("/submit");
  };

  return (
    <section className="flex min-h-[520px] w-full flex-col items-center text-center justify-center mt-5 pt-[61px] pb-5 px-5 md:px-10 lg:px-20">
      {/* Top stat banner */}
      <div className="bg-white border flex items-center gap-2 text-xs text-black font-medium uppercase tracking-[0.5px] leading-[1.2] justify-center px-6 py-2 rounded-[60px] border-[rgba(0,0,0,0.15)] border-solid animate-fade-in">
        <span className="text-black">*</span>
        <div className="self-stretch my-auto font-satoshi">{itemCount}+ HERO SECTIONS CURATED</div>
        <span className="text-black">*</span>
      </div>

      {/* Main headline with Playfair Display font */}
      <div className="flex w-full max-w-5xl flex-col items-center mt-[30px]">
        <h1 className="w-full text-black leading-[1.2] font-playfair">
          {/* First line */}
          <div className="text-[44px] md:text-[60px] max-md:text-[28px] animate-[fade-in_0.5s_ease_0.2s_both]">
            Discover Trendy &
          </div>
          
          {/* Second line with image and text */}
          <div className="flex items-center justify-center gap-4 mt-5 animate-[fade-in_0.5s_ease_0.4s_both]">
            {/* Perfect text */}
            <div className="p-3">
              <span className="text-[44px] md:text-[60px] max-md:text-[28px] italic">Perfect</span>
            </div>
            
            {/* Image slider */}
            <HeroImageSlider />
            
            {/* Hero Section text */}
            <div className="p-3">
              <span className="text-[44px] md:text-[60px] max-md:text-[28px] text-[#FF6C44]">Hero Section</span>
            </div>
          </div>
        </h1>

        {/* Subheadline */}
        <p className="w-full max-w-3xl text-lg text-[rgba(61,61,61,1)] leading-7 mt-8 mx-auto font-satoshi animate-[fade-in_0.5s_ease_0.6s_both]">
          Explore a stunning collection of curated hero designs.
          <br />
          Filter by style, vibe, or trend. From bold gradients to sleek
          minimalism, find inspiration that fits your vision.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 animate-[fade-in_0.5s_ease_0.8s_both]">
        <button
          onClick={handleExploreClick}
          className="bg-white border border-gray-300 text-black rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-shadow"
        >
          Explore
        </button>
        <button
          onClick={handleSubmitClick}
          className="bg-[#3A5A40] text-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          Submit Your Design
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="white"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
