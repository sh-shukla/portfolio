import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qvzshmzffydlceirsulk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2enNobXpmZnlkbGNlaXJzdWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTk0MTYsImV4cCI6MjA3MTA5NTQxNn0.JlK2ekwbMrECDqr28a0oZ-ol4xKYCvjLv4w1XNjVptc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export interface VisitorRecord {
  id?: string;
  timestamp: number;
  user_agent: string;
  referrer: string;
  location: string;
  screen_resolution: string;
  language: string;
  timezone: string;
  session_id: string;
  ip?: string;
  country?: string;
  city?: string;
  device: string;
  os: string;
  browser: string;
  visit_duration?: number;
  pages_visited: string[];
  entry_page: string;
  exit_page?: string;
  created_at?: string;
}

export interface PageViewRecord {
  id?: string;
  visitor_id: string;
  page: string;
  timestamp: number;
  time_spent?: number;
  created_at?: string;
}