
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionsTab from "./tabs/SubmissionsTab";
import UploadsTab from "./tabs/UploadsTab";
import CollectionsTab from "./tabs/CollectionsTab";

interface ProfileTabsProps {
  user?: any;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user }) => {
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([]);
  const [savedHeroes, setSavedHeroes] = useState<string[]>([]);
  
  useEffect(() => {
    // Get the current user if not provided as prop
    const userObj = user || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : null);
    if (!userObj) return;
    
    // Get pending submissions
    const pendingStr = localStorage.getItem("pendingSubmissions");
    const allPending = pendingStr ? JSON.parse(pendingStr) : [];
    
    // Filter to show only the current user's pending submissions
    const userPending = allPending.filter((sub: any) => sub.userId === userObj.id);
    setPendingSubmissions(userPending);
    
    // Get approved submissions
    const approvedStr = localStorage.getItem("approvedSubmissions");
    const allApproved = approvedStr ? JSON.parse(approvedStr) : [];
    
    // Filter to show only the current user's approved submissions
    const userApproved = allApproved.filter((sub: any) => sub.userId === userObj.id);
    setApprovedSubmissions(userApproved);
    
    // Get saved heroes
    const savedStr = localStorage.getItem("savedHeroes");
    const saved = savedStr ? JSON.parse(savedStr) : [];
    setSavedHeroes(saved);
  }, [user]);
  
  return (
    <Tabs defaultValue="submissions" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
        <TabsTrigger value="submissions" className="text-sm">
          Submissions
        </TabsTrigger>
        <TabsTrigger value="uploads" className="text-sm">
          Uploads
        </TabsTrigger>
        <TabsTrigger value="collections" className="text-sm">
          Collections
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="submissions" className="mt-6">
        <SubmissionsTab 
          pendingSubmissions={pendingSubmissions} 
          approvedSubmissions={approvedSubmissions}
        />
      </TabsContent>
      
      <TabsContent value="uploads" className="mt-6">
        <UploadsTab approvedSubmissions={approvedSubmissions} />
      </TabsContent>
      
      <TabsContent value="collections" className="mt-6">
        <CollectionsTab savedHeroes={savedHeroes} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
