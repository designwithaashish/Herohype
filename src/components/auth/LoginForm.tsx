
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Google } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock login functionality - would connect to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store some user info in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify({ email, role: email.includes("admin") ? "admin" : "user" }));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Mock Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("user", JSON.stringify({ 
        email: "user@example.com", 
        role: "user",
        provider: "google" 
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Please try again later.",
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
        <h2 className="text-4xl font-serif">Sign in to <span className="italic">herohype</span></h2>
        <p className="mt-2 text-sm text-gray-600">
          not a member? <a href="/register" className="text-green-600 hover:underline">sign up now</a>
        </p>
      </div>
      
      <Button 
        onClick={handleGoogleLogin}
        variant="outline" 
        className="w-full border border-gray-300 py-6" 
        disabled={isLoading}
      >
        <Google className="mr-2 h-5 w-5" />
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
        
        <Button 
          type="submit" 
          className="w-full py-6 bg-black hover:bg-black/90" 
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
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

export default LoginForm;
