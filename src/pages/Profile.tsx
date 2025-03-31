
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import ProfileTabs from "@/components/profile/ProfileTabs";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface UserProfile {
  name: string;
  description: string;
  avatarUrl: string;
  hireLink?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    description: "",
    avatarUrl: "/placeholder.svg",
    hireLink: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast({
        title: "Authentication required",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);

    // Get user profile if exists or set default values
    const profileStr = localStorage.getItem(`profile-${userData.id}`);
    if (profileStr) {
      setUserProfile(JSON.parse(profileStr));
    } else {
      // Set default profile values
      const defaultProfile = {
        name: userData.email.split("@")[0],
        description: "Edit your profile to add a description",
        avatarUrl: "/placeholder.svg",
        hireLink: ""
      };
      setUserProfile(defaultProfile);
      localStorage.setItem(`profile-${userData.id}`, JSON.stringify(defaultProfile));
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  const updateProfile = (updatedProfile: UserProfile) => {
    if (!user) return;
    
    setUserProfile(updatedProfile);
    localStorage.setItem(`profile-${user.id}`, JSON.stringify(updatedProfile));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-16 px-4">
          <div className="animate-pulse text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
          <div className="w-full">
            <UserProfileHeader 
              profile={userProfile} 
              onUpdateProfile={updateProfile}
            />
          </div>
          <div className="w-full md:w-auto">
            <Button 
              className="bg-[rgba(183,255,29,1)] hover:bg-[rgba(163,235,9,1)] text-black font-medium px-6 py-3"
              onClick={() => navigate("/submit")}
            >
              Submit Hero
            </Button>
          </div>
        </div>
        <ProfileTabs user={user} />
      </div>
    </div>
  );
};

export default Profile;
