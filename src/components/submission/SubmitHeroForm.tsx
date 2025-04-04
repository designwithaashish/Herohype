
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

// Define props for our custom wrapper component
interface SubmitHeroFormProps {
  userId: string;
}

const SubmitHeroForm: React.FC<SubmitHeroFormProps> = ({ userId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [twitterUsername, setTwitterUsername] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!imageUrl.trim() || !twitterUsername.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert submission into Supabase
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          twitter_username: twitterUsername,
          website_url: websiteUrl,
          image_url: imageUrl,
          categories: ['UI', 'Web'], // Default categories
          status: 'pending'
        });
        
      if (error) throw error;
      
      toast({
        title: "Submission successful",
        description: "Your hero section has been submitted for review."
      });
      
      navigate("/profile");
    } catch (error: any) {
      console.error('Submission error:', error);
      
      toast({
        title: "Submission failed",
        description: error.message || "There was a problem submitting your design. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="twitterUsername">Twitter Username *</Label>
        <Input
          id="twitterUsername"
          placeholder="@username"
          value={twitterUsername}
          onChange={(e) => setTwitterUsername(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL (optional)</Label>
        <Input
          id="websiteUrl"
          placeholder="https://example.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL *</Label>
        <Input
          id="imageUrl"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the hero section"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Hero Section"}
      </Button>
      
      <div>
        <p className="text-sm text-gray-500 italic">
          Your submission will be reviewed by our team before being made public. 
          Thank you for contributing to the HeroHype community!
        </p>
      </div>
    </form>
  );
};

export default SubmitHeroForm;
