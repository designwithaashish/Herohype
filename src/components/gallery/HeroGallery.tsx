
import React, { useState } from "react";
import HeroCard, { HeroCardProps } from "./HeroCard";
import { Button } from "@/components/ui/button";

// Mock data with 40 hero section examples
const mockHeroes: HeroCardProps[] = [
  {
    id: "1",
    imageUrl: "https://cdn.dribbble.com/userupload/10553494/file/original-05476b8b9bf95eab0b88dc17e3a2b5bf.png",
    twitterUsername: "designermark",
    categories: ["Dark", "Gradient", "Animated"],
  },
  {
    id: "2",
    imageUrl: "https://cdn.dribbble.com/userupload/13039452/file/original-7c88aec1b6d26fbae02c9eda7d7b4678.png",
    twitterUsername: "webdev_sarah",
    categories: ["Light", "Minimal", "Typography"],
  },
  {
    id: "3",
    imageUrl: "https://cdn.dribbble.com/userupload/13171911/file/original-87ed86107e9e3055561e0c2ca37fa2c4.png",
    twitterUsername: "creative_jake",
    categories: ["3D", "Bento"],
  },
  {
    id: "4",
    imageUrl: "https://cdn.dribbble.com/userupload/13140978/file/original-2b6e19aa1fb6d04d3c8d46fd7fff3e9d.png",
    twitterUsername: "ui_master",
    categories: ["Light", "Minimal"],
  },
  {
    id: "5",
    imageUrl: "https://cdn.dribbble.com/userupload/12933882/file/original-0b4f736dbcac6ca4b44e0bc93e7248a3.jpg",
    twitterUsername: "frontend_dev",
    categories: ["Dark", "Typography"],
  },
  {
    id: "6",
    imageUrl: "https://cdn.dribbble.com/userupload/13073606/file/original-6caba3da01f6fb60f1b4b71814b2aaca.png",
    twitterUsername: "designguru",
    categories: ["Gradient", "3D"],
  },
  {
    id: "7",
    imageUrl: "https://cdn.dribbble.com/userupload/13081203/file/original-8d28cba19a1fefe35bbe8a8ca2986a7a.png",
    twitterUsername: "pixel_perfect",
    categories: ["Light", "Minimal"],
  },
  {
    id: "8",
    imageUrl: "https://cdn.dribbble.com/userupload/13087683/file/original-15b0c20aa97c5f3aedafb8daf8e66698.jpg",
    twitterUsername: "ui_unicorn",
    categories: ["Dark", "Gradient"],
  },
  {
    id: "9",
    imageUrl: "https://cdn.dribbble.com/userupload/13105583/file/original-0c58ec34e6fdccd63e1476dc2a5d7a00.png",
    twitterUsername: "websmith",
    categories: ["3D", "Typography"],
  },
  {
    id: "10",
    imageUrl: "https://cdn.dribbble.com/userupload/13086800/file/original-6f6ea42c76fb61a67e7ce8f2c9ae8f45.png",
    twitterUsername: "digital_nomad",
    categories: ["Bento", "Light"],
  },
  {
    id: "11",
    imageUrl: "https://cdn.dribbble.com/userupload/12754303/file/original-4a98eb34b5a45eaa6faa9955e1ac8f1e.png",
    twitterUsername: "uidesigner_pro",
    categories: ["Dark", "Minimal"],
  },
  {
    id: "12",
    imageUrl: "https://cdn.dribbble.com/userupload/12848631/file/original-0b25bb1fa058254a9d0b39af5d9da5ef.jpg",
    twitterUsername: "creative_coder",
    categories: ["Gradient", "Typography"],
  },
  {
    id: "13",
    imageUrl: "https://cdn.dribbble.com/userupload/12821764/file/original-bca6c6d6950c5df2fb6e1e8f5bfed016.png",
    twitterUsername: "design_ninja",
    categories: ["Light", "3D"],
  },
  {
    id: "14",
    imageUrl: "https://cdn.dribbble.com/userupload/12748873/file/original-ead566e4f2af2fa9a5a52662567492de.png",
    twitterUsername: "web_artist",
    categories: ["Bento", "Dark"],
  },
  {
    id: "15",
    imageUrl: "https://cdn.dribbble.com/userupload/12746069/file/original-9afdc3e0b36dccf9c7e48f14ade90a41.png",
    twitterUsername: "ux_explorer",
    categories: ["Minimal", "Typography"],
  },
  {
    id: "16",
    imageUrl: "https://cdn.dribbble.com/userupload/12706289/file/original-21a6b03b6c1a31b83ab6ca2ced9bdd5a.png",
    twitterUsername: "interface_guru",
    categories: ["Gradient", "Light"],
  },
  {
    id: "17",
    imageUrl: "https://cdn.dribbble.com/userupload/12677756/file/original-2ef69fe23ba8b5aa34bdd02f8fcca692.jpg",
    twitterUsername: "product_designer",
    categories: ["Dark", "3D"],
  },
  {
    id: "18",
    imageUrl: "https://cdn.dribbble.com/userupload/12650254/file/original-c8fd61b0d15a1ed7c41062a5c05acb6c.png",
    twitterUsername: "webflow_expert",
    categories: ["Bento", "Typography"],
  },
  {
    id: "19",
    imageUrl: "https://cdn.dribbble.com/userupload/12537649/file/original-71e7c7bc22d53e2244db82c8f77d9b52.png",
    twitterUsername: "frontend_ninja",
    categories: ["Light", "Minimal"],
  },
  {
    id: "20",
    imageUrl: "https://cdn.dribbble.com/userupload/12493051/file/original-2c994ada4c29c6968fcf994137bcb6eb.png",
    twitterUsername: "react_dev",
    categories: ["Gradient", "Dark"],
  },
  {
    id: "21",
    imageUrl: "https://cdn.dribbble.com/userupload/12451617/file/original-a78a595110bc878d18e49c2cdeedf7c9.jpg",
    twitterUsername: "figma_master",
    categories: ["3D", "Light"],
  },
  {
    id: "22",
    imageUrl: "https://cdn.dribbble.com/userupload/12371003/file/original-eb2db69bd4a4ef4a2148bb977c203af5.png",
    twitterUsername: "ui_engineer",
    categories: ["Bento", "Typography"],
  },
  {
    id: "23",
    imageUrl: "https://cdn.dribbble.com/userupload/12360152/file/original-f77df3cc77c2b5a7cd1bea55e4593e6e.png",
    twitterUsername: "design_system",
    categories: ["Minimal", "Dark"],
  },
  {
    id: "24",
    imageUrl: "https://cdn.dribbble.com/userupload/12219442/file/original-95ac2ce0c9b51fbe89d318e00e85e34e.png",
    twitterUsername: "css_wizard",
    categories: ["Gradient", "Typography"],
  },
  {
    id: "25",
    imageUrl: "https://cdn.dribbble.com/userupload/12098598/file/original-0b7f2ce9e07b9cf16c2cdd56329af26d.jpg",
    twitterUsername: "ui_creator",
    categories: ["Light", "3D"],
  },
  {
    id: "26",
    imageUrl: "https://cdn.dribbble.com/userupload/12090663/file/original-95c8f857e05bfb12f90dca15e72a0e0c.png",
    twitterUsername: "motion_designer",
    categories: ["Bento", "Dark"],
  },
  {
    id: "27",
    imageUrl: "https://cdn.dribbble.com/userupload/12066343/file/original-b9d3d1baede9a0ed9c2a04dfefc80e24.jpg",
    twitterUsername: "webdesign_pro",
    categories: ["Minimal", "Typography"],
  },
  {
    id: "28",
    imageUrl: "https://cdn.dribbble.com/userupload/11956633/file/original-0d86f47f02e5a3ecc1753f1da2f0b9a3.png",
    twitterUsername: "ux_builder",
    categories: ["Gradient", "Light"],
  },
  {
    id: "29",
    imageUrl: "https://cdn.dribbble.com/userupload/11923956/file/original-839db7f55f9ea0cca7298a8cf4ba4d7c.jpg",
    twitterUsername: "tailwind_master",
    categories: ["Dark", "3D"],
  },
  {
    id: "30",
    imageUrl: "https://cdn.dribbble.com/userupload/11824559/file/original-26a98f1a2cc1ab2a371d2269da02a1db.png",
    twitterUsername: "framer_motion",
    categories: ["Bento", "Typography"],
  },
  {
    id: "31",
    imageUrl: "https://cdn.dribbble.com/userupload/11806580/file/original-67c40c1c79e3a8dda5e6fa93f9f2a0f5.jpg",
    twitterUsername: "next_js_dev",
    categories: ["Light", "Minimal"],
  },
  {
    id: "32",
    imageUrl: "https://cdn.dribbble.com/userupload/11790850/file/original-0fc7f0aa02c47e8ff51ec5d0d12e47a8.png",
    twitterUsername: "ui_craftsman",
    categories: ["Gradient", "Dark"],
  },
  {
    id: "33",
    imageUrl: "https://cdn.dribbble.com/userupload/11733433/file/original-aeb93f09d57dd7fcef08e7346c236162.png",
    twitterUsername: "gsap_expert",
    categories: ["3D", "Light"],
  },
  {
    id: "34",
    imageUrl: "https://cdn.dribbble.com/userupload/11717302/file/original-e14a62e5e00d0c4c8a5c35f1cf8d9b32.jpg",
    twitterUsername: "svelte_dev",
    categories: ["Bento", "Typography"],
  },
  {
    id: "35",
    imageUrl: "https://cdn.dribbble.com/userupload/11704246/file/original-8b61f9fca2178f3f2f0a93a5e8c03e80.jpg",
    twitterUsername: "vue_engineer",
    categories: ["Minimal", "Dark"],
  },
  {
    id: "36",
    imageUrl: "https://cdn.dribbble.com/userupload/11704247/file/original-ab2d90cda7d51fc2fd53cbc7b7fd0c0e.jpg",
    twitterUsername: "three_js_dev",
    categories: ["Gradient", "Typography"],
  },
  {
    id: "37",
    imageUrl: "https://cdn.dribbble.com/userupload/11690304/file/original-ffba42aaa53aca4fd61ac15ec8ae606b.png",
    twitterUsername: "webgl_master",
    categories: ["Light", "3D"],
  },
  {
    id: "38",
    imageUrl: "https://cdn.dribbble.com/userupload/11676026/file/original-9c9e40afec9cce4be27e9d50c7a4f9a9.jpg",
    twitterUsername: "react_native",
    categories: ["Bento", "Dark"],
  },
  {
    id: "39",
    imageUrl: "https://cdn.dribbble.com/userupload/11607780/file/original-e93e6cf0c2f0cb75e1aa6c0fdb30a7f9.png",
    twitterUsername: "flutter_dev",
    categories: ["Minimal", "Typography"],
  },
  {
    id: "40",
    imageUrl: "https://cdn.dribbble.com/userupload/11578202/file/original-cf3a3a416ebcbfe0c12e0524da85c5e7.png",
    twitterUsername: "react_designer",
    categories: ["Gradient", "Light"],
  },
];

