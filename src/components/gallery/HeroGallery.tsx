import React, { useState, useEffect } from "react";
import HeroCard, { HeroCardProps } from "./HeroCard";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

// Mock data with 40 hero section examples and different image heights
const mockHeroes: HeroCardProps[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600",
    twitterUsername: "designermark",
    categories: ["Dark", "Gradient", "Animated"],
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400",
    twitterUsername: "webdev_sarah",
    categories: ["Light", "Minimal", "Typography"],
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&h=700",
    twitterUsername: "creative_jake",
    categories: ["3D", "Bento"],
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&h=500",
    twitterUsername: "ui_master",
    categories: ["Light", "Minimal"],
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&h=600",
    twitterUsername: "frontend_dev",
    categories: ["Dark", "Typography"],
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450",
    twitterUsername: "designguru",
    categories: ["Gradient", "3D"],
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&h=600",
    twitterUsername: "pixel_perfect",
    categories: ["Light", "Minimal"],
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1620121684840-edffcfc4b878?w=800&h=700",
    twitterUsername: "ui_unicorn",
    categories: ["Dark", "Gradient"],
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450",
    twitterUsername: "websmith",
    categories: ["3D", "Typography"],
  },
  {
    id: "10",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600",
    twitterUsername: "digital_nomad",
    categories: ["Bento", "Light"],
  },
  {
    id: "11",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=500",
    twitterUsername: "uidesigner_pro",
    categories: ["Dark", "Minimal"],
  },
  {
    id: "12",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600",
    twitterUsername: "creative_coder",
    categories: ["Gradient", "Typography"],
  },
  {
    id: "13",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=700",
    twitterUsername: "design_ninja",
    categories: ["Light", "3D"],
  },
  {
    id: "14",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450",
    twitterUsername: "web_artist",
    categories: ["Bento", "Dark"],
  },
  {
    id: "15",
    imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600",
    twitterUsername: "ux_explorer",
    categories: ["Minimal", "Typography"],
  },
  {
    id: "16",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52a?w=800&h=500",
    twitterUsername: "interface_guru",
    categories: ["Gradient", "Light"],
  },
  {
    id: "17",
    imageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&h=600",
    twitterUsername: "product_designer",
    categories: ["Dark", "3D"],
  },
  {
    id: "18",
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=700",
    twitterUsername: "webflow_expert",
    categories: ["Bento", "Typography"],
  },
  {
    id: "19",
    imageUrl: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&h=500",
    twitterUsername: "frontend_ninja",
    categories: ["Light", "Minimal"],
  },
  {
    id: "20",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&h=600",
    twitterUsername: "react_dev",
    categories: ["Gradient", "Dark"],
  },
  {
    id: "21",
    imageUrl: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&h=700",
    twitterUsername: "figma_master",
    categories: ["3D", "Light"],
  },
  {
    id: "22",
    imageUrl: "https://images.unsplash.com/photo-1554147090-e1221a04a025?w=800&h=500",
    twitterUsername: "ui_engineer",
    categories: ["Bento", "Typography"],
  },
  {
    id: "23",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600",
    twitterUsername: "design_system",
    categories: ["Minimal", "Dark"],
  },
  {
    id: "24",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=450",
    twitterUsername: "css_wizard",
    categories: ["Gradient", "Typography"],
  },
  {
    id: "25",
    imageUrl: "https://images.unsplash.com/photo-1616763355603-9755a640a287?w=800&h=600",
    twitterUsername: "ui_creator",
    categories: ["Light", "3D"],
  },
  {
    id: "26",
    imageUrl: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=700",
    twitterUsername: "motion_designer",
    categories: ["Bento", "Dark"],
  },
  {
    id: "27",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500",
    twitterUsername: "webdesign_pro",
    categories: ["Minimal", "Typography"],
  },
  {
    id: "28",
    imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&h=600",
    twitterUsername: "ux_builder",
    categories: ["Gradient", "Light"],
  },
  {
    id: "29",
    imageUrl: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?w=800&h=700",
    twitterUsername: "tailwind_master",
    categories: ["Dark", "3D"],
  },
  {
    id: "30",
    imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7b?w=800&h=450",
    twitterUsername: "framer_motion",
    categories: ["Bento", "Typography"],
  },
  {
    id: "31",
    imageUrl: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?w=800&h=600",
    twitterUsername: "next_js_dev",
    categories: ["Light", "Minimal"],
  },
  {
    id: "32",
    imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=500",
    twitterUsername: "ui_craftsman",
    categories: ["Gradient", "Dark"],
  },
  {
    id: "33",
    imageUrl: "https://images.unsplash.com/photo-1578393098337-5594cce112da?w=800&h=600",
    twitterUsername: "gsap_expert",
    categories: ["3D", "Light"],
  },
  {
    id: "34",
    imageUrl: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=700",
    twitterUsername: "svelte_dev",
    categories: ["Bento", "Typography"],
  },
  {
    id: "35",
    imageUrl: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&h=450",
    twitterUsername: "vue_engineer",
    categories: ["Minimal", "Dark"],
  },
  {
    id: "36",
    imageUrl: "https://images.unsplash.com/photo-1620121684840-edffcfc4b878?w=800&h=600",
    twitterUsername: "three_js_dev",
    categories: ["Gradient", "Typography"],
  },
  {
    id: "37",
    imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=700",
    twitterUsername: "webgl_master",
    categories: ["Light", "3D"],
  },
  {
    id: "38",
    imageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&h=500",
    twitterUsername: "react_native",
    categories: ["Bento", "Dark"],
  },
  {
    id: "39",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600",
    twitterUsername: "flutter_dev",
    categories: ["Minimal", "Typography"],
  },
  {
    id: "40",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=450",
    twitterUsername: "react_designer",
    categories: ["Gradient", "Light"],
  },
];

