
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  username?: string;
  email: string;
  avatarUrl?: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">HeroHype</span>
        </Link>

        <div className="flex items-center space-x-1">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-gray-900">
              Gallery
            </Link>
            <Link to="/collections" className="transition-colors hover:text-gray-900">
              Collections
            </Link>
          </nav>

          <div className="flex items-center space-x-4 ml-6">
            {user ? (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 hover:opacity-80"
                >
                  <span className="text-sm mr-2">
                    {user.username || user.email.split('@')[0]}
                  </span>
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-purple-600 text-white">
                        {(user.username || user.email).charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-8 w-16"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="h-8 w-20"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
