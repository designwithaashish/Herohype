
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for user data whenever localStorage changes
    const checkUserData = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setIsAdmin(user.role === "admin");
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };
    
    // Initial check
    checkUserData();
    
    // Setup event listener for storage changes
    window.addEventListener("storage", checkUserData);
    
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

  return (
    <header className="bg-white flex h-[80px] w-full items-center gap-[40px] text-black font-normal justify-between flex-wrap px-6 md:px-10 lg:px-20 py-5 max-md:max-w-full border-b border-gray-100">
      <Link to="/" className="flex items-center text-black whitespace-nowrap text-center justify-center my-auto">
        <div className="bg-[#DAFF00] border-2 border-black border-dashed p-1 flex items-center">
          <span className="font-playfair text-xl font-medium">herohype</span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-[15px] text-black font-medium justify-center my-auto">
        <Link to="/" className="flex items-center gap-1 hover:text-gray-600 transition-colors font-satoshi">
          <span>✨</span>
          Curated
        </Link>
        <Link to="/collections" className="hover:text-gray-600 transition-colors font-satoshi">
          Moodboards
        </Link>
        <Link to="#" className="hover:text-gray-600 transition-colors font-satoshi">
          About
        </Link>
        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-gray-600 transition-colors font-satoshi"
          >
            Admin
          </Link>
        )}
      </nav>

      <div className="flex items-center justify-center">
        {isLoggedIn ? (
          <Link to="/profile" className="flex items-center gap-3">
            <div className="text-sm font-medium">My Profile</div>
          </Link>
        ) : (
          <Button 
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Log in
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
