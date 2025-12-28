import { createClient } from '@supabase/supabase-js';

// Încercăm să citim din variabilele de mediu, iar dacă sunt undefined, folosim valorile tale direct
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ibmmewyhdctqqphuadrl.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibW1ld3loZGN0cXFwaHVhZHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NDk2NjMsImV4cCI6MjA3ODMyNTY2M30.0Nb1ab0GKNHqwv_NL6A0H58cWe_BPnS7pusAlvAsGK8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);