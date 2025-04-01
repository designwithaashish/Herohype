
import React, { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const categoryOptions = [
  "Dark", "Light", "Minimal", "Gradient", 
  "Illustrated", "3D", "Animated", "Typography", 
  "Bento", "Crypto"
];

const sortOptions = ["Popular", "Trending", "Recent"];

interface FiltersProps {
  activeFilters: string[];
  setActiveFilters: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({
  activeFilters,
  setActiveFilters,
  sortOption,
  setSortOption,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleFilter = (category: string) => {
    setActiveFilters(prev => 
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 px-1">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Display all category options as pills outside dropdown */}
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((category) => (
            <div 
              key={category}
              onClick={() => toggleFilter(category)}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                activeFilters.includes(category) 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </div>
          ))}
          
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              className="h-8 px-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setActiveFilters([])}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      <DropdownMenu open={isSortOpen} onOpenChange={setIsSortOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white text-sm h-9 px-3 flex gap-2 items-center"
          >
            <span>Sort: {sortOption}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuGroup>
            {sortOptions.map((option) => (
              <DropdownMenuItem 
                key={option}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSortChange(option)}
              >
                <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                  sortOption === option 
                    ? 'bg-primary border-primary' 
                    : 'border border-gray-300'
                }`}>
                  {sortOption === option && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <span>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filters;
