
import React, { useState, useEffect } from "react";

const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Get images from the approvedSubmissions in localStorage
    const approvedItems = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
    
    if (approvedItems.length > 0) {
      // Get image URLs from the approved items
      const imageUrls = approvedItems
        .filter((item: any) => item.imageUrl && item.status === "approved") // Ensure there's an image URL and item is approved
        .map((item: any) => item.imageUrl);
      
      // If we have at least one image, set it. Otherwise use a placeholder
      if (imageUrls.length > 0) {
        // If we have less than 5 images, duplicate them to have at least 5
        if (imageUrls.length < 5) {
          const repeatedImages = [...imageUrls];
          while (repeatedImages.length < 5) {
            repeatedImages.push(...imageUrls);
          }
          setSliderImages(repeatedImages.slice(0, 5));
        } else {
          setSliderImages(imageUrls.slice(0, 5));
        }
      } else {
        // Use sample image if no approved submissions
        setSliderImages(Array(5).fill("/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png"));
      }
    } else {
      // Use sample image if no approved submissions
      setSliderImages(Array(5).fill("/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png"));
    }
  }, []);
  
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    
    const transitionTime = 600; // ms for transition animation
    const displayTime = 3000; // ms for displaying each image
    
    const interval = setInterval(() => {
      // Start transition
      setIsTransitioning(true);
      
      // Wait for fade out to complete before changing the index
      setTimeout(() => {
        setCurrentIndex(prevIndex => 
          prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
        );
        
        // Wait a bit then remove the transition state
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, transitionTime);
      
    }, displayTime);
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);
  
  return (
    <div className="w-[150px] h-[100px] overflow-hidden rounded-[20px] bg-white relative">
      {sliderImages.map((image, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 w-full h-full transition-all duration-600
            ${currentIndex === index ? 
              'opacity-100 z-10' : 
              'opacity-0 z-0'}`}
        >
          <img 
            src={image} 
            alt={`Hero image ${index + 1}`} 
            className={`w-full h-full object-cover transition-all duration-600
              ${currentIndex === index ? 
                (isTransitioning ? 'scale-100 opacity-100' : 'scale-100 opacity-100') : 
                'scale-80 opacity-0'}`}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroImageSlider;
