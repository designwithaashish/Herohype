
import React from "react";

interface LoadMoreIndicatorProps {
  innerRef: React.Ref<HTMLDivElement>;
}

const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({ innerRef }) => {
  return (
    <div 
      ref={innerRef} 
      className="w-full h-20 flex items-center justify-center"
    >
      <div className="w-10 h-10 rounded-full border-t-2 border-b-2 border-gray-500 animate-spin"></div>
    </div>
  );
};

export default LoadMoreIndicator;
