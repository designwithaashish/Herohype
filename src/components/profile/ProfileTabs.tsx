
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionsTab from "./tabs/SubmissionsTab";
import CollectionsTab from "./tabs/CollectionsTab";
import UploadsTab from "./tabs/UploadsTab";

interface User {
  id: string;
  email?: string; // Make email optional to match AppUser type
  role?: string;
}

interface ProfileTabsProps {
  user: User;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user }) => {
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([]);
  const [savedHeroes, setSavedHeroes] = useState<any[]>([]);
  
  useEffect(() => {
    // Load user submissions
    const pendingStr = localStorage.getItem("pendingSubmissions");
    const pending = pendingStr ? JSON.parse(pendingStr) : [];
    
    // Filter submissions by user
    const userPendingSubmissions = pending.filter((submission: any) => 
      submission.userId === user.id || submission.createdBy === user.id || submission.userEmail === user.email
    );
    
    setPendingSubmissions(userPendingSubmissions);
    
    // Load approved heroes (published in CMS)
    const approvedStr = localStorage.getItem("approvedSubmissions");
    const approved = approvedStr ? JSON.parse(approvedStr) : [];
    
    // Filter approved items by user
    const userApprovedSubmissions = approved.filter((hero: any) => 
      hero.userId === user.id || hero.submittedBy === user.id || hero.userEmail === user.email
    );
    
    setApprovedSubmissions(userApprovedSubmissions);
    
    // Load saved heroes from user collections
    const userCollectionsStr = localStorage.getItem("userCollections");
    if (userCollectionsStr) {
      try {
        const collections = JSON.parse(userCollectionsStr);
        let allSavedItems: any[] = [];
        
        // Extract all items from all collections
        collections.forEach((collection: any) => {
          if (collection.items && Array.isArray(collection.items)) {
            allSavedItems = [...allSavedItems, ...collection.items];
          }
        });
        
        // Remove duplicates by ID
        const uniqueSavedItems = allSavedItems.filter((item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
        );
        
        setSavedHeroes(uniqueSavedItems);
      } catch (error) {
        console.error("Error loading collections:", error);
        setSavedHeroes([]);
      }
    }
  }, [user]);

  return (
    <Tabs defaultValue="uploads" className="w-full">
      <TabsList className="w-full mb-6 bg-gray-100 p-1 rounded-lg">
        <TabsTrigger value="uploads" className="text-xs py-1 px-2 md:text-sm md:py-1.5 md:px-3">Your Uploads</TabsTrigger>
        <TabsTrigger value="submissions" className="text-xs py-1 px-2 md:text-sm md:py-1.5 md:px-3">Your Submissions</TabsTrigger>
        <TabsTrigger value="collections" className="text-xs py-1 px-2 md:text-sm md:py-1.5 md:px-3">Collections</TabsTrigger>
      </TabsList>
      
      <TabsContent value="uploads">
        <UploadsTab approvedSubmissions={approvedSubmissions} />
      </TabsContent>
      
      <TabsContent value="submissions">
        <SubmissionsTab 
          pendingSubmissions={pendingSubmissions} 
          approvedSubmissions={approvedSubmissions} 
        />
      </TabsContent>
      
      <TabsContent value="collections">
        <CollectionsTab savedHeroes={savedHeroes} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
