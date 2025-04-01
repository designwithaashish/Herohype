
import React, { useState, useRef, useEffect } from "react";
import { StarIcon, HeartIcon, BookmarkIcon, XCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

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
  const newMoodboardInputRef = useRef<HTMLInputElement>(null);
  const isAdmin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").role === "admin" : false;
  const [isStarred, setIsStarred] = useState(isCurated || false);
  
  useEffect(() => {
    // Check if item is liked or saved
    checkSavedStatus();
    
    // Load user moodboards
    if (isAdmin) {
      loadUserMoodboards();
    }
    
    // Set initial starred state
    setIsStarred(isCurated || false);
  }, [id, isCurated]);
  
  const checkSavedStatus = () => {
    // Check if user has collections and if this item is in any of them
    const userCollectionsStr = localStorage.getItem("userCollections");
    if (userCollectionsStr) {
      try {
        const collections = JSON.parse(userCollectionsStr);
        for (const collection of collections) {
          if (collection.items && collection.items.some((item: any) => item.id === id)) {
            setIsSaved(true);
            break;
          }
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    }
  };
  
  const loadUserMoodboards = () => {
    const userMoodboardsStr = localStorage.getItem("userMoodboards");
    if (userMoodboardsStr) {
      try {
        const moodboards = JSON.parse(userMoodboardsStr);
        setUserMoodboards(moodboards);
      } catch (error) {
        console.error("Error loading user moodboards:", error);
      }
    } else {
      setUserMoodboards([]);
    }
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    toast({
      title: isLiked ? "Removed like" : "Added like",
      description: isLiked ? "You've removed your like" : "You've liked this hero section",
      className: "bg-[#3F521F] text-white border-0",
    });
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!localStorage.getItem("user")) {
      toast({
        title: "Login required",
        description: "Please log in to save items",
        variant: "destructive",
        className: "bg-red-700 text-white border-0",
      });
      navigate("/login");
      return;
    }
    
    if (isAdmin) {
      // Admins can add to moodboards
      setMoodboardDialogOpen(true);
    } else {
      // Regular users can only add to their collection
      addToUserCollection();
    }
  };

  const addToUserCollection = () => {
    const userCollectionsStr = localStorage.getItem("userCollections");
    let collections = [];
    
    if (userCollectionsStr) {
      try {
        collections = JSON.parse(userCollectionsStr);
      } catch (error) {
        console.error("Error parsing user collections:", error);
      }
    }

    // Get the item data from approved submissions
    const approvedSubmissions = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
    const itemData = approvedSubmissions.find((item: any) => item.id === id);
    
    if (!itemData) {
      console.error("Item not found in approved submissions");
      return;
    }

    // Check if user has a default collection
    let defaultCollection = collections.find((c: any) => c.name === "My Collection");
    
    // If no default collection, create one
    if (!defaultCollection) {
      defaultCollection = {
        id: `collection-${Date.now()}`,
        name: "My Collection",
        items: []
      };
      collections.push(defaultCollection);
    }

    // Check if item is already in the collection
    if (defaultCollection.items.some((item: any) => item.id === id)) {
      toast({
        title: "Already saved",
        description: "This item is already in your collection",
        className: "bg-[#3F521F] text-white border-0",
      });
      return;
    }

    // Add item to collection
    defaultCollection.items.push(itemData);
    localStorage.setItem("userCollections", JSON.stringify(collections));
    
    // Update saved state
    setIsSaved(true);
    setSaveCount(prev => prev + 1);
    
    toast({
      title: "Added to collection",
      description: "Item added to your collection",
      className: "bg-[#3F521F] text-white border-0",
    });
  };
  
  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    
    const newStarredState = !isStarred;
    setIsStarred(newStarredState);
    
    // Update approved submissions
    const approvedSubmissions = localStorage.getItem("approvedSubmissions");
    if (approvedSubmissions) {
      const items = JSON.parse(approvedSubmissions);
      const updatedItems = items.map((item: any) => {
        if (item.id === id) {
          return { ...item, isCurated: newStarredState };
        }
        return item;
      });
      
      localStorage.setItem("approvedSubmissions", JSON.stringify(updatedItems));
      
      toast({
        title: newStarredState ? "Added to Curated Picks" : "Removed from Curated Picks",
        description: newStarredState 
          ? "This hero section has been added to Curated Picks" 
          : "This hero section has been removed from Curated Picks",
        className: "bg-[#3F521F] text-white border-0",
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
  
  const handleCreateNewMoodboard = () => {
    if (!newMoodboardName.trim()) return;
    
    // Create new moodboard
    const newMoodboard = {
      id: `moodboard-${Date.now()}`,
      name: newMoodboardName,
      items: []
    };
    
    const updatedMoodboards = [...userMoodboards, newMoodboard];
    setUserMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    
    // Select the newly created moodboard
    setSelectedMoodboard(newMoodboard.id);
    setNewMoodboardName("");
    
    toast({
      title: "Moodboard created",
      description: `New moodboard "${newMoodboardName}" created`,
      className: "bg-[#3F521F] text-white border-0",
    });
  };
  
  const handleSaveToMoodboard = () => {
    if (!selectedMoodboard) {
      toast({
        title: "No moodboard selected",
        description: "Please select or create a moodboard first",
        variant: "destructive",
        className: "bg-red-700 text-white border-0",
      });
      return;
    }
    
    // Find the selected moodboard
    const moodboard = userMoodboards.find(mb => mb.id === selectedMoodboard);
    if (!moodboard) return;
    
    // Check if moodboard already has 10 items
    if (moodboard.items && moodboard.items.length >= 10) {
      toast({
        title: "Moodboard full",
        description: "A moodboard can contain a maximum of 10 items",
        variant: "destructive",
        className: "bg-red-700 text-white border-0",
      });
      return;
    }
    
    // Check if item is already in moodboard
    if (moodboard.items && moodboard.items.some((item: any) => item.id === id)) {
      toast({
        title: "Already in moodboard",
        description: `This item is already in "${moodboard.name}"`,
        className: "bg-[#3F521F] text-white border-0",
      });
      return;
    }
    
    // Get the item data from approved submissions
    const approvedSubmissions = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
    const itemData = approvedSubmissions.find((item: any) => item.id === id);
    
    if (!itemData) {
      console.error("Item not found in approved submissions");
      return;
    }
    
    // Add item to moodboard
    const updatedMoodboards = userMoodboards.map(mb => {
      if (mb.id === selectedMoodboard) {
        return {
          ...mb,
          items: [...(mb.items || []), itemData]
        };
      }
      return mb;
    });
    
    setUserMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    
    // Update saved state
    setIsSaved(true);
    setSaveCount(prev => prev + 1);
    
    toast({
      title: "Added to moodboard",
      description: `Item added to "${moodboard.name}"`,
      className: "bg-[#3F521F] text-white border-0",
    });
    
    // Close dialog
    setMoodboardDialogOpen(false);
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
      
      {/* Admin Only: Save to Moodboard Dialog */}
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
                      {mb.name} ({mb.items?.length || 0}/10)
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
