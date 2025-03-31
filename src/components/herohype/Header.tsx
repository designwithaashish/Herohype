
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsLoggedIn(true);
      setIsAdmin(user.role === "admin");
      
      // Check if user has a profile with custom name and avatar
      const profileStr = localStorage.getItem(`profile-${user.id}`);
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        if (profile.name) {
          setUserName(profile.name);
        } else {
          // Fall back to email if no name is set
          setUserName(user.email ? user.email.split("@")[0] : "");
        }
        if (profile.avatarUrl) {
          setProfileImage(profile.avatarUrl);
        }
      } else {
        // Fall back to email if no profile exists
        setUserName(user.email ? user.email.split("@")[0] : "");
      }
    }
  }, []);
  
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <header className="bg-[rgba(15,16,20,1)] flex h-[80px] w-full items-center gap-[40px_100px] text-black font-normal justify-between flex-wrap px-6 md:px-10 lg:px-20 py-5 max-md:max-w-full">
      <Link to="/" className="bg-[rgba(183,255,29,1)] flex items-center text-black whitespace-nowrap text-center tracking-[-0.5px] leading-[1.1] justify-center my-auto h-[32px]">
        <img
          src="/lovable-uploads/22e3d4c1-cb57-47eb-a8b8-fb1a672b939f.png"
          className="h-[32px]"
          alt="herohype logo"
        />
      </Link>

      <nav className="flex items-center gap-10 text-[15px] text-white font-medium justify-center my-auto">
        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-gray-300 transition-colors font-satoshi"
          >
            Admin
          </Link>
        )}
      </nav>

      <div className="flex gap-3 items-center text-[22px] text-center leading-[1.2] justify-center my-auto">
        {isLoggedIn ? (
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
            <Avatar className="h-9 w-9 border border-gray-700">
              {profileImage ? (
                <AvatarImage src={profileImage} alt={userName || "User"} />
              ) : (
                <AvatarFallback className="bg-gray-700 text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-white text-sm">{userName || "User"}</span>
          </div>
        ) : (
          <Button 
            onClick={() => navigate("/login")}
            className="bg-white text-black shadow-[6px_6px_8px_rgba(0,0,0,0.2)] gap-2.5 px-5 py-3 rounded-lg hover:bg-gray-100 transition-colors font-satoshi"
          >
            Login / Sign up
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
