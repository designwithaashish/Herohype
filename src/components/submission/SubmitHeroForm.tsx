
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SubmitHeroForm: React.FC = () => {
  const [submissionType, setSubmissionType] = useState<"url" | "image">("url");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!twitterUsername) {
      toast({
        title: "Twitter username required",
        description: "Please provide your Twitter username",
        variant: "destructive",
      });
      return;
    }
    
    if (submissionType === "url" && !websiteUrl) {
      toast({
        title: "Website URL required",
        description: "Please provide a website URL",
        variant: "destructive",
      });
      return;
    }
    
    if (submissionType === "image" && !previewImage) {
      toast({
        title: "Image required",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedCategories.length === 0) {
      toast({
        title: "Categories required",
        description: "Please select at least one category",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock submission functionality - would connect to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Submission successful",
        description: "Your hero section has been submitted for approval",
      });
      
      // Reset form
      setWebsiteUrl("");
      setTwitterUsername("");
      setDescription("");
      setSelectedCategories([]);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    "Dark", "Light", "Gradient", "3D", "Bento", "Minimal", "Typography", "Animated"
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Hero Section</h2>
      
      <Tabs defaultValue="url" onValueChange={(value) => setSubmissionType(value as "url" | "image")}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="url">Website URL</TabsTrigger>
          <TabsTrigger value="image">Upload Image</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <TabsContent value="url" className="space-y-4">
            <div>
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll capture a screenshot of the hero section from this URL
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4">
            <div>
              <Label htmlFor="imageUpload">Upload Image</Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="mt-1"
              />
              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-h-40 rounded-md object-contain" 
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
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
                placeholder="yourhandle"
                value={twitterUsername}
                onChange={(e) => setTwitterUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your hero section design..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <Label className="block mb-2">Categories</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  onClick={() => handleCategoryToggle(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Hero Section"}
          </Button>
        </form>
      </Tabs>
    </div>
  );
};

export default SubmitHeroForm;
