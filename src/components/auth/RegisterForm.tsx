
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password || !passwordConfirm) {
      toast({
        title: "Registration failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== passwordConfirm) {
      toast({
        title: "Registration failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock registration process with localStorage
      // In a real app, this would be an API call
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if email already exists
      if (existingUsers.some((user: any) => user.email === email)) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Generate a unique ID for the user
      const userId = `user-${Date.now()}`;
      
      // Create new user object (no random username or avatar)
      const newUser = {
        id: userId,
        email,
        username: username || "",
        createdAt: new Date().toISOString(),
        avatarUrl: "",
      };
      
      // Add new user to existing users
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      
      // Set current user in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: "Welcome to HeroHype!",
      });
      
      // Navigate to homepage after successful registration
      navigate("/");
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details below to create your account
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username (Optional)</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
