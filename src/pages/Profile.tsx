
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/herohype/Header";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { supabase } from "@/integrations/supabase/client";

// Define user type based on Supabase auth user
interface User {
  id: string;
  email?: string;
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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            role: session.user.email?.includes("admin") ? "admin" : "user"
          });
        } else {
          setUser(null);
          navigate("/login");
        }
      }
    );
    
    // Get current session
    const getCurrentUser = async () => {
      setLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please log in to view your profile",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        const userData = {
          id: session.user.id,
          email: session.user.email,
          role: session.user.email?.includes("admin") ? "admin" : "user"
        };
        
        setUser(userData);
        
        // Fetch user profile from Supabase
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (profileData) {
          setProfile({
            name: profileData.name || "",
            description: profileData.description || "Edit your profile to add a description",
            avatarUrl: profileData.avatar_url || "",
            hireLink: profileData.hire_link || ""
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error loading profile",
          description: "There was an issue loading your profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    getCurrentUser();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);
  
  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    if (!user) return;
    
    try {
      // Save profile to Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedProfile.name,
          description: updatedProfile.description,
          avatar_url: updatedProfile.avatarUrl,
          hire_link: updatedProfile.hireLink
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update state
      setProfile(updatedProfile);
      
      // Show notification
      toast({
        title: "Profile updated",
        description: "Your profile changes have been saved"
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "There was an issue saving your profile changes",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your profile</div>;
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
