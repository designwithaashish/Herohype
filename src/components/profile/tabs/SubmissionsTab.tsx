
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SubmissionsTabProps {
  pendingSubmissions: any[];
  approvedSubmissions: any[];
}

const SubmissionsTab: React.FC<SubmissionsTabProps> = ({ pendingSubmissions, approvedSubmissions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  if (pendingSubmissions.length === 0 && approvedSubmissions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No submissions yet</h3>
        <p className="text-gray-500 mb-6">
          You haven't submitted any hero sections yet.
        </p>
        <a href="/submit" className="text-blue-600 hover:underline">
          Submit your first hero section
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Submission History</h2>
      
      <div className="flex flex-col gap-4">
        {[...pendingSubmissions, ...approvedSubmissions]
          .sort((a, b) => new Date(b.createdAt || b.submissionDate).getTime() - new Date(a.createdAt || a.submissionDate).getTime())
          .map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-40 sm:h-auto bg-gray-100 relative flex-shrink-0">
                  <img 
                    src={submission.imageUrl} 
                    alt={`Submission by ${submission.twitterUsername}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">@{submission.twitterUsername}</h3>
                        <Badge 
                          className={`${
                            submission.status === 'approved' ? 'bg-green-500' : 
                            submission.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                        >
                          {submission.status === 'approved' ? 'Approved' : 
                          submission.status === 'rejected' ? 'Rejected' : 'Pending'}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(submission.createdAt || submission.submissionDate)}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">
                        {submission.categories?.join(", ") || "No categories"}
                      </span>
                    </div>
                    
                    {submission.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{submission.description}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      {submission.likes && (
                        <span className="text-xs text-gray-500">
                          {submission.likes} likes
                        </span>
                      )}
                      {submission.saves && (
                        <span className="text-xs text-gray-500">
                          {submission.saves} saves
                        </span>
                      )}
                    </div>
                    
                    {submission.status === 'approved' && (
                      <span className="text-xs text-green-600 font-medium">
                        Live in Gallery
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SubmissionsTab;
