
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, ExternalLink } from "lucide-react";

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
  
  const handleEditClick = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-2 border-gray-100">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-serif font-semibold mb-2">{profile.name}</h1>
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
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={editedProfile.avatarUrl}
                onChange={(e) => setEditedProfile({...editedProfile, avatarUrl: e.target.value})}
                placeholder="https://example.com/avatar.jpg"
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
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileHeader;
