import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PendingSubmissionCard from "@/components/admin/PendingSubmissionCard";
import { Submission as PendingSubmission } from "@/components/admin/PendingSubmissionCard";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/herohype/Header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusCircle, Image, Trash2, Edit, Eye, Star } from "lucide-react";

interface Submission extends PendingSubmission {
  userId?: string;
  submittedBy?: string;
  isCurated?: boolean;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1c9a27ca109627531b07f63bf67d7584e234fb6a",
    twitterUsername: "designermark",
    sourceUrl: "https://example.com/hero-section",
    description: "A dark theme gradient hero section with animated elements",
    categories: ["Dark", "Gradient", "Animated"],
    createdAt: "2023-06-15T10:30:00Z",
    status: "pending",
    submissionType: "url"
  },
  {
    id: "2",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/4dcc644b12d8b5262921e7c60355f5cb0e5c7a62",
    twitterUsername: "webdev_sarah",
    description: "Minimal and clean hero section with typography focus",
    categories: ["Light", "Minimal", "Typography"],
    createdAt: "2023-06-14T14:45:00Z",
    status: "pending",
    submissionType: "image"
  },
  {
    id: "3",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/ca9cd70178b9ef63a5165be05724b3eb93b407cb",
    twitterUsername: "creative_jake",
    sourceUrl: "https://another-example.com",
    description: "3D elements with a bento-style layout",
    categories: ["3D", "Bento"],
    createdAt: "2023-06-13T09:15:00Z",
    status: "pending",
    submissionType: "url"
  },
];

const formSchema = z.object({
  imageFile: z.any().refine((file) => file instanceof File, "Please upload an image"),
  twitterUsername: z.string().min(1, "Twitter username is required"),
  description: z.string().optional(),
  categories: z.array(z.string()).min(1, "Select at least one category")
});

const allCategories = [
  "Dark", "Light", "Gradient", "3D", "Bento", "Minimal", 
  "Typography", "Animated", "Illustrated", "Crypto"
];

