
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { mockHeroes } from "@/data/mockHeroes";

const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get random images from the mockHeroes data
  const sliderImages = mockHeroes
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, 5) // Take the first 5 items
    .map(hero => hero.imageUrl);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000); // 20 seconds delay
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);
  
  return (
    <div className="w-[150px] h-[100px] overflow-hidden rounded-[8px]">
      <Carousel>
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={index} className={index === currentIndex ? "block" : "hidden"}>
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
