import React, { useState, useRef } from "react";
import { StarIcon, HeartIcon, BookmarkIcon, XCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [likeCount, setLikeCount] = useState(likes);
  const [saveCount, setSaveCount] = useState(saves);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [moodboardDialogOpen, setMoodboardDialogOpen] = useState(false);
  const [moodboardName, setMoodboardName] = useState("");
  const [moodboards, setMoodboards] = useState<string[]>([]);
  const [selectedMoodboard, setSelectedMoodboard] = useState("");
  const newMoodboardInputRef = useRef<HTMLInputElement>(null);
  const isAdmin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").role === "admin" : false;
  
  React.useEffect(() => {
    if (!isAdmin) return;
    
    const moodboardsData = localStorage.getItem("moodboards");
    if (moodboardsData) {
      try {
        const parsedMoodboards = JSON.parse(moodboardsData);
        if (Array.isArray(parsedMoodboards)) {
          setMoodboards(parsedMoodboards);
        }
      } catch (error) {
        console.error("Error parsing moodboards:", error);
      }
    }
    
    const checkIfSaved = () => {
      const allMoodboardItems = JSON.parse(localStorage.getItem("allMoodboardItems") || "{}");
      for (const moodboardKey in allMoodboardItems) {
        const items = allMoodboardItems[moodboardKey];
        if (items.some((item: any) => item.id === id)) {
          setIsSaved(true);
          break;
        }
      }
    };
    
    checkIfSaved();
  }, [id, isAdmin]);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    toast({
      title: isLiked ? "Removed like" : "Added like",
      description: isLiked ? "You've removed your like" : "You've liked this hero section",
    });
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isAdmin) {
      setMoodboardDialogOpen(true);
    } else {
      handleSave(e);
    }
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    setSaveCount(prev => isSaved ? prev - 1 : prev + 1);
    
    const adminMoodboard = JSON.parse(localStorage.getItem("adminMoodboard") || "[]");
    
    if (!isSaved) {
      const isAlreadyInMoodboard = adminMoodboard.some((item: any) => item.id === id);
      if (!isAlreadyInMoodboard) {
        const approvedSubmissions = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
        const itemDetails = approvedSubmissions.find((item: any) => item.id === id);
        
        if (itemDetails) {
          adminMoodboard.push(itemDetails);
          localStorage.setItem("adminMoodboard", JSON.stringify(adminMoodboard));
        }
      }
      
      toast({
        title: "Saved to moodboard",
        description: "This hero section has been saved to your moodboard",
      });
    } else {
      const updatedMoodboard = adminMoodboard.filter((item: any) => item.id !== id);
      localStorage.setItem("adminMoodboard", JSON.stringify(updatedMoodboard));
      
      toast({
        title: "Removed from moodboard",
        description: "This hero section has been removed from your moodboard",
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
    if (!moodboardName.trim()) return;
    
    const updatedMoodboards = [...moodboards, moodboardName];
    setMoodboards(updatedMoodboards);
    localStorage.setItem("moodboards", JSON.stringify(updatedMoodboards));
    
    setSelectedMoodboard(moodboardName);
    setMoodboardName("");
    
    if (newMoodboardInputRef.current) {
      newMoodboardInputRef.current.focus();
    }
  };
  
  const handleSaveToMoodboard = () => {
    const moodboardKey = selectedMoodboard || "Default Moodboard";
    
    const allMoodboardItems = JSON.parse(localStorage.getItem("allMoodboardItems") || "{}");
    const currentMoodboardItems = allMoodboardItems[moodboardKey] || [];
    
    const isAlreadyInMoodboard = currentMoodboardItems.some((item: any) => item.id === id);
    
    if (!isAlreadyInMoodboard) {
      const approvedSubmissions = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
      const itemDetails = approvedSubmissions.find((item: any) => item.id === id);
      
      if (itemDetails) {
        const updatedMoodboardItems = [...currentMoodboardItems, itemDetails];
        allMoodboardItems[moodboardKey] = updatedMoodboardItems;
        localStorage.setItem("allMoodboardItems", JSON.stringify(allMoodboardItems));
        
        setIsSaved(true);
        setSaveCount(prev => prev + 1);
        
        toast({
          title: `Saved to "${moodboardKey}"`,
          description: "This hero section has been added to your moodboard",
        });
      }
    }
    
    if (!moodboards.includes(moodboardKey)) {
      const updatedMoodboards = [...moodboards, moodboardKey];
      setMoodboards(updatedMoodboards);
      localStorage.setItem("moodboards", JSON.stringify(updatedMoodboards));
    }
    
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
            {moodboards.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Your Moodboards</h4>
                <div className="flex flex-wrap gap-2">
                  {moodboards.map((name) => (
                    <Button
                      key={name}
                      variant={selectedMoodboard === name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMoodboard(name)}
                      className="text-xs"
                    >
                      {name}
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
                  value={moodboardName}
                  onChange={(e) => setMoodboardName(e.target.value)}
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
            <Button onClick={handleSaveToMoodboard}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroCard;
