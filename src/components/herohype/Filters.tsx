
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  const toggleFilter = (category: string) => {
    if (category === "All") {
      setActiveFilters([]);
      return;
    }
    
    // Create new array directly instead of using a callback function
    const newFilters = activeFilters.includes(category) 
      ? activeFilters.filter(c => c !== category) 
      : [...activeFilters, category];
    
    setActiveFilters(newFilters);
  };
  
  const handleSubmitClick = () => {
    navigate("/submit");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-5">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center items-center gap-4`}>
        <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} items-center justify-center gap-4`}>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[180px]'} bg-[rgba(239,239,239,1)] rounded-[32px]`}>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Popular">Popular</SelectItem>
              <SelectItem value="Trending">Trending</SelectItem>
              <SelectItem value="Recent">Recent</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex flex-wrap justify-center gap-2 mt-2">
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
          className={`${isMobile ? 'w-full mt-4' : ''} bg-[rgba(27,27,27,1)] text-white shadow-[6px_6px_8px_rgba(0,0,0,0.2)] px-5 py-3 rounded-lg hover:bg-[rgba(40,40,40,1)] transition-colors`}
        >
          Submit Yours
        </Button>
      </div>
    </div>
  );
};

export default Filters;
