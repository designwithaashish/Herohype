
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PendingSubmissionCard, { Submission } from "@/components/admin/PendingSubmissionCard";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/herohype/Header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockSubmissions: Submission[] = [
  {
    id: "1",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1c9a27ca109627531b07f63bf67d7584e234fb6a",
    twitterUsername: "designermark",
    submissionType: "url",
    sourceUrl: "https://example.com/hero-section",
    description: "A dark theme gradient hero section with animated elements",
    categories: ["Dark", "Gradient", "Animated"],
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/4dcc644b12d8b5262921e7c60355f5cb0e5c7a62",
    twitterUsername: "webdev_sarah",
    submissionType: "image",
    description: "Minimal and clean hero section with typography focus",
    categories: ["Light", "Minimal", "Typography"],
    createdAt: "2023-06-14T14:45:00Z",
  },
  {
    id: "3",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ca9cd70178b9ef63a5165be05724b3eb93b407cb",
    twitterUsername: "creative_jake",
    submissionType: "url",
    sourceUrl: "https://another-example.com",
    description: "3D elements with a bento-style layout",
    categories: ["3D", "Bento"],
    createdAt: "2023-06-13T09:15:00Z",
  },
];

const AdminApproval: React.FC = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>(mockSubmissions);
  const [approvedSubmissions, setApprovedSubmissions] = useState<Submission[]>([]);
  const [rejectedSubmissions, setRejectedSubmissions] = useState<Submission[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in and is an admin
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast({
        title: "Authentication required",
        description: "Please log in to access admin features",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [navigate, toast]);
  
  const handleApprove = (id: string) => {
    const submission = pendingSubmissions.find(s => s.id === id);
    if (submission) {
      setApprovedSubmissions(prev => [...prev, submission]);
      setPendingSubmissions(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Submission approved",
        description: `@${submission.twitterUsername}'s hero section has been approved`,
      });
    }
  };
  
  const handleReject = (id: string) => {
    const submission = pendingSubmissions.find(s => s.id === id);
    if (submission) {
      setRejectedSubmissions(prev => [...prev, submission]);
      setPendingSubmissions(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Submission rejected",
        description: `@${submission.twitterUsername}'s hero section has been rejected`,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedSubmissions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending submissions to review
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingSubmissions.map((submission) => (
                  <PendingSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            {approvedSubmissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No approved submissions yet
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedSubmissions.map((submission) => (
                  <div key={submission.id} className="bg-white rounded-lg shadow p-4">
                    <img 
                      src={submission.imageUrl} 
                      alt={`Hero by @${submission.twitterUsername}`}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <p className="font-medium">@{submission.twitterUsername}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {submission.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            {rejectedSubmissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No rejected submissions
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedSubmissions.map((submission) => (
                  <div key={submission.id} className="bg-white rounded-lg shadow p-4">
                    <img 
                      src={submission.imageUrl} 
                      alt={`Hero by @${submission.twitterUsername}`}
                      className="w-full h-40 object-cover rounded-md mb-3 opacity-50"
                    />
                    <p className="font-medium">@{submission.twitterUsername}</p>
                    <p className="text-sm text-red-500">Rejected</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminApproval;