// Filter categories
const categories = [
  "All", "Dark", "Light", "Gradient", "3D", "Bento", "Minimal", "Typography"
];

interface HeroGalleryProps {
  initialHeroes?: HeroCardProps[];
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ initialHeroes = mockHeroes }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [heroes] = useState<HeroCardProps[]>(initialHeroes);
  
  const toggleFilter = (category: string) => {
    if (category === "All") {
      setActiveFilters([]);
      return;
    }
    
    setActiveFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const filteredHeroes = activeFilters.length > 0
    ? heroes.filter(hero => 
        activeFilters.every(filter => hero.categories.includes(filter))
      )
    : heroes;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          onClick={() => setActiveFilters([])}
          variant={activeFilters.length === 0 ? "default" : "outline"}
          className="rounded-full"
        >
          All
        </Button>
        
        {categories.slice(1).map((category) => (
          <Button
            key={category}
            onClick={() => toggleFilter(category)}
            variant={activeFilters.includes(category) ? "default" : "outline"}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max items-start">
        {filteredHeroes.map(hero => (
          <HeroCard key={hero.id} {...hero} />
        ))}
      </div>
      
      {filteredHeroes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg">No hero sections match your selected filters</p>
          <Button 
            variant="link" 
            onClick={() => setActiveFilters([])}
            className="mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeroGallery;
