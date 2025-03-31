
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { mockHeroes } from "@/data/mockHeroes";

const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  
  // Get random images from the mockHeroes data
  const sliderImages = mockHeroes
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, 5) // Take the first 5 items
    .map(hero => hero.imageUrl);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex(prevIndex => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000); // 20 seconds delay
    
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
