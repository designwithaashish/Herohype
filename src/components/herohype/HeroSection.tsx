
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="flex min-h-[520px] w-full flex-col items-center text-center justify-center mt-5 pt-[61px] pb-5 px-[140px] max-md:max-w-full max-md:px-5">
      <div className="bg-white border flex items-center gap-2 text-sm text-black font-medium uppercase tracking-[-0.28px] leading-[1.2] justify-center px-4 py-2 rounded-[60px] border-[rgba(0,0,0,0.3)] border-solid">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ca9cd70178b9ef63a5165be05724b3eb93b407cb?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-2.5 self-stretch shrink-0 my-auto"
          alt="Left arrow"
        />
        <div className="self-stretch my-auto font-satoshi">100+ Hero Sections Curated</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/10791a020ddba0a8fbf526c0f7a49b4a7fcc2b6a?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-2.5 self-stretch shrink-0 my-auto"
          alt="Right arrow"
        />
      </div>

      <div className="flex w-[761px] max-w-full flex-col items-center mt-[30px]">
        <h1 className="w-[645px] max-w-full text-black leading-[1.2] font-['Instrument_Sans'] italic">
          <div className="flex w-full items-center gap-5 text-[74px] justify-center flex-wrap max-md:max-w-full max-md:text-[40px]">
            <div className="self-stretch my-auto max-md:text-[40px]">
              Discover
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/4dcc644b12d8b5262921e7c60355f5cb0e5c7a62?placeholderIfAbsent=true"
              className="aspect-[1.4] object-contain w-28 self-stretch shrink-0 my-auto rounded-[20px]"
              alt="Decorative element"
            />
          </div>
          <div className="flex w-full items-center gap-5 justify-center flex-wrap mt-2.5 max-md:max-w-full">
            <div className="text-[74px] self-stretch my-auto max-md:text-[40px]">
              The Perfect Hero Section
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

      <div className="self-stretch w-full leading-[1.2] mt-[30px] px-40 max-md:max-w-full max-md:px-5">
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
