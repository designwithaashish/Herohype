
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// In Vite, we use import.meta.env instead of process.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://sthiaeurxejbbcjojpqm.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0aGlhZXVyeGVqYmJjam9qcHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDEwMjEsImV4cCI6MjA1ODk3NzAyMX0.3Uf1-lSALUz8zlP_TRl79rBOBcaWD0z0v_9kh_fJBvE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage // Explicitly set storage
  }
});