interface HeroGalleryProps {
  initialHeroes?: HeroCardProps[];
}

const HeroGallery: React.FC<HeroGalleryProps> = ({ initialHeroes = mockHeroes }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [heroes] = useState<HeroCardProps[]>(initialHeroes);
  const [visibleHeroes, setVisibleHeroes] = useState<HeroCardProps[]>([]);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const filteredHeroes = activeFilters.length > 0
    ? heroes.filter(hero => 
        activeFilters.every(filter => hero.categories.includes(filter))
      )
    : heroes;
  
  // Initial load of items
  useEffect(() => {
    const initialItems = filteredHeroes.slice(0, 12);
    setVisibleHeroes(initialItems);
  }, [filteredHeroes]);
  
  // Load more items when scrolling
  useEffect(() => {
    if (inView && visibleHeroes.length < filteredHeroes.length) {
      const nextItems = filteredHeroes.slice(
        visibleHeroes.length, 
        visibleHeroes.length + 8
      );
      
      setTimeout(() => {
        setVisibleHeroes(prev => [...prev, ...nextItems]);
      }, 300);
    }
  }, [inView, filteredHeroes, visibleHeroes]);
  
  return (
    <div className="w-full px-0 lg:px-0 max-w-none">
      <div className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 px-4 lg:px-8">
        {visibleHeroes.map(hero => (
          <div key={hero.id} className="masonry-item break-inside-avoid mb-6 transform transition-all duration-500 animate-fade-in">
            <HeroCard {...hero} />
          </div>
        ))}
      </div>
      
      {filteredHeroes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-satoshi">No hero sections match your selected filters</p>
          <Button 
            variant="link" 
            onClick={() => setActiveFilters([])}
            className="mt-2 font-satoshi"
          >
            Clear all filters
          </Button>
        </div>
      )}
      
      {visibleHeroes.length < filteredHeroes.length && (
        <div 
          ref={loadMoreRef} 
          className="w-full h-20 flex items-center justify-center"
        >
          <div className="w-10 h-10 rounded-full border-t-2 border-b-2 border-gray-500 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default HeroGallery;