const AdminApproval: React.FC = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>([]);
  const [approvedSubmissions, setApprovedSubmissions] = useState<Submission[]>([]);
  const [rejectedSubmissions, setRejectedSubmissions] = useState<Submission[]>([]);
  const [curatedSubmissions, setCuratedSubmissions] = useState<Submission[]>([]);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitterUsername: "",
      description: "",
      categories: []
    }
  });
  
  useEffect(() => {
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
    
    const storedPending = localStorage.getItem("pendingSubmissions");
    const storedApproved = localStorage.getItem("approvedSubmissions");
    const storedRejected = localStorage.getItem("rejectedSubmissions");
    const storedCurated = localStorage.getItem("curatedSubmissions");
    
    if (storedPending) setPendingSubmissions(JSON.parse(storedPending));
    if (storedApproved) setApprovedSubmissions(JSON.parse(storedApproved));
    if (storedRejected) setRejectedSubmissions(JSON.parse(storedRejected));
    if (storedCurated) setCuratedSubmissions(JSON.parse(storedCurated));
    else {
      if (storedApproved) {
        const approved = JSON.parse(storedApproved);
        const adminUploaded = approved.filter((s: Submission) => s.id.startsWith('manual-'));
        setCuratedSubmissions(adminUploaded);
        localStorage.setItem("curatedSubmissions", JSON.stringify(adminUploaded));
      }
    }
  }, [navigate, toast]);
  
  useEffect(() => {
    localStorage.setItem("pendingSubmissions", JSON.stringify(pendingSubmissions));
    localStorage.setItem("approvedSubmissions", JSON.stringify(approvedSubmissions));
    localStorage.setItem("rejectedSubmissions", JSON.stringify(rejectedSubmissions));
    localStorage.setItem("curatedSubmissions", JSON.stringify(curatedSubmissions));
  }, [pendingSubmissions, approvedSubmissions, rejectedSubmissions, curatedSubmissions]);
  
  const handleApprove = (id: string, categories: string[]) => {
    const submission = pendingSubmissions.find(s => s.id === id);
    if (submission) {
      const approvedSubmission = {
        ...submission,
        categories,
        submissionDate: new Date().toISOString(),
        status: "approved" as const,
        likes: 0,
        saves: 0
      };
      
      setApprovedSubmissions(prev => [...prev, approvedSubmission]);
      setPendingSubmissions(prev => prev.filter(s => s.id !== id));
      
      const currentApproved = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
      localStorage.setItem("approvedSubmissions", JSON.stringify([...currentApproved, approvedSubmission]));
      
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImage(file);
      form.setValue("imageFile", file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const generateRandomAvatar = () => {
    const avatarUrls = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=150&h=150",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=150&h=150",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=150",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&h=150",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&h=150"
    ];
    
    const randomIndex = Math.floor(Math.random() * avatarUrls.length);
    return avatarUrls[randomIndex];
  };

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    const newSubmission: Submission = {
      id: `manual-${Date.now()}`,
      imageUrl: imagePreview || "",
      twitterUsername: data.twitterUsername.startsWith('@') 
        ? data.twitterUsername.substring(1) 
        : data.twitterUsername,
      submissionType: "image",
      description: data.description,
      categories: data.categories,
      createdAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      status: "approved",
      likes: 0,
      saves: 0
    };

    if (editingSubmission) {
      if (editingSubmission.id.startsWith('manual-')) {
        setCuratedSubmissions(prev => 
          prev.map(sub => sub.id === editingSubmission.id ? newSubmission : sub)
        );
      }
      
      setApprovedSubmissions(prev => 
        prev.map(sub => sub.id === editingSubmission.id ? newSubmission : sub)
      );
      
      const currentApproved = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
      localStorage.setItem("approvedSubmissions", JSON.stringify(
        currentApproved.map((sub: Submission) => sub.id === editingSubmission.id ? newSubmission : sub)
      ));
      
      setEditingSubmission(null);
      toast({
        title: "Hero section updated",
        description: "The hero section has been successfully updated",
      });
    } else {
      setApprovedSubmissions(prev => [...prev, newSubmission]);
      setCuratedSubmissions(prev => [...prev, newSubmission]);
      
      const currentApproved = JSON.parse(localStorage.getItem("approvedSubmissions") || "[]");
      localStorage.setItem("approvedSubmissions", JSON.stringify([...currentApproved, newSubmission]));
      
      const currentCurated = JSON.parse(localStorage.getItem("curatedSubmissions") || "[]");
      localStorage.setItem("curatedSubmissions", JSON.stringify([...currentCurated, newSubmission]));
      
      toast({
        title: "Hero section added",
        description: "The hero section has been successfully added to the gallery",
      });
    }
    
    setConfirmDialogOpen(false);
    form.reset();
    setUploadImage(null);
    setImagePreview(null);
    setSelectedCategories([]);
  };

  const handleSubmit = form.handleSubmit((data) => {
    setConfirmDialogOpen(true);
  });

  const handleDeleteApproved = (id: string) => {
    if (window.confirm("Are you sure you want to delete this hero section?")) {
      setApprovedSubmissions(prev => prev.filter(s => s.id !== id));
      
      setCuratedSubmissions(prev => prev.filter(s => s.id !== id));
      
      toast({
        title: "Hero section deleted",
        description: "The hero section has been removed from the gallery",
      });
    }
  };

  const handleEditApproved = (submission: Submission) => {
    setEditingSubmission(submission);
    
    setImagePreview(submission.imageUrl);
    
    form.reset({
      twitterUsername: submission.twitterUsername,
      description: submission.description || "",
      categories: submission.categories
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      setPendingSubmissions([]);
      setApprovedSubmissions([]);
      setRejectedSubmissions([]);
      setCuratedSubmissions([]);
      localStorage.removeItem("pendingSubmissions");
      localStorage.removeItem("approvedSubmissions");
      localStorage.removeItem("rejectedSubmissions");
      localStorage.removeItem("curatedSubmissions");
      toast({
        title: "Data cleared",
        description: "All submission data has been deleted",
      });
    }
  };

  const handleCurate = (id: string) => {
    const submission = approvedSubmissions.find(s => s.id === id);
    if (submission) {
      const updatedApprovedSubmissions = approvedSubmissions.map(item => {
        if (item.id === id) {
          return { ...item, isCurated: !item.isCurated };
        }
        return item;
      });
      
      setApprovedSubmissions(updatedApprovedSubmissions);
      localStorage.setItem("approvedSubmissions", JSON.stringify(updatedApprovedSubmissions));
      
      const isCurated = submission.isCurated;
      
      toast({
        title: isCurated ? "Removed from curated" : "Added to curated",
        description: isCurated 
          ? `@${submission.twitterUsername}'s hero section removed from curated collection`
          : `@${submission.twitterUsername}'s hero section added to curated collection`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">HeroHype CMS</h1>
            <p className="text-gray-600">Manage your hero section gallery</p>
          </div>
          <Button variant="destructive" onClick={handleClearAll} className="whitespace-nowrap">
            Clear All Data
          </Button>
        </div>
        
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="add" className="flex items-center gap-1">
              <PlusCircle size={16} />
              Add New Hero
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              Pending ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-1">
              Gallery ({approvedSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="curated" className="flex items-center gap-1">
              Curated ({curatedSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-1">
              Rejected ({rejectedSubmissions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>{editingSubmission ? "Edit Hero Section" : "Add New Hero Section"}</CardTitle>
                <CardDescription>
                  {editingSubmission 
                    ? "Edit the details of this hero section" 
                    : "Upload an image to add a new hero section to your gallery"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="twitterUsername"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter Username</FormLabel>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                  @
                                </span>
                                <FormControl>
                                  <Input
                                    placeholder="username"
                                    className="rounded-l-none"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="imageUpload">Upload Image</Label>
                        <Input 
                          id="imageUpload" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange}
                        />
                        <FormMessage>{form.formState.errors.imageFile?.message}</FormMessage>
                      </div>
                      
                      {imagePreview && (
                        <div className="border rounded-md p-2">
                          <p className="text-sm font-medium mb-2">Preview:</p>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="max-h-60 rounded-md object-contain" 
                          />
                        </div>
                      )}
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of the hero section" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="categories"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Categories</FormLabel>
                              <FormDescription>
                                Select at least one category
                              </FormDescription>
                            </div>
                            <div className="flex flex-wrap gap-2 border p-3 rounded-md">
                              {allCategories.map((category) => (
                                <FormField
                                  key={category}
                                  control={form.control}
                                  name="categories"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={category}
                                        className="flex items-center space-x-2 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(category)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, category])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== category
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="cursor-pointer">
                                          {category}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <CardFooter className="flex justify-between px-0">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          form.reset();
                          setEditingSubmission(null);
                          setImagePreview(null);
                          setUploadImage(null);
                        }}
                      >
                        Reset
                      </Button>
                      <Button type="submit">
                        {editingSubmission ? "Update Hero Section" : "Add to Gallery"}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-md shadow">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Image size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No pending submissions</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  When users submit hero sections, they will appear here for your review.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingSubmissions.map((submission) => (
                  <PendingSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    availableCategories={allCategories}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            {approvedSubmissions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-md shadow">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Image size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your gallery is empty</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Add hero sections using the "Add New" tab or approve pending submissions.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Preview</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Added On</TableHead>
                      <TableHead className="text-center">Stats</TableHead>
                      <TableHead className="w-36 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img 
                              src={submission.imageUrl} 
                              alt={`Hero by @${submission.twitterUsername}`}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">@{submission.twitterUsername}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {submission.categories.map((category) => (
                              <Badge key={category} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(submission.submissionDate || submission.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-4">
                            <span className="text-sm">♥ {submission.likes || 0}</span>
                            <span className="text-sm">⭐ {submission.saves || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCurate(submission.id)}
                              className={submission.isCurated ? "text-yellow-500" : ""}
                            >
                              <Star 
                                size={16} 
                                className={submission.isCurated ? "fill-yellow-400 text-yellow-500" : ""}
                              />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditApproved(submission)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteApproved(submission.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            {rejectedSubmissions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-md shadow">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Image size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No rejected submissions</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Submissions you reject will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rejectedSubmissions.map((submission) => (
                  <Card key={submission.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <img 
                        src={submission.imageUrl} 
                        alt={`Hero by @${submission.twitterUsername}`}
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium">@{submission.twitterUsername}</p>
                      <p className="text-sm text-red-500">Rejected on {new Date(submission.createdAt).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Upload</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to add this hero section to the gallery?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => form.getValues() && handleFormSubmit(form.getValues())}>
                Confirm Upload
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminApproval;
