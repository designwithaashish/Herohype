
import React, { useEffect, useState } from "react";
import Header from "@/components/herohype/Header";
import { HeroCardProps } from "@/components/gallery/HeroCard";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Curated: React.FC = () => {
  const [curatedItems, setCuratedItems] = useState<HeroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAdmin(session.user.email?.includes("admin") || false);
      }
    };
    
    checkAdmin();

    // Load curated items from Supabase
    const loadCuratedItems = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('status', 'approved')
          .eq('is_curated', true);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform data to match HeroCardProps
          const heroItems: HeroCardProps[] = data.map(item => ({
            id: item.id,
            imageUrl: item.image_url,
            twitterUsername: item.twitter_username,
            categories: item.categories || [],
            likes: 0, // We'll need to count likes separately
            saves: 0, // We'll need to count saves separately
            isCurated: true,
            status: item.status as "approved" | "pending" | "rejected",
            submissionDate: item.created_at
          }));
          
          setCuratedItems(heroItems);
        } else {
          setCuratedItems([]);
        }
      } catch (error) {
        console.error("Error loading curated items:", error);
        setCuratedItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCuratedItems();
  }, []);
  
  const handleToggleCurated = async (id: string, isCurated: boolean) => {
    if (!isAdmin) return;
    
    try {
      // Update the submission in Supabase
      const { error } = await supabase
        .from('submissions')
        .update({ is_curated: isCurated })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update current view
      if (!isCurated) {
        setCuratedItems(prev => prev.filter(item => item.id !== id));
      }
      
      toast({
        title: "Curated status updated",
        description: isCurated ? "Item added to curated collection." : "Item removed from curated collection.",
        className: "bg-[#3F521F] text-white border-0",
      });
    } catch (error: any) {
      toast({
        title: "Error updating curated status",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container-fluid mx-auto py-12 px-[80px]">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold mb-2">Curated Picks</h1>
          <p className="text-gray-600">
            Hand-picked gallery of exceptional hero sections by our expert team
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <p>Loading curated selections...</p>
          </div>
        ) : (
          <>
            {curatedItems.length > 0 ? (
              <GalleryGrid 
                heroes={curatedItems.map(item => ({
                  ...item,
                  showCuratedControls: isAdmin,
                  onToggleCurated: handleToggleCurated
                }))}
                columns={5}
                fullWidth={true}
              />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No curated items yet</h2>
                <p className="text-gray-600 mb-6">
                  Check back soon for our hand-picked collection of exceptional hero sections.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Curated;
