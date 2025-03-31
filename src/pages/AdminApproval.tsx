import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PendingSubmissionCard, { Submission } from "@/components/admin/PendingSubmissionCard";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/herohype/Header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    status: "pending"
  },
  {
    id: "2",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/4dcc644b12d8b5262921e7c60355f5cb0e5c7a62",
    twitterUsername: "webdev_sarah",
    submissionType: "image",
    description: "Minimal and clean hero section with typography focus",
    categories: ["Light", "Minimal", "Typography"],
    createdAt: "2023-06-14T14:45:00Z",
    status: "pending"
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
    status: "pending"
  },
];

// All available categories for assignments
const allCategories = [
  "Dark", "Light", "Gradient", "3D", "Bento", "Minimal", 
  "Typography", "Animated", "Illustrated", "Crypto"
];

const AdminApproval: React.FC = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>(mockSubmissions);
  const [approvedSubmissions, setApprovedSubmissions] = useState<Submission[]>([]);
  const [rejectedSubmissions, setRejectedSubmissions] = useState<Submission[]>([]);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [twitterUsername, setTwitterUsername] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
      // Add current date as submission date
      const approvedSubmission = {
        ...submission,
        submissionDate: new Date().toISOString(),
        status: "approved" as const,
        likes: 0,
        saves: 0
      };
      
      setApprovedSubmissions(prev => [...prev, approvedSubmission]);
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
      const rejectedSubmission = {
        ...submission,
        status: "rejected" as const
      };
      setRejectedSubmissions(prev => [...prev, rejectedSubmission]);
      setPendingSubmissions(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Submission rejected",
        description: `@${submission.twitterUsername}'s hero section has been rejected`,
      });
    }
  };

  const handleCategoryToggle = (submissionId: string, category: string) => {
    // Toggle category for pending submission
    setPendingSubmissions(prev => 
      prev.map(submission => {
        if (submission.id === submissionId) {
          const updatedCategories = submission.categories.includes(category)
            ? submission.categories.filter(c => c !== category)
            : [...submission.categories, category];
          
          return { ...submission, categories: updatedCategories };
        }
        return submission;
      })
    );
  };

  const handleClearAll = () => {
    // Confirm with the user before clearing
    if (window.confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      setPendingSubmissions([]);
      setApprovedSubmissions([]);
      setRejectedSubmissions([]);
      toast({
        title: "Data cleared",
        description: "All submission data has been deleted",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelectToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleManualSubmission = () => {
    if (!uploadImage || !twitterUsername) {
      toast({
        title: "Missing information",
        description: "Please provide an image and Twitter username",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would upload the image to a storage service
    // For now, we'll use the image preview URL
    const newSubmission: Submission = {
      id: `manual-${Date.now()}`,
      imageUrl: imagePreview || '',
      twitterUsername: twitterUsername.startsWith('@') ? twitterUsername.substring(1) : twitterUsername,
      submissionType: "image",
      categories: selectedCategories,
      createdAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      status: "approved",
      likes: 0,
      saves: 0
    };

    setApprovedSubmissions(prev => [...prev, newSubmission]);
    
    // Reset form
    setUploadImage(null);
    setImagePreview(null);
    setTwitterUsername("");
    setSelectedCategories([]);
    
    toast({
      title: "Image added",
      description: "The image has been successfully added to the gallery",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-3">Admin Dashboard</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Manage hero section submissions</p>
          <Button variant="destructive" onClick={handleClearAll}>
            Clear All Data
          </Button>
        </div>
        
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="add">
              Add New Manually
            </TabsTrigger>
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
          
          <TabsContent value="add" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Hero Section</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <Input 
                    id="imageUpload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="mt-1"
                  />
                  
                  {imagePreview && (
                    <div className="mt-4 border rounded-md p-2">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-60 rounded-md object-contain" 
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="twitterUsername">Twitter Username</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      @
                    </span>
                    <Input
                      id="twitterUsername"
                      type="text"
                      className="rounded-l-none"
                      placeholder="username"
                      value={twitterUsername}
                      onChange={(e) => setTwitterUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Select Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleCategorySelectToggle(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleManualSubmission}
                  className="w-full mt-4"
                >
                  Add to Gallery
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending submissions to review
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="bg-white rounded-lg shadow p-4">
                    <PendingSubmissionCard
                      submission={submission}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                    <div className="mt-4">
                      <p className="font-medium mb-2">Assign Categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {allCategories.map((category) => (
                          <Badge
                            key={category}
                            variant={submission.categories.includes(category) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleCategoryToggle(submission.id, category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
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
                    <p className="text-sm text-gray-500 mb-2">
                      Approved: {new Date(submission.submissionDate || submission.createdAt).toLocaleDateString()}
                    </p>
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
