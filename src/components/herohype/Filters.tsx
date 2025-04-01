
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

const sortOptions = ["Popular", "Latest", "Oldest"];

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
  
  const getActiveCount = () => {
    let count = activeFilters.length;
    return count > 0 ? ` (${count})` : '';
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 px-1">
      <div className="flex flex-wrap gap-2 items-center">
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-white text-sm h-9 px-3 flex gap-2 items-center"
            >
              <span>Filter{getActiveCount()}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              {categoryOptions.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleFilter(category)}
                >
                  <div className={`h-4 w-4 rounded flex items-center justify-center border ${
                    activeFilters.includes(category) 
                      ? 'bg-primary border-primary' 
                      : 'border-gray-300'
                  }`}>
                    {activeFilters.includes(category) && <CheckIcon className="h-3 w-3 text-white" />}
                  </div>
                  <span>{category}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFilters.length > 0 && (
          <Button 
            variant="ghost" 
            className="h-9 px-3 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setActiveFilters([])}
          >
            Clear all
          </Button>
        )}
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
