
import React, { useState, useEffect } from "react";

const images = [
  "/lovable-uploads/3cc98fb9-da55-4ff7-935e-ab2836106958.png",
  "/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png",
  "/lovable-uploads/ba7b2db6-c008-44dc-86ca-5066aaa75abe.png",
];

const LoginImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="mb-2 font-serif text-3xl font-semibold">
              {index === 0 ? "Your Clean Air Solution" : 
               index === 1 ? "Discover Amazing Hero Designs" : 
               "Express Your Creative Vision"}
            </h2>
            <p className="text-sm">
              {index === 0 ? "Join our community of designers and creators" : 
               index === 1 ? "Curate and collect inspiring hero sections" : 
               "Share your best work with fellow designers"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoginImageCarousel;
