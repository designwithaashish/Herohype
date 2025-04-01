
import React from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { HeroCardProps } from "@/components/gallery/HeroCard";

interface UploadsTabProps {
  approvedSubmissions: any[];
}

const UploadsTab: React.FC<UploadsTabProps> = ({ approvedSubmissions }) => {
  if (approvedSubmissions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No approved uploads</h3>
        <p className="text-gray-500 mb-6">
          None of your submissions have been approved yet.
        </p>
        <a href="/submit" className="text-blue-600 hover:underline">
          Submit a new hero section
        </a>
      </div>
    );
  }

  // Transform the approved submissions to match the HeroCardProps interface
  const heroCards: HeroCardProps[] = approvedSubmissions.map(hero => ({
    id: hero.id,
    imageUrl: hero.imageUrl,
    twitterUsername: hero.twitterUsername,
    categories: hero.categories || [],
    likes: hero.likes || 0,
    saves: hero.saves || 0,
    status: "approved" as "approved" | "pending" | "rejected"
  }));

  return (
    <div>
      <h2 className="text-lg font-medium mb-6">Your Approved Uploads</h2>
      <GalleryGrid heroes={heroCards} />
    </div>
  );
};

export default UploadsTab;
