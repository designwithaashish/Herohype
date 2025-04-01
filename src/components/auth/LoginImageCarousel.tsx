
import React, { useState, useEffect } from "react";

interface LoginImageCarouselProps {
  showText?: boolean;
}

const LoginImageCarousel: React.FC<LoginImageCarouselProps> = ({ showText = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([
    "/lovable-uploads/3cc98fb9-da55-4ff7-935e-ab2836106958.png",
    "/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png",
    "/lovable-uploads/ba7b2db6-c008-44dc-86ca-5066aaa75abe.png",
  ]);

  useEffect(() => {
    // Load images from approved submissions in localStorage
    const approvedSubmissions = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
    
    if (approvedSubmissions.length > 0) {
      const approvedImages = approvedSubmissions
        .filter((item: any) => item.imageUrl && item.status === "approved")
        .map((item: any) => item.imageUrl);
        
      if (approvedImages.length > 0) {
        setImages(approvedImages.slice(0, 5));
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out
            ${currentIndex === index ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={image}
            alt={`Login preview ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          {showText && (
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="mb-2 font-serif text-3xl font-semibold">
                Herohype Design
              </h2>
              <p className="text-sm">
                Join our community of designers
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LoginImageCarousel;
