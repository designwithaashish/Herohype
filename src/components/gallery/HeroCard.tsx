import React, { useState, useRef, useEffect } from "react";
import { StarIcon, HeartIcon, BookmarkIcon, XCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export interface HeroCardProps {
  id: string;
  imageUrl: string;
  twitterUsername: string;
  categories?: string[];
  likes?: number;
  saves?: number;
  status?: "approved" | "pending" | "rejected";
  submissionDate?: string;
  userId?: string;
  submittedBy?: string;
  isCurated?: boolean;
  isFeatured?: boolean;
}

interface HeroCardComponentProps extends HeroCardProps {
  showRemoveOption?: boolean;
  showCuratedControls?: boolean;
  onRemove?: (id: string) => void;
  onToggleCurated?: (id: string, isCurated: boolean) => void;
}

const HeroCard: React.FC<HeroCardComponentProps> = ({
  id,
  imageUrl,
  twitterUsername,
  categories = [],
  likes = 0,
  saves = 0,
  isCurated,
  isFeatured,
  showRemoveOption = false,
  showCuratedControls = false,
  onRemove,
  onToggleCurated
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(likes);
  const [saveCount, setSaveCount] = useState(saves);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [moodboardDialogOpen, setMoodboardDialogOpen] = useState(false);
  const [newMoodboardName, setNewMoodboardName] = useState("");
  const [userMoodboards, setUserMoodboards] = useState<any[]>([]);
  const [selectedMoodboard, setSelectedMoodboard] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStarred, setIsStarred] = useState(isCurated || false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const newMoodboardInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Check for current user
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUserId(session.user.id);
        setIsAuthenticated(true);
        setIsAdmin(session.user.email?.includes("admin") || false);
        
        // Check if this hero is liked by the user
        checkLikeStatus(session.user.id, id);
        
        // Check if this hero is saved by the user
        checkSaveStatus(session.user.id, id);
        
        // If user is logged in, load their collections/moodboards
        if (isAdmin) {
          loadUserMoodboards(session.user.id);
        }
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setIsAdmin(false);
      }
    };
    
    checkUser();
    setIsStarred(isCurated || false);
  }, [id, isCurated]);
  
  const checkLikeStatus = async (userId: string, submissionId: string) => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', userId)
        .eq('submission_id', submissionId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking like status:', error);
      }
      
      setIsLiked(!!data);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };
  
  const checkSaveStatus = async (userId: string, submissionId: string) => {
    try {
      const { data, error } = await supabase
        .from('saves')
        .select('*')
        .eq('user_id', userId)
        .eq('submission_id', submissionId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking save status:', error);
      }
      
      setIsSaved(!!data);
    } catch (error) {
      console.error("Error checking save status:", error);
    }
  };
  
  const loadUserMoodboards = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      setUserMoodboards(data || []);
    } catch (error) {
      console.error("Error loading user moodboards:", error);
      setUserMoodboards([]);
    }
  };
  
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to like items",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!userId) return;
    
    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', userId)
          .eq('submission_id', id);
        
        if (error) throw error;
        
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
        
        toast({
          title: "Removed like",
          description: "You've removed your like",
        });
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: userId,
            submission_id: id
          });
        
        if (error) throw error;
        
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        
        toast({
          title: "Added like",
          description: "You've liked this hero section",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to save items",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (isAdmin) {
      setMoodboardDialogOpen(true);
    } else {
      toggleSaveStatus();
    }
  };

  const toggleSaveStatus = async () => {
    if (!userId) return;
    
    try {
      if (isSaved) {
        // Remove from saves
        const { error } = await supabase
          .from('saves')
          .delete()
          .eq('user_id', userId)
          .eq('submission_id', id);
        
        if (error) throw error;
        
        setIsSaved(false);
        setSaveCount(prev => Math.max(0, prev - 1));
        
        toast({
          title: "Removed from saved items",
          description: "Item has been removed from your saved items",
        });
      } else {
        // Add to saves
        const { error } = await supabase
          .from('saves')
          .insert({
            user_id: userId,
            submission_id: id
          });
        
        if (error) throw error;
        
        setIsSaved(true);
        setSaveCount(prev => prev + 1);
        
        toast({
          title: "Added to saved items",
          description: "Item has been added to your saved items",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleStar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    const newStarredState = !isStarred;
    setIsStarred(newStarredState);
    
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ is_curated: newStarredState })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: newStarredState ? "Added to Curated Picks" : "Removed from Curated Picks",
        description: newStarredState 
          ? "This hero section has been added to Curated Picks" 
          : "This hero section has been removed from Curated Picks",
      });
    } catch (error: any) {
      setIsStarred(!newStarredState); // Revert UI state if failed
      toast({
        title: "Error updating curated status",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleToggleCurated = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleCurated) {
      onToggleCurated(id, !isCurated);
    }
  };
  
  const handleCreateNewMoodboard = async () => {
    if (!newMoodboardName.trim() || !userId) return;
    
    try {
      const { data, error } = await supabase
        .from('collections')
        .insert({
          user_id: userId,
          name: newMoodboardName,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newMoodboard = data;
      setUserMoodboards(prev => [...prev, newMoodboard]);
      setSelectedMoodboard(newMoodboard.id);
      setNewMoodboardName("");
      
      toast({
        title: "Moodboard created",
        description: `New moodboard "${newMoodboardName}" created`,
      });
    } catch (error: any) {
      toast({
        title: "Error creating moodboard",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveToMoodboard = async () => {
    if (!selectedMoodboard || !userId) {
      toast({
        title: "No moodboard selected",
        description: "Please select or create a moodboard first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Check if the item already exists in the collection
      const { data: existingItems, error: checkError } = await supabase
        .from('collection_items')
        .select('*')
        .eq('collection_id', selectedMoodboard)
        .eq('submission_id', id);
      
      if (checkError) throw checkError;
      
      if (existingItems && existingItems.length > 0) {
        toast({
          title: "Already in moodboard",
          description: "This item is already in the selected moodboard",
        });
        return;
      }
      
      // Check if the collection has reached its limit (10 items)
      const { data: collectionItems, error: countError } = await supabase
        .from('collection_items')
        .select('*', { count: 'exact' })
        .eq('collection_id', selectedMoodboard);
      
      if (countError) throw countError;
      
      if (collectionItems && collectionItems.length >= 10) {
        toast({
          title: "Moodboard full",
          description: "A moodboard can contain a maximum of 10 items",
          variant: "destructive",
        });
        return;
      }
      
      // Add the item to the collection
      const { error } = await supabase
        .from('collection_items')
        .insert({
          collection_id: selectedMoodboard,
          submission_id: id
        });
      
      if (error) throw error;
      
      // Find the moodboard name for the toast
      const moodboard = userMoodboards.find(mb => mb.id === selectedMoodboard);
      
      setIsSaved(true);
      setSaveCount(prev => prev + 1);
      
      toast({
        title: "Added to moodboard",
        description: `Item added to "${moodboard?.name || 'moodboard'}"`,
      });
      
      setMoodboardDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error saving to moodboard",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-[30px] border border-gray-200 hover:shadow-md group">
        <div className="relative">
          {isFeatured && (
            <div className="absolute top-3 left-3 z-10 bg-[#DAFF00] text-black px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          
          {isCurated && (
            <div className="absolute top-3 right-3 z-10 bg-black text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <StarIcon className="h-3 w-3" />
              <span>Curated</span>
            </div>
          )}
          
          <div className="overflow-hidden">
            <img
              src={imageUrl}
              alt={`Hero design by ${twitterUsername}`}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <div className="w-full flex justify-between items-center">
                <div className="text-white text-sm font-medium">@{twitterUsername}</div>
                <div className="flex space-x-3">
                  <button 
                    onClick={handleLike}
                    className="flex items-center text-xs text-white hover:scale-110 transition-transform"
                  >
                    <HeartIcon className={`w-3.5 h-3.5 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span>{likeCount}</span>
                  </button>
                  
                  <button
                    onClick={handleSaveClick}
                    className="flex items-center text-xs text-white hover:scale-110 transition-transform"
                  >
                    <BookmarkIcon className={`w-3.5 h-3.5 mr-1 ${isSaved ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    <span>{saveCount}</span>
                  </button>
                  
                  {isAdmin && (
                    <button 
                      onClick={handleStar}
                      className="flex items-center text-xs text-white hover:scale-110 transition-transform"
                    >
                      <StarIcon className={`w-3.5 h-3.5 ${isStarred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </button>
                  )}
                  
                  {showCuratedControls && (
                    <button 
                      onClick={handleToggleCurated}
                      className={`p-1 rounded-full ${isCurated ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-700'}`}
                    >
                      <StarIcon className="w-4 h-4" />
                    </button>
                  )}
                  
                  {showRemoveOption && (
                    <button 
                      onClick={handleRemove}
                      className="p-1 rounded-full bg-red-500 text-white"
                    >
                      <XCircleIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={moodboardDialogOpen} onOpenChange={setMoodboardDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save to Moodboard</DialogTitle>
            <DialogDescription>
              Select an existing moodboard or create a new one.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {userMoodboards.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Your Moodboards</h4>
                <div className="flex flex-wrap gap-2">
                  {userMoodboards.map((mb) => (
                    <Button
                      key={mb.id}
                      variant={selectedMoodboard === mb.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMoodboard(mb.id)}
                      className="text-xs"
                    >
                      {mb.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Create New Moodboard</h4>
              <div className="flex space-x-2">
                <Input
                  ref={newMoodboardInputRef}
                  placeholder="Moodboard name"
                  value={newMoodboardName}
                  onChange={(e) => setNewMoodboardName(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateNewMoodboard();
                    }
                  }}
                />
                <Button onClick={handleCreateNewMoodboard} type="button">
                  Create
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoodboardDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveToMoodboard} disabled={!selectedMoodboard}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroCard;
