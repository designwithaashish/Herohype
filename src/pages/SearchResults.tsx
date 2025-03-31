
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroGallery from "@/components/gallery/HeroGallery";
import Header from "@/components/herohype/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { HeroCardProps } from "@/components/gallery/HeroCard";

// Mock data
const allHeroes: HeroCardProps[] = [
  {
    id: "1",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1c9a27ca109627531b07f63bf67d7584e234fb6a",
    twitterUsername: "designermark",
    categories: ["Dark", "Gradient", "Animated"],
    likes: 120,
    saves: 45,
    status: "approved"
  },
  {
    id: "2",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/4dcc644b12d8b5262921e7c60355f5cb0e5c7a62",
    twitterUsername: "webdev_sarah",
    categories: ["Light", "Minimal", "Typography"],
    likes: 85,
    saves: 32,
    status: "approved"
  },
  {
    id: "3",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ca9cd70178b9ef63a5165be05724b3eb93b407cb",
    twitterUsername: "creative_jake",
    categories: ["3D", "Bento"],
    likes: 95,
    saves: 28,
    status: "approved"
  },
  // Add more mock hero data as needed
];

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<HeroCardProps[]>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [location.search]);
  
  const performSearch = (query: string) => {
    // In a real app, this would be an API call
    const results = allHeroes.filter(hero => 
      hero.categories.some(category => 
        category.toLowerCase().includes(query.toLowerCase())
      ) ||
      hero.twitterUsername.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search for hero sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 py-6 text-lg"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Search results for "{searchQuery}"
          </h1>
          <p className="text-gray-600">
            Found {searchResults.length} hero sections
          </p>
        </div>
        
        {searchResults.length > 0 ? (
          <HeroGallery initialHeroes={searchResults} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any hero sections matching "{searchQuery}"
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Gallery
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
