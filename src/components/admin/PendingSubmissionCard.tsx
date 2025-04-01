
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

export interface Submission {
  id: string;
  imageUrl: string;
  twitterUsername: string;
  submissionType: "url" | "image";
  sourceUrl?: string;
  description?: string;
  categories: string[];
  createdAt: string;
  submissionDate?: string;
  status: "pending" | "approved" | "rejected";
  likes?: number;
  saves?: number;
}

interface PendingSubmissionCardProps {
  submission: Submission;
  onApprove: (id: string, categories: string[]) => void;
  onReject: (id: string) => void;
  availableCategories: string[];
}

const PendingSubmissionCard: React.FC<PendingSubmissionCardProps> = ({
  submission,
  onApprove,
  onReject,
  availableCategories,
}) => {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(submission.categories || []);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Check if the image URL is valid when the component mounts
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = submission.imageUrl;
    
    // Log for debugging
    console.log("Rendering pending submission:", submission.id, submission.imageUrl);
  }, [submission.imageUrl, submission.id]);
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleApproveSubmit = () => {
    onApprove(submission.id, selectedCategories);
    setIsApproveDialogOpen(false);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <div className="relative aspect-video w-full mb-4 bg-gray-100 rounded-md overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <p className="text-sm text-gray-500">Image failed to load</p>
              </div>
            )}
            
            {(imageLoaded || !imageError) && (
              <img
                src={submission.imageUrl}
                alt="Hero section submission"
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">@{submission.twitterUsername}</h3>
              <span className="text-xs text-gray-500">
                {new Date(submission.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {submission.sourceUrl && (
              <p className="text-sm text-blue-600 truncate group flex items-center">
                <a href={submission.sourceUrl} target="_blank" rel="noopener noreferrer" className="truncate flex-grow">
                  {submission.sourceUrl}
                </a>
                <ExternalLink size={16} className="flex-shrink-0 ml-1" />
              </p>
            )}
            
            {submission.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{submission.description}</p>
            )}
            
            <div className="flex flex-wrap gap-1 mt-2">
              {submission.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            onClick={() => setIsApproveDialogOpen(true)} 
            className="flex-1"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button 
            onClick={() => onReject(submission.id)} 
            variant="outline" 
            className="flex-1"
            size="sm"
          >
            <XCircle className="w-4 h-4 mr-1" /> Reject
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Submission</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium mb-2">Assign Categories:</h3>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
              {availableCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button 
              onClick={handleApproveSubmit}
              disabled={selectedCategories.length === 0}
            >
              Approve & Save
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsApproveDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingSubmissionCard;
