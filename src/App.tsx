
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitHero from "./pages/SubmitHero";
import AdminApproval from "./pages/AdminApproval";
import SearchResults from "./pages/SearchResults";
import MyCollections from "./pages/MyCollections";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Curated from "./pages/Curated";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/curated" element={<Curated />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Make sure we have a proper auth callback route for Google authentication */}
            <Route path="/auth/callback" element={<Login />} />
            <Route path="/submit" element={<SubmitHero />} />
            <Route path="/admin" element={<AdminApproval />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/collections" element={<MyCollections />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
