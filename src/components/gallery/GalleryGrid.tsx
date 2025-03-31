
import React, { useEffect, useRef } from "react";
import HeroCard, { HeroCardProps } from "@/components/gallery/HeroCard";

interface GalleryGridProps {
  heroes: HeroCardProps[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ heroes }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Function to calculate and set row spans for masonry layout
  const resizeGridItems = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridItems = grid.querySelectorAll(".masonry-item");
    const rowHeight = 5; // This matches the grid-auto-rows value

    gridItems.forEach((item) => {
      const itemElement = item as HTMLElement;
      const rowSpan = Math.ceil(itemElement.getBoundingClientRect().height / rowHeight);
      itemElement.style.setProperty("--row-span", rowSpan.toString());
    });
  };

  // Initial layout and resize handling
  useEffect(() => {
    // Wait for images to load
    const handleImageLoad = () => {
      resizeGridItems();
    };

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      resizeGridItems();
    });

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    // Resize on window resize
    window.addEventListener("resize", resizeGridItems);

    // Add listeners for image load events
    const imageElements = document.querySelectorAll(".masonry-item img");
    imageElements.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    // Initial call
    setTimeout(resizeGridItems, 100);

    return () => {
      if (gridRef.current) {
        resizeObserver.unobserve(gridRef.current);
      }
      window.removeEventListener("resize", resizeGridItems);
      imageElements.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [heroes.length]);

  // Re-run layout whenever heroes change
  useEffect(() => {
    setTimeout(resizeGridItems, 100);
  }, [heroes]);

  return (
    <div ref={gridRef} className="masonry-grid">
      {heroes.map((hero, index) => (
        <div key={`hero-${hero.id}-${index}`} className="masonry-item transform transition-all duration-500 animate-fade-in">
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
