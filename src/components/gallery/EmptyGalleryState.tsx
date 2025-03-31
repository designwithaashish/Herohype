
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyGalleryStateProps {
  onClearFilters: () => void;
}

const EmptyGalleryState: React.FC<EmptyGalleryStateProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <p className="text-lg font-satoshi">No hero sections match your selected filters</p>
      <Button 
        variant="link" 
        onClick={onClearFilters}
        className="mt-2 font-satoshi"
      >
        Clear all filters
      </Button>
    </div>
  );
};

export default EmptyGalleryState;
