
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { generateRandomAvatarColor } from "@/hooks/useHeroGallery";
import { supabase } from "@/integrations/supabase/client";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarColor, setAvatarColor] = useState<string>("bg-gray-200");
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          // Check if user is admin based on email
          setIsAdmin(session.user.email?.includes("admin") || false);
          
          const displayName = session.user.user_metadata.name || 
                             session.user.email?.split('@')[0] || 
                             "user";
          setUsername(displayName);
          setUserInitials(displayName.slice(0, 2).toUpperCase());
          
          // If we have a user ID, try to load their profile data
          if (session.user.id) {
            loadUserProfile(session.user.id);
          }
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUsername("");
          setUserInitials("");
          setAvatarUrl("");
          setUserId(null);
        }
      }
    );
    
    // Load current session on component mount
    const loadCurrentSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        setUserId(session.user.id);
        setIsAdmin(session.user.email?.includes("admin") || false);
        
        const displayName = session.user.user_metadata.name || 
                           session.user.email?.split('@')[0] || 
                           "user";
        setUsername(displayName);
        setUserInitials(displayName.slice(0, 2).toUpperCase());
        
        // Load profile for avatar
        if (session.user.id) {
          loadUserProfile(session.user.id);
        }
      }
    };
    
    loadCurrentSession();
    
    // Only set a random color if we don't have one already
    if (avatarColor === "bg-gray-200") {
      setAvatarColor(generateRandomAvatarColor());
    }
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, avatar_url')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error loading profile:", error);
        return;
      }
      
      if (profile) {
        if (profile.name) {
          setUsername(profile.name);
          setUserInitials(profile.name.slice(0, 2).toUpperCase());
        }
        
        if (profile.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
          Curated Picks
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
                  <AvatarFallback className={`text-white ${avatarColor}`}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col space-y-3">
                <p className="text-sm font-medium">{username}</p>
                <p className="text-sm text-gray-500">Manage your profile, submissions, and moodboards</p>
                <div className="flex flex-col space-y-1">
                  <Link to="/profile" className="text-sm text-blue-600 hover:underline">
                    View Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:underline text-left"
                  >
                    Log Out
                  </button>
                </div>
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
