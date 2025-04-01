
import React, { useState, useEffect } from "react";

const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [twitterUsernames, setTwitterUsernames] = useState<string[]>([]);
  
  useEffect(() => {
    // Get images from the approvedSubmissions in localStorage
    const loadImages = () => {
      const approvedItems = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
      console.log("Loading slider images from approvedSubmissions:", approvedItems.length);
      
      if (approvedItems.length > 0) {
        // Get image URLs from the approved items only
        const imageData = approvedItems
          .filter((item: any) => item.imageUrl && item.status === "approved")
          .map((item: any) => ({
            imageUrl: item.imageUrl,
            twitterUsername: item.twitterUsername || 'unknown'
          }));
        
        console.log("Filtered image URLs:", imageData.length);
        
        // If we have at least one image, set it. Otherwise use a placeholder
        if (imageData.length > 0) {
          // If we have less than 3 images, duplicate them to have at least 3
          if (imageData.length < 3) {
            const repeatedImages = [...imageData];
            while (repeatedImages.length < 3) {
              repeatedImages.push(...imageData);
            }
            setSliderImages(repeatedImages.slice(0, 3).map(item => item.imageUrl));
            setTwitterUsernames(repeatedImages.slice(0, 3).map(item => item.twitterUsername));
          } else {
            setSliderImages(imageData.slice(0, 3).map(item => item.imageUrl));
            setTwitterUsernames(imageData.slice(0, 3).map(item => item.twitterUsername));
          }
        } else {
          // Use sample image if no approved submissions
          setSliderImages(Array(3).fill("/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png"));
          setTwitterUsernames(Array(3).fill("example"));
        }
      } else {
        // Use sample image if no approved submissions
        setSliderImages(Array(3).fill("/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png"));
        setTwitterUsernames(Array(3).fill("example"));
      }
    };
    
    loadImages();
  }, []);
  
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    
    const displayTime = 6000; // 6 seconds per image
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => 
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, displayTime);
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);
  
  return (
    <div className="w-full h-full overflow-hidden rounded-[20px] bg-white relative">
      {sliderImages.map((image, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out
            ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src={image} 
            alt={`Hero image ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-xs font-medium">
              @{twitterUsernames[index]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroImageSlider;
