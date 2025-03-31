
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...pendingSubmissions, ...approvedSubmissions]
          .sort((a, b) => new Date(b.createdAt || b.submissionDate).getTime() - new Date(a.createdAt || a.submissionDate).getTime())
          .map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={submission.imageUrl} 
                  alt={`Submission by ${submission.twitterUsername}`}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    submission.status === 'approved' ? 'bg-green-500' : 
                    submission.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                >
                  {submission.status === 'approved' ? 'Approved' : 
                   submission.status === 'rejected' ? 'Rejected' : 'Pending'}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between">
                  <span>@{submission.twitterUsername}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(submission.createdAt || submission.submissionDate)}
                  </span>
                </CardTitle>
                <CardDescription>
                  {submission.categories?.join(", ") || "No categories"}
                </CardDescription>
              </CardHeader>
              
              {submission.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-2">{submission.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SubmissionsTab;
