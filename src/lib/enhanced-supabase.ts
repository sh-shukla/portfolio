// DB DECOMMISSIONED - Supabase integration disabled
/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qvzshmzffydlceirsulk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2enNobXpmZnlkbGNlaXJzdWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTk0MTYsImV4cCI6MjA3MTA5NTQxNn0.JlK2ekwbMrECDqr28a0oZ-ol4xKYCvjLv4w1XNjVptc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserSession { ... }
export interface PageAnalytics { ... }
export interface UserInteraction { ... }
export interface PerformanceMetrics { ... }
export interface ErrorLog { ... }

export async function testConnection(): Promise<{ success: boolean; message: string }> { ... }
*/

// Stub exports so imports don't break
export const supabase = null as any;

export interface UserSession { [key: string]: any; }
export interface PageAnalytics { [key: string]: any; }
export interface UserInteraction { [key: string]: any; }
export interface PerformanceMetrics { [key: string]: any; }
export interface ErrorLog { [key: string]: any; }

export async function testConnection(): Promise<{ success: boolean; message: string }> {
  return { success: false, message: 'DB decommissioned' };
}
