import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qvzshmzffydlceirsulk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2enNobXpmZnlkbGNlaXJzdWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTk0MTYsImV4cCI6MjA3MTA5NTQxNn0.JlK2ekwbMrECDqr28a0oZ-ol4xKYCvjLv4w1XNjVptc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enhanced database schema types
export interface UserSession {
  id?: string;
  session_id: string;
  start_time?: string;
  end_time?: string;
  duration_seconds?: number;
  pages_count?: number;
  is_bounce?: boolean;
  user_agent?: string;
  ip_address?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  screen_resolution?: string;
  language?: string;
  timezone?: string;
  is_test_data?: boolean;
  created_at?: string;
}

export interface PageAnalytics {
  id?: string;
  session_id: string;
  page_path: string;
  page_title?: string;
  visit_time?: string;
  time_on_page?: number;
  scroll_depth?: number;
  clicks_count?: number;
  form_submissions?: number;
  exit_page?: boolean;
  is_test_data?: boolean;
  created_at?: string;
}

export interface UserInteraction {
  id?: string;
  session_id: string;
  interaction_type: string;
  element_id?: string;
  element_class?: string;
  element_text?: string;
  page_path?: string;
  timestamp?: string;
  metadata?: any;
  is_test_data?: boolean;
}

export interface PerformanceMetrics {
  id?: string;
  session_id: string;
  page_path: string;
  load_time?: number;
  dom_ready_time?: number;
  first_paint?: number;
  largest_contentful_paint?: number;
  cumulative_layout_shift?: number;
  first_input_delay?: number;
  connection_type?: string;
  is_test_data?: boolean;
  created_at?: string;
}

export interface ErrorLog {
  id?: string;
  session_id?: string;
  error_type: string;
  error_message?: string;
  stack_trace?: string;
  page_path?: string;
  user_agent?: string;
  timestamp?: string;
  is_test_data?: boolean;
}

// Connection test function
export async function testConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.from('user_sessions').select('count').limit(1);
    if (error) {
      return { success: false, message: `Database error: ${error.message}` };
    }
    return { success: true, message: 'Database connection successful' };
  } catch (err) {
    return { success: false, message: `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}` };
  }
}