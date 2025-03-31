
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserProfileHeaderProps {
  username: string;
  email: string;
  avatarUrl?: string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  username,
  email,
  avatarUrl,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };
  
  const handleSubmitHero = () => {
    navigate("/submit");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${username}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-medium">
                {username ? username.charAt(0).toUpperCase() : "?"}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
          <h1 className="text-2xl font-bold">{username || "New User"}</h1>
          <p className="text-gray-500">{email}</p>
        </div>
        
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button 
            onClick={handleSubmitHero}
            className="px-4"
          >
            Submit Hero
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="px-4 text-black border-black hover:bg-gray-100 hover:text-black"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
