
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/herohype/Header";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

// Define user type
interface User {
  id: string;
  email: string;
  role?: string;
}

// Define user profile type
interface UserProfile {
  name: string;
  description: string;
  avatarUrl: string;
  hireLink?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    description: "",
    avatarUrl: "",
    hireLink: ""
  });
  
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
    
    // Set user
    const userData = JSON.parse(userStr);
    setUser(userData);
    
    // Load profile data if it exists - use user-specific key
    const profileKey = `profile-${userData.id}`;
    const profileStr = localStorage.getItem(profileKey);
    
    if (profileStr) {
      const profileData = JSON.parse(profileStr);
      setProfile(profileData);
    } else {
      // Create empty profile with defaults
      const newProfile = {
        name: "",
        description: "",
        avatarUrl: "",
        hireLink: ""
      };
      
      // Save the profile and set it
      localStorage.setItem(profileKey, JSON.stringify(newProfile));
      setProfile(newProfile);
    }
  }, [navigate, toast]);
  
  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    if (!user) return;
    
    // Save profile to localStorage with user-specific key
    const profileKey = `profile-${user.id}`;
    localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
    
    // Update state
    setProfile(updatedProfile);
    
    // Show notification
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved"
    });
  };
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full py-12 px-[80px]">
        <div className="w-full">
          <UserProfileHeader 
            profile={profile} 
            onUpdateProfile={handleUpdateProfile} 
          />
          
          <ProfileTabs user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
