
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionsTab from "./tabs/SubmissionsTab";
import CollectionsTab from "./tabs/CollectionsTab";
import UploadsTab from "./tabs/UploadsTab";

interface ProfileTabsProps {
  user: any;
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
    const approvedStr = localStorage.getItem("approvedHeroes");
    const approved = approvedStr ? JSON.parse(approvedStr) : [];
    
    // Filter approved items by user
    const userApprovedSubmissions = approved.filter((hero: any) => 
      hero.userId === user.id || hero.submittedBy === user.id || hero.userEmail === user.email
    );
    
    setApprovedSubmissions(userApprovedSubmissions);
    
    // Load saved heroes
    const savedStr = localStorage.getItem("savedHeroes") || "[]";
    const savedIds = JSON.parse(savedStr);
    
    if (savedIds.length > 0 && approved.length > 0) {
      const savedItems = approved.filter((hero: any) => savedIds.includes(hero.id));
      setSavedHeroes(savedItems);
    }
  }, [user]);

  return (
    <Tabs defaultValue="submissions" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="submissions" className="flex-1">Your Submissions</TabsTrigger>
        <TabsTrigger value="collections" className="flex-1">Collections</TabsTrigger>
        <TabsTrigger value="uploads" className="flex-1">Uploads</TabsTrigger>
      </TabsList>
      
      <TabsContent value="submissions">
        <SubmissionsTab 
          pendingSubmissions={pendingSubmissions} 
          approvedSubmissions={approvedSubmissions} 
        />
      </TabsContent>
      
      <TabsContent value="collections">
        <CollectionsTab savedHeroes={savedHeroes} />
      </TabsContent>
      
      <TabsContent value="uploads">
        <UploadsTab approvedSubmissions={approvedSubmissions} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
