
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImageSlider from "./HeroImageSlider";

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <div className="bg-white border flex items-center gap-2 text-sm text-black font-medium uppercase tracking-[-0.28px] leading-[1.2] justify-center px-4 py-2 rounded-[60px] border-[rgba(0,0,0,0.3)] border-solid">
        <span className="text-black">*</span>
        <div className="self-stretch my-auto font-satoshi">100+ HERO SECTIONS CURATED</div>
        <span className="text-black">*</span>
      </div>

      <div className="flex w-full max-w-5xl flex-col items-center mt-[30px]">
        <h1 className="w-full max-w-5xl text-black leading-[1.2] font-instrument-serif">
          <div className="flex w-full items-center gap-5 text-[64px] md:text-[74px] justify-center flex-wrap max-md:text-[48px]">
            <div className="self-stretch my-auto">
              Discover
            </div>
            <div className="self-stretch my-auto">
              Trendy
            </div>
            <div className="self-stretch my-auto">
              &
            </div>
          </div>
          <div className="flex w-full items-center gap-5 justify-center flex-wrap mt-2.5">
            <div className="border-2 border-dashed border-black p-3 rounded-md">
              <span className="text-[64px] md:text-[74px] self-stretch my-auto max-md:text-[48px]">
                Perfect
              </span>
            </div>
            <HeroImageSlider />
            <div className="border-2 border-dashed border-black p-3 rounded-md">
              <span className="text-[64px] md:text-[74px] self-stretch my-auto max-md:text-[48px]">
                Hero Sections
              </span>
            </div>
          </div>
        </h1>

        <p className="w-full text-xl text-[rgba(61,61,61,1)] leading-6 mt-5 px-[11px] rounded-[0px_0px_0px_0px] max-md:max-w-full font-satoshi">
          Explore a stunning collection of curated hero designs.
          <br />
          Filter by style, vibe, or trend. From bold gradients to sleek
          minimalism, find inspiration that fits your vision.
        </p>
      </div>

      <div className="self-stretch w-full max-w-5xl mx-auto leading-[1.2] mt-[30px]">
        <form
          onSubmit={handleSearch}
          className="bg-[rgba(239,239,239,1)] flex w-full items-center justify-between pr-3 pl-10 py-2 rounded-[60px] max-md:pl-5"
        >
          <input
            type="text"
            placeholder="hero section with purple gradient..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent text-[rgba(93,93,93,1)] text-xl font-medium outline-none w-full font-satoshi"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[rgba(27,27,27,1)] text-white shadow-[6px_6px_8px_rgba(0,0,0,0.2)] px-10 py-3 rounded-[38px] max-md:px-5 hover:bg-[rgba(40,40,40,1)] transition-colors font-satoshi text-[22px]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
