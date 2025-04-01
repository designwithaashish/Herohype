
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import { Button } from "@/components/ui/button";

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Search Functionality Coming Soon</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We're currently working on enhancing our search feature to help you find the perfect hero section.
        </p>
        <Button onClick={() => navigate("/")} className="bg-[#3A5A40] text-white rounded-full px-6 py-3">
          Back to Gallery
        </Button>
      </div>
    </div>
  );
};

export default SearchResults;
