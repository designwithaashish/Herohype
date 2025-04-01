
import React, { useState, useEffect } from "react";

const LoginImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([
    "/lovable-uploads/3cc98fb9-da55-4ff7-935e-ab2836106958.png",
    "/lovable-uploads/8223dd0c-163d-4254-96ae-d65a4cf40baf.png",
    "/lovable-uploads/ba7b2db6-c008-44dc-86ca-5066aaa75abe.png",
  ]);
  const [titles, setTitles] = useState<string[]>([
    "Your Clean Air Solution",
    "Discover Amazing Hero Designs",
    "Express Your Creative Vision",
  ]);
  const [descriptions, setDescriptions] = useState<string[]>([
    "Join our community of designers and creators",
    "Curate and collect inspiring hero sections",
    "Share your best work with fellow designers",
  ]);

  useEffect(() => {
    // Load images from approved submissions in localStorage
    const approvedSubmissions = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
    
    if (approvedSubmissions.length > 0) {
      const approvedImages = approvedSubmissions
        .filter((item: any) => item.imageUrl && item.status === "approved")
        .map((item: any) => item.imageUrl);
        
      if (approvedImages.length > 0) {
        // If we have approved images, use them (up to 5)
        setImages(approvedImages.slice(0, 5));
        
        // Create generic titles and descriptions for these images
        const genericTitles = [
          "Inspiring Design Solutions",
          "Creative Hero Sections",
          "Modern Web Experiences",
          "Crafted User Interfaces",
          "Elegant Design Systems"
        ];
        
        const genericDescriptions = [
          "Join our community of talented designers",
          "Discover trending hero section designs",
          "Create and share your own unique designs",
          "Get inspiration for your next project",
          "Connect with fellow creative professionals"
        ];
        
        setTitles(genericTitles.slice(0, approvedImages.length));
        setDescriptions(genericDescriptions.slice(0, approvedImages.length));
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
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="mb-2 font-serif text-3xl font-semibold">
              {titles[index] || "Herohype Design"}
            </h2>
            <p className="text-sm">
              {descriptions[index] || "Join our community of designers"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoginImageCarousel;
