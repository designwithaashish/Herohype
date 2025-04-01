
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const HeroSection: React.FC = () => {
  const [itemCount] = useState<number>(100);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [featuredImages, setFeaturedImages] = useState<{
    imageUrl: string;
    twitterUsername: string;
    id: string;
  }[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }

    // Get featured hero images from approved submissions
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    if (approvedSubmissions) {
      const items = JSON.parse(approvedSubmissions);
      if (items.length > 0) {
        // Find items with approved status only
        const approvedItems = items.filter((item: any) => item.status === "approved");
        
        // Get up to 3 image URLs from the approved items
        const imageUrls = approvedItems
          .slice(0, 3)
          .map((item: any) => ({
            imageUrl: item.imageUrl,
            twitterUsername: item.twitterUsername,
            id: item.id
          }));
        
        // If we have at least one image, set it. Otherwise use a placeholder
        if (imageUrls.length > 0) {
          setFeaturedImages(imageUrls);
        } else {
          // Default image if no approved submissions
          setFeaturedImages([{
            imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
            twitterUsername: "herohype",
            id: "default-1"
          }]);
        }
      } else {
        // Default image if no submissions
        setFeaturedImages([{
          imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
          twitterUsername: "herohype",
          id: "default-1"
        }]);
      }
    } else {
      // Default image if no submissions
      setFeaturedImages([{
        imageUrl: "/lovable-uploads/6c06586e-9322-42a0-8039-6d24db85109f.png",
        twitterUsername: "herohype",
        id: "default-1"
      }]);
    }
  }, []);

  // Set up image slider
  useEffect(() => {
    if (featuredImages.length <= 1) return;
    
    const transitionTime = 600; // ms for transition animation
    const displayTime = 10000; // 10 seconds per image
    
    const interval = setInterval(() => {
      // Start transition
      setIsTransitioning(true);
      
      // Wait for transition to complete before changing the index
      setTimeout(() => {
        setCurrentImageIndex(prev => 
          prev === featuredImages.length - 1 ? 0 : prev + 1
        );
        
        // Wait a bit then remove the transition state
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, transitionTime);
      
    }, displayTime);
    
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  const handleExploreClick = () => {
    // Scroll down to the gallery section
    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmitClick = () => {
    if (isLoggedIn) {
      navigate("/submit");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative flex min-h-[620px] w-full flex-col text-center justify-center bg-[#F9FAEB] pt-16 pb-16 px-5 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between mx-auto gap-20">
        <div className="text-left max-w-3xl">
          {/* Top stat banner - left aligned with heading */}
          <div className="bg-white border inline-flex items-center gap-2 text-xs text-black font-medium uppercase tracking-[0.5px] leading-[1.2] justify-center px-6 py-2 rounded-[60px] border-[rgba(0,0,0,0.15)] border-solid shadow-sm animate-fade-in self-start mb-12 w-fit">
            <span className="text-black">*</span>
            <div className="self-stretch my-auto font-satoshi">{itemCount}+ HERO SECTIONS CURATED</div>
            <span className="text-black">*</span>
          </div>

          {/* Main headline */}
          <h1 className="font-playfair text-black leading-[1.1] animate-[fade-in_0.5s_ease_0.2s_both]">
            <div className="text-[46px] md:text-[72px] max-md:text-[36px]">
              Discover <span className="text-[#FF6C44]">Trendy</span> &
            </div>
            <div className="text-[46px] md:text-[72px] max-md:text-[36px] mt-2">
              Perfect <span className="text-[#FF6C44]">Hero Sections</span>
            </div>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-[rgba(61,61,61,1)] leading-7 mt-8 text-left font-satoshi animate-[fade-in_0.5s_ease_0.6s_both] max-w-lg">
            Explore a stunning collection of curated hero designs.
            Filter by style, vibe, or trend. From bold gradients to sleek
            minimalism, find inspiration that fits your vision.
          </p>

          {/* Buttons with hover states */}
          <div className="flex justify-start gap-4 mt-10 animate-[fade-in_0.5s_ease_0.8s_both]">
            <button
              onClick={handleExploreClick}
              className="bg-white border border-gray-200 text-black rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 hover:-translate-y-0.5"
            >
              Explore
            </button>
            <button
              onClick={handleSubmitClick}
              className="bg-[#3A5A40] text-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all hover:bg-[#2F4A35] hover:-translate-y-0.5 flex items-center gap-2"
            >
              Submit Your Design
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Hero image slider with featured tag and creator info - with increased size */}
        <div className="mt-10 md:mt-0 w-full max-w-[520px] md:min-h-[440px] relative">
          {featuredImages.length > 0 && featuredImages.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 transition-all duration-600 ${
                currentImageIndex === index 
                  ? 'opacity-100 z-10 scale-100' 
                  : 'opacity-0 z-0 scale-95'
              } ${isTransitioning && currentImageIndex === index ? 'opacity-0 scale-105' : ''}`}
            >
              <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-10">
                <Badge className="bg-[#3A5A40] hover:bg-[#3A5A40] text-white font-medium">
                  Featured
                </Badge>
                <a 
                  href={`https://twitter.com/${image.twitterUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm bg-black/50 px-2 py-1 rounded-full hover:bg-black/70 transition-colors"
                >
                  @{image.twitterUsername}
                </a>
              </div>
              <img
                src={image.imageUrl}
                alt={`Featured hero section by ${image.twitterUsername}`}
                className="rounded-[40px] border-6 border-white w-full h-full object-cover md:min-h-[440px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
