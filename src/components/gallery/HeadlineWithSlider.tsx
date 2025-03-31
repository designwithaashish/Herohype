
import React, { useState, useEffect } from "react";

// Sample hero section images for the slider
const heroImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60"
];

const HeadlineWithSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="headline-container my-12">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex flex-wrap justify-center items-center">
          <span className="headline-large">Discover</span>
          
          <div className="hero-image-slider mx-4">
            <img 
              src={heroImages[currentImageIndex]} 
              alt="Hero section example" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <span className="headline-large">The Perfect</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          <span className="headline-large">Trendy</span>
          
          <span className="headline-large headline-bordered">
            Hero Sections
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeadlineWithSlider;
