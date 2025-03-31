
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Filter categories
const categories = [
  "All", "Dark", "Light", "Gradient", "3D", "Bento", "Minimal", "Typography"
];

interface FiltersProps {
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  activeFilters, 
  setActiveFilters, 
  sortOption, 
  setSortOption 
}) => {
  const navigate = useNavigate();
  
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
  
  const handleSubmitClick = () => {
    navigate("/submit");
  };

  return (
    <div className="w-full px-6 lg:px-20 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] bg-[rgba(239,239,239,1)] rounded-[32px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Popular">Popular</SelectItem>
              <SelectItem value="Trending">Trending</SelectItem>
              <SelectItem value="Recent">Recent</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex flex-wrap gap-2">
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
        </div>
        
        <Button 
          onClick={handleSubmitClick}
          className="self-stretch bg-[rgba(27,27,27,1)] text-white shadow-[6px_6px_8px_rgba(0,0,0,0.2)] px-5 py-3 rounded-lg hover:bg-[rgba(40,40,40,1)] transition-colors"
        >
          Submit Yours
        </Button>
      </div>
    </div>
  );
};

export default Filters;
