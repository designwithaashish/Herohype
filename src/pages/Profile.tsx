
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
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([]);
  const [savedHeroes, setSavedHeroes] = useState<any[]>([]);
  
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
    
    // Load approved submissions
    loadUserContent(userData.id);
  }, [navigate, toast]);
  
  // Function to load user-specific content
  const loadUserContent = (userId: string) => {
    // Get all approved submissions
    const allApprovedStr = localStorage.getItem("approvedSubmissions");
    const allApproved = allApprovedStr ? JSON.parse(allApprovedStr) : [];
    
    // Filter for this user's submissions only
    const userApproved = allApproved.filter((submission: any) => 
      submission.userId === userId || submission.submittedBy === userId
    );
    setApprovedSubmissions(userApproved);
    
    // Get saved heroes for this user
    const savedHeroesKey = `savedHeroes-${userId}`;
    const savedHeroesStr = localStorage.getItem(savedHeroesKey);
    const savedHeroIds = savedHeroesStr ? JSON.parse(savedHeroesStr) : [];
    
    // Get the actual hero data for these IDs
    const heroesDataStr = localStorage.getItem("approvedSubmissions");
    const heroesData = heroesDataStr ? JSON.parse(heroesDataStr) : [];
    
    const userSavedHeroes = heroesData.filter((hero: any) => 
      savedHeroIds.includes(hero.id)
    );
    
    setSavedHeroes(userSavedHeroes);
  };
  
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
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader 
            profile={profile} 
            onUpdateProfile={handleUpdateProfile} 
          />
          
          <ProfileTabs 
            user={user}
            approvedSubmissions={approvedSubmissions}
            savedHeroes={savedHeroes}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
