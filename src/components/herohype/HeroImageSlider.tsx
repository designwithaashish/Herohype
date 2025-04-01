
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  
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
        // Use default images if no approved submissions
        setSliderImages(Array(5).fill("/placeholder.svg"));
      }
    } else {
      // Use default images if no approved submissions
      setSliderImages(Array(5).fill("/placeholder.svg"));
    }
  }, []);
  
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds delay for a bit faster rotation
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);
  
  return (
    <div className="w-[150px] h-[100px] overflow-hidden rounded-[30px] border-4 border-gray-200">
      <Carousel>
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem 
              key={index} 
              className="w-full h-full"
            >
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt={`Hero image ${index + 1}`} 
                  className={`w-full h-full object-cover transition-all duration-1000
                    ${currentIndex === index ? 
                      'opacity-100 scale-100' : 
                      'opacity-0 scale-[0.8] absolute inset-0'}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroImageSlider;
