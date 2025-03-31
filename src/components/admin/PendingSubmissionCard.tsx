
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

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
}

interface PendingSubmissionCardProps {
  submission: Submission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const PendingSubmissionCard: React.FC<PendingSubmissionCardProps> = ({
  submission,
  onApprove,
  onReject,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 flex-grow">
        <div className="relative aspect-video w-full mb-4 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={submission.imageUrl}
            alt="Hero section submission"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">@{submission.twitterUsername}</h3>
            <span className="text-xs text-gray-500">
              {new Date(submission.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {submission.sourceUrl && (
            <p className="text-sm text-blue-600 truncate">
              <a href={submission.sourceUrl} target="_blank" rel="noopener noreferrer">
                {submission.sourceUrl}
              </a>
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
          onClick={() => onApprove(submission.id)} 
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
  );
};

export default PendingSubmissionCard;
