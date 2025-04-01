
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/herohype/Header";
import { Button } from "@/components/ui/button";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useToast } from "@/hooks/use-toast";
import { Grid, PlusCircle, Edit, Trash, X, Check, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Moodboard {
  id: string;
  name: string;
  items: HeroCardProps[];
}

const MyCollections: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
  const [availableItems, setAvailableItems] = useState<HeroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentMoodboard, setCurrentMoodboard] = useState<Moodboard | null>(null);
  const [editingMoodboard, setEditingMoodboard] = useState<Moodboard | null>(null);
  const [newMoodboardName, setNewMoodboardName] = useState("");
  const [selectedItems, setSelectedItems] = useState<HeroCardProps[]>([]);
  
  useEffect(() => {
    // Check if user is logged in and if they are an admin
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setIsAdmin(user.role === "admin");
        
        // Load moodboard items
        loadMoodboards();
        loadAvailableItems();
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      // Not logged in, show public moodboards with empty state
      setIsLoggedIn(false);
      setIsAdmin(false);
      loadMoodboards();
    }
    
    setLoading(false);
  }, [navigate]);
  
  const loadMoodboards = () => {
    try {
      const moodboardsData = localStorage.getItem("userMoodboards");
      if (moodboardsData) {
        const parsedMoodboards = JSON.parse(moodboardsData);
        setMoodboards(parsedMoodboards);
      } else {
        // Initialize with a default moodboard for admins
        if (isAdmin) {
          const defaultMoodboard = {
            id: `moodboard-${Date.now()}`,
            name: "My Moodboard",
            items: []
          };
          setMoodboards([defaultMoodboard]);
          localStorage.setItem("userMoodboards", JSON.stringify([defaultMoodboard]));
        } else {
          setMoodboards([]);
        }
      }
    } catch (error) {
      console.error("Error loading moodboards:", error);
      setMoodboards([]);
    }
  };
  
  const loadAvailableItems = () => {
    // Load all approved items
    try {
      const approvedItemsStr = localStorage.getItem("approvedSubmissions");
      if (approvedItemsStr) {
        const approvedItems = JSON.parse(approvedItemsStr);
        setAvailableItems(approvedItems.filter((item: HeroCardProps) => item.status === "approved"));
      } else {
        setAvailableItems([]);
      }
    } catch (error) {
      console.error("Error loading available items:", error);
      setAvailableItems([]);
    }
  };
  
  const handleCreateMoodboard = () => {
    if (!newMoodboardName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your moodboard",
        variant: "destructive",
      });
      return;
    }
    
    const newMoodboard: Moodboard = {
      id: `moodboard-${Date.now()}`,
      name: newMoodboardName,
      items: []
    };
    
    const updatedMoodboards = [...moodboards, newMoodboard];
    setMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    
    setNewMoodboardName("");
    setShowAddDialog(false);
    
    toast({
      title: "Moodboard created",
      description: `"${newMoodboardName}" moodboard has been created`,
    });
  };
  
  const handleEditMoodboard = () => {
    if (!editingMoodboard) return;
    
    if (!newMoodboardName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your moodboard",
        variant: "destructive",
      });
      return;
    }
    
    const updatedMoodboards = moodboards.map(mb => 
      mb.id === editingMoodboard.id 
        ? { ...mb, name: newMoodboardName }
        : mb
    );
    
    setMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    setEditingMoodboard(null);
    
    toast({
      title: "Moodboard updated",
      description: `Moodboard name changed to "${newMoodboardName}"`,
    });
  };
  
  const startEditMoodboard = (moodboard: Moodboard) => {
    setEditingMoodboard(moodboard);
    setNewMoodboardName(moodboard.name);
  };
  
  const handleDeleteMoodboard = (id: string) => {
    const updatedMoodboards = moodboards.filter(mb => mb.id !== id);
    setMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    
    toast({
      title: "Moodboard deleted",
      description: "Moodboard has been deleted",
    });
  };
  
  const handleOpenMoodboard = (moodboard: Moodboard) => {
    setCurrentMoodboard(moodboard);
  };
  
  const handleBackToList = () => {
    setCurrentMoodboard(null);
  };
  
  const handleAddToMoodboard = (item: HeroCardProps) => {
    if (!currentMoodboard) return;
    
    // Check if the moodboard already contains 10 items
    if (currentMoodboard.items.length >= 10) {
      toast({
        title: "Moodboard full",
        description: "A moodboard can contain a maximum of 10 items",
        variant: "destructive",
      });
      return;
    }
    
    // Check if item is already in the moodboard
    if (currentMoodboard.items.some(existingItem => existingItem.id === item.id)) {
      toast({
        title: "Already in moodboard",
        description: "This item is already in your moodboard",
      });
      return;
    }
    
    const updatedMoodboards = moodboards.map(mb => 
      mb.id === currentMoodboard.id 
        ? { ...mb, items: [...mb.items, item] }
        : mb
    );
    
    setMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    
    // Update current moodboard
    setCurrentMoodboard({
      ...currentMoodboard,
      items: [...currentMoodboard.items, item]
    });
    
    toast({
      title: "Added to moodboard",
      description: "Item has been added to your moodboard",
    });
  };
  
  const handleRemoveFromMoodboard = (id: string) => {
    if (!currentMoodboard) return;
    
    const updatedMoodboards = moodboards.map(mb => 
      mb.id === currentMoodboard.id 
        ? { ...mb, items: mb.items.filter(item => item.id !== id) }
        : mb
    );
    
    setMoodboards(updatedMoodboards);
    localStorage.setItem("userMoodboards", JSON.stringify(updatedMoodboards));
    
    // Update current moodboard
    setCurrentMoodboard({
      ...currentMoodboard,
      items: currentMoodboard.items.filter(item => item.id !== id)
    });
    
    toast({
      title: "Removed from moodboard",
      description: "Item has been removed from your moodboard",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto py-12 px-4">
          <div className="text-center py-16">
            <p>Loading moodboards...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        {currentMoodboard ? (
          // Single moodboard view
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBackToList}>
                  <X className="h-4 w-4 mr-1" /> Back to moodboards
                </Button>
                <h1 className="text-3xl font-playfair font-bold">{currentMoodboard.name}</h1>
                {isAdmin && (
                  <Button variant="ghost" size="sm" onClick={() => startEditMoodboard(currentMoodboard)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {isAdmin && (
                  <div className="text-sm text-gray-500 flex items-center">
                    {currentMoodboard.items.length}/10 items
                  </div>
                )}
              </div>
            </div>
            
            {currentMoodboard.items.length > 0 ? (
              <GalleryGrid 
                heroes={currentMoodboard.items.map(item => ({
                  ...item,
                  showRemoveOption: isAdmin,
                  onRemove: handleRemoveFromMoodboard
                }))}
                columns={4}
              />
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">No items in this moodboard</h2>
                <p className="text-gray-600 mb-6">
                  {isAdmin 
                    ? "Add items to your moodboard from the gallery or from available items below."
                    : "This moodboard is currently empty."}
                </p>
              </div>
            )}
            
            {isAdmin && (
              <div className="mt-12">
                <h2 className="text-xl font-medium mb-4">Add items to moodboard</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {availableItems.slice(0, 24).map((item) => (
                    <div 
                      key={item.id} 
                      className="relative cursor-pointer hover:scale-105 transition-transform border rounded-lg overflow-hidden"
                      onClick={() => handleAddToMoodboard(item)}
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={`Design by ${item.twitterUsername}`} 
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                        <PlusCircle className="text-white" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Moodboards list view
          <div>
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-playfair font-bold mb-2">Moodboards</h1>
                <p className="text-gray-600">
                  Collections of inspiring hero sections
                </p>
              </div>
              {isAdmin && (
                <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
                  <PlusCircle size={16} /> New Moodboard
                </Button>
              )}
            </div>
            
            {moodboards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moodboards.map((moodboard) => (
                  <div 
                    key={moodboard.id} 
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 border-b flex justify-between items-center">
                      {editingMoodboard?.id === moodboard.id ? (
                        <div className="flex-1 flex gap-2">
                          <Input
                            value={newMoodboardName}
                            onChange={e => setNewMoodboardName(e.target.value)}
                            autoFocus
                            className="flex-1"
                          />
                          <Button size="sm" onClick={handleEditMoodboard}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingMoodboard(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <h2 className="text-xl font-medium">{moodboard.name}</h2>
                      )}
                      {isAdmin && editingMoodboard?.id !== moodboard.id && (
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => startEditMoodboard(moodboard)}>
                            <Pencil size={16} className="text-gray-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteMoodboard(moodboard.id)}
                          >
                            <Trash size={16} className="text-gray-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleOpenMoodboard(moodboard)}
                    >
                      {moodboard.items.length > 0 ? (
                        <div className="grid grid-cols-2 gap-1 p-1">
                          {moodboard.items.slice(0, 4).map((item, i) => (
                            <div key={`${moodboard.id}-item-${i}`} className="aspect-[16/9]">
                              <img 
                                src={item.imageUrl} 
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-40 flex items-center justify-center bg-gray-50">
                          <p className="text-gray-400">No items</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex justify-between">
                      <span className="text-sm text-gray-500">
                        {moodboard.items.length} item{moodboard.items.length !== 1 ? 's' : ''}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenMoodboard(moodboard)}
                      >
                        View moodboard
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">No moodboards yet</h2>
                <p className="text-gray-600 mb-6">
                  {isAdmin 
                    ? "Start creating moodboards to organize your inspirations."
                    : "Check back soon for curated moodboards."}
                </p>
                {isAdmin && (
                  <Button onClick={() => setShowAddDialog(true)} variant="default">
                    Create New Moodboard
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Create Moodboard Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Moodboard</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="moodboard-name">Moodboard Name</Label>
            <Input 
              id="moodboard-name"
              value={newMoodboardName}
              onChange={e => setNewMoodboardName(e.target.value)}
              placeholder="Enter a name for your moodboard"
              className="mt-2"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateMoodboard}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCollections;
