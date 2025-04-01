
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LucideProps } from "lucide-react";

// Create a Google icon component
const GoogleIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    <path d="M15.5 8.5L19 12l-3.5 3.5M4 12h15" />
  </svg>
);

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate a unique ID for the user
      const userId = `user_${Date.now()}`;
      
      // Create a minimal user object with blank profile fields
      const user = {
        id: userId,
        email: email,
        role: "user",
      };
      
      // Store the user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      // Create an empty profile for the user
      const emptyProfile = {
        name: "",
        description: "Edit your profile to add a description",
        avatarUrl: "",
        hireLink: ""
      };
      
      // Store the profile data in localStorage
      localStorage.setItem(`profile-${userId}`, JSON.stringify(emptyProfile));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique ID for the user
      const userId = `user_${Date.now()}`;
      
      localStorage.setItem("user", JSON.stringify({ 
        id: userId,
        email: "user@example.com", 
        role: "user",
        provider: "google" 
      }));
      
      // Create an empty profile for the user
      const emptyProfile = {
        name: "",
        description: "Edit your profile to add a description",
        avatarUrl: "",
        hireLink: ""
      };
      
      // Store the profile data in localStorage
      localStorage.setItem(`profile-${userId}`, JSON.stringify(emptyProfile));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created with Google",
      });
      
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Google registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex justify-center">
        <div className="bg-[rgba(183,255,29,1)] border flex items-center gap-[5px] text-[28px] whitespace-nowrap text-center tracking-[-0.69px] leading-[1.1] justify-center px-2.5 py-[5px] border-black border-dashed">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1959439b6d7922b7efdd6200e76d1ae9326c99a2?placeholderIfAbsent=true"
            className="aspect-[0.91] object-contain w-4 self-stretch shrink-0 my-auto"
            alt="Herohype logo icon"
          />
          <div className="self-stretch my-auto">herohype</div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-serif">Sign up to <span className="italic">herohype</span></h2>
        <p className="mt-2 text-sm text-gray-600">
          already a member? <a href="/login" className="text-green-600 hover:underline">sign in now</a>
        </p>
      </div>
      
      <Button 
        onClick={handleGoogleLogin}
        variant="outline" 
        className="w-full border border-gray-300 py-6" 
        disabled={isLoading}
      >
        <GoogleIcon className="mr-2 h-5 w-5" />
        Sign up with Google
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">or continue with email</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="py-6"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="py-6"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="py-6"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-6 bg-black hover:bg-black/90" 
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
      
      <div className="text-center text-sm text-gray-500">
        <p>
          We collect awesome hero sections to help designers get inspired and motivated to do crazy stuff.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
