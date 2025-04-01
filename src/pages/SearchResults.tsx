
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page since search functionality is removed
    navigate("/");
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default SearchResults;
