import React, { useState } from "react";

type FilterCategory =
  | "All"
  | "Dark"
  | "Light"
  | "Crypto"
  | "Miniminal"
  | "Animated"
  | "Illustrated"
  | "3D"
  | "Gradient"
  | "Bentro";

const Filters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [isPopularOpen, setIsPopularOpen] = useState(false);

  const handleFilterClick = (filter: FilterCategory) => {
    setActiveFilter(filter);
  };

  const togglePopular = () => {
    setIsPopularOpen(!isPopularOpen);
  };

  const categories: FilterCategory[] = [
    "All",
    "Dark",
    "Light",
    "Crypto",
    "Miniminal",
    "Animated",
    "Illustrated",
    "3D",
    "Gradient",
    "Bentro",
  ];

  return (
    <div className="bg-white flex min-h-[88px] w-full items-center gap-[40px_100px] justify-between flex-wrap mt-5 px-20 py-5 max-md:max-w-full max-md:px-5">
      <div className="relative">
        <button
          onClick={togglePopular}
          className="bg-[rgba(239,239,239,1)] self-stretch flex items-center gap-1 justify-center my-auto px-8 py-3 rounded-[32px] max-md:px-5 hover:bg-[rgba(229,229,229,1)] transition-colors"
        >
          <div className="text-black text-xl font-normal leading-[1.2] text-center self-stretch my-auto">
            Popular
          </div>
          <div className="self-stretch w-5 my-auto pt-2.5 pb-2 px-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ab3789780c6fa063ffec0c5b77c7078251a13a5c?placeholderIfAbsent=true"
              className="aspect-[2] object-contain w-3"
              alt="Dropdown arrow"
            />
          </div>
        </button>

        {isPopularOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-10">
            <ul className="text-black">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Most Popular
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Newest
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Trending
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="self-stretch flex min-w-60 items-center gap-8 text-[15px] text-[rgba(31,31,31,1)] font-medium whitespace-nowrap justify-center flex-wrap my-auto max-md:max-w-full">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`self-stretch ${
              activeFilter === category
                ? "bg-[rgba(239,239,239,1)] text-base text-black font-bold"
                : "hover:text-black transition-colors"
            } text-center leading-[1.2] my-auto px-4 py-2 rounded-[32px]`}
          >
            {category}
          </button>
        ))}
      </div>

      <button className="self-stretch flex flex-col text-base text-white font-normal text-center leading-[1.2] justify-center my-auto">
        <div className="self-stretch bg-[rgba(27,27,27,1)] shadow-[6px_6px_8px_rgba(0,0,0,0.2)] gap-2.5 px-5 py-3 rounded-lg hover:bg-[rgba(40,40,40,1)] transition-colors">
          Submit Yours
        </div>
      </button>
    </div>
  );
};

export default Filters;
