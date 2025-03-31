
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroImageSlider from "./HeroImageSlider";

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemCount, setItemCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="flex min-h-[520px] w-full flex-col items-center text-center justify-center mt-5 pt-[61px] pb-5 px-5 md:px-10 lg:px-20">
      {/* Top stat banner */}
      <div className="bg-white border flex items-center gap-2 text-xs text-black font-medium uppercase tracking-[0.5px] leading-[1.2] justify-center px-6 py-2 rounded-[60px] border-[rgba(0,0,0,0.15)] border-solid animate-fade-in">
        <span className="text-black">*</span>
        <div className="self-stretch my-auto font-satoshi">{itemCount}+ HERO SECTIONS CURATED</div>
        <span className="text-black">*</span>
      </div>

      {/* Main headline with serif font */}
      <div className="flex w-full max-w-5xl flex-col items-center mt-[30px]">
        <h1 className="w-full text-black leading-[1.2] font-instrument-serif">
          {/* First line */}
          <div className="text-[54px] md:text-[70px] max-md:text-[38px] animate-[fade-in_0.5s_ease_0.2s_both]">
            Discover Trendy &
          </div>
          
          {/* Second line with image and text */}
          <div className="flex items-center justify-center gap-4 mt-5 animate-[fade-in_0.5s_ease_0.4s_both]">
            {/* Perfect text without border */}
            <div className="p-3">
              <span className="text-[54px] md:text-[70px] max-md:text-[38px]">Perfect</span>
            </div>
            
            {/* Image slider */}
            <HeroImageSlider />
            
            {/* Hero Section with dashed border */}
            <div className="border-2 border-dashed border-black p-3 rounded-md">
              <span className="text-[54px] md:text-[70px] max-md:text-[38px]">Hero Section</span>
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

      {/* Search bar - smaller size */}
      <div className="self-stretch w-full max-w-2xl mx-auto leading-[1.2] mt-[40px] animate-[fade-in_0.5s_ease_0.8s_both]">
        <form
          onSubmit={handleSearch}
          className="bg-[rgba(239,239,239,1)] flex w-full items-center justify-between pr-3 pl-8 py-2 rounded-[60px] max-md:pl-4"
        >
          <input
            type="text"
            placeholder="hero section with purple gradient..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent text-[rgba(93,93,93,1)] text-base font-medium outline-none w-full font-satoshi"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[rgba(27,27,27,1)] text-white shadow-[6px_6px_8px_rgba(0,0,0,0.2)] px-6 py-2 rounded-[38px] max-md:px-4 hover:bg-[rgba(40,40,40,1)] transition-colors font-satoshi text-[18px]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
