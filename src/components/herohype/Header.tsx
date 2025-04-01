
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for user data whenever localStorage changes
    const checkUserData = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          setIsAdmin(user.role === "admin");
          const displayName = user.username || user.email?.split('@')[0] || "user";
          setUsername(displayName);
          setUserInitials(displayName.slice(0, 2).toUpperCase());
          // Set avatar URL if available
          setAvatarUrl(user.avatarUrl || "");
          console.log("User avatar URL:", user.avatarUrl);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername("");
        setUserInitials("");
        setAvatarUrl("");
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
        <div className="p-2 flex items-center">
          <img 
            src="/lovable-uploads/ba7b2db6-c008-44dc-86ca-5066aaa75abe.png" 
            alt="herohype" 
            className="h-7"
          />
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-[15px] text-black font-medium justify-center my-auto">
        <Link to="/curated" className="flex items-center gap-1 hover:text-gray-600 transition-colors font-satoshi">
          <span>✨</span>
          Curated
        </Link>
        <Link to="/collections" className="hover:text-gray-600 transition-colors font-satoshi">
          Moodboards
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
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to="/profile" className="flex items-center">
                <Avatar className="h-8 w-8">
                  {avatarUrl && avatarUrl !== "" ? (
                    <AvatarImage src={avatarUrl} alt={username} />
                  ) : null}
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col space-y-3">
                <p className="text-sm">{username}</p>
                <p className="text-sm text-gray-500">Manage your profile, submissions, and moodboards</p>
                <Link to="/profile" className="text-sm text-blue-600 hover:underline">
                  View Profile
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
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
