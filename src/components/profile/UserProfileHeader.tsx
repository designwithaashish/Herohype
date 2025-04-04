
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, ExternalLink, Upload, Image, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  name: string;
  description: string;
  avatarUrl: string;
  hireLink?: string;
}

interface UserProfileHeaderProps {
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleEditClick = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };
  
  const getInitials = (name: string) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      // Update the profile with the new image URL
      setEditedProfile({ ...editedProfile, avatarUrl: publicUrl });
      
      toast({
        title: "Image uploaded",
        description: "Your profile picture has been updated",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was an issue logging you out",
        variant: "destructive",
      });
    }
  };

  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-gray-100 cursor-pointer" onClick={handleImageClick}>
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handleImageClick}>
            <Image className="h-8 w-8 text-white" />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-serif font-semibold mb-2">{profile.name || "Add your name"}</h1>
          <p className="text-gray-600 mb-4 max-w-2xl">{profile.description}</p>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {profile.hireLink && (
              <Button variant="outline" size="sm" asChild>
                <a href={profile.hireLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <span>Hire me</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={handleEditClick} className="flex items-center gap-1">
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
            
            <Button 
              className="bg-[rgba(183,255,29,1)] hover:bg-[rgba(163,235,9,1)] text-black font-medium"
              size="sm"
              onClick={() => navigate("/submit")}
            >
              Submit Hero
            </Button>
            
            <Button 
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex justify-center mb-2">
              <div className="relative group">
                <Avatar className="h-20 w-20 border-2 border-gray-100 cursor-pointer" onClick={handleImageClick}>
                  <AvatarImage src={editedProfile.avatarUrl} alt={editedProfile.name} />
                  <AvatarFallback className="text-xl">{getInitials(editedProfile.name)}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handleImageClick}>
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Bio / Description</Label>
              <Textarea
                id="description"
                value={editedProfile.description}
                onChange={(e) => setEditedProfile({...editedProfile, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="hireLink">Hire Me Link (optional)</Label>
              <Input
                id="hireLink"
                value={editedProfile.hireLink || ""}
                onChange={(e) => setEditedProfile({...editedProfile, hireLink: e.target.value})}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileHeader;
