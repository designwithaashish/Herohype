
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Get images from the approvedSubmissions in localStorage
    const approvedItems = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
    
    if (approvedItems.length > 0) {
      // Get image URLs from the approved items
      const imageUrls = approvedItems
        .filter((item: any) => item.imageUrl) // Ensure there's an image URL
        .map((item: any) => item.imageUrl);
      
      // If we have at least one image, set it. Otherwise use a placeholder
      if (imageUrls.length > 0) {
        setSliderImages(imageUrls);
      } else {
        // Use default images if no approved submissions
        setSliderImages(["/placeholder.svg"]);
      }
    } else {
      // Use default images if no approved submissions
      setSliderImages(["/placeholder.svg"]);
    }
  }, []);
  
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex(prevIndex => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds delay (changed from 10 seconds)
    
    return () => clearInterval(interval);
  }, [sliderImages.length, currentIndex]);
  
  return (
    <div className="w-[150px] h-[100px] overflow-hidden rounded-[30px] border-4 border-gray-200">
      <Carousel>
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem 
              key={index} 
              className={`transform transition-transform duration-1000 ${
                index === currentIndex ? "opacity-100 translate-x-0" : 
                index === prevIndex ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"
              }`}
            >
              <img 
                src={image} 
                alt={`Hero image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroImageSlider;
