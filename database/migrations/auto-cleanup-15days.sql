-- Auto cleanup function to delete data older than 15 days
-- This function will be called by a scheduled job

CREATE OR REPLACE FUNCTION cleanup_old_analytics_data()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete old user interactions (older than 15 days)
  DELETE FROM user_interactions 
  WHERE timestamp < NOW() - INTERVAL '15 days';
  
  -- Delete old page analytics (older than 15 days)
  DELETE FROM page_analytics 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  -- Delete old performance metrics (older than 15 days)
  DELETE FROM performance_metrics 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  -- Delete old error logs (older than 15 days)
  DELETE FROM error_logs 
  WHERE timestamp < NOW() - INTERVAL '15 days';
  
  -- Delete old user sessions (older than 15 days)
  -- This should be done last due to foreign key constraints
  DELETE FROM user_sessions 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  -- Log the cleanup
  RAISE NOTICE 'Analytics data cleanup completed for data older than 15 days';
END;
$$;

-- Create a scheduled job using pg_cron extension (if available)
-- Note: pg_cron needs to be enabled by your Supabase admin
-- Run cleanup daily at 2 AM UTC
SELECT cron.schedule(
  'cleanup-analytics-data',
  '0 2 * * *',
  'SELECT cleanup_old_analytics_data();'
);

-- Alternative: Create a policy-based approach using RLS
-- This will automatically filter out old data from queries
-- Uncomment the following if you prefer this approach:

/*
-- Drop existing policies
DROP POLICY IF EXISTS "public_read_sessions" ON user_sessions;
DROP POLICY IF EXISTS "public_read_page_analytics" ON page_analytics;
DROP POLICY IF EXISTS "public_read_interactions" ON user_interactions;
DROP POLICY IF EXISTS "public_read_performance" ON performance_metrics;
DROP POLICY IF EXISTS "public_read_errors" ON error_logs;

-- Create new policies that only show data from last 15 days
CREATE POLICY "public_read_sessions_15days" ON user_sessions 
FOR SELECT USING (created_at > NOW() - INTERVAL '15 days');

CREATE POLICY "public_read_page_analytics_15days" ON page_analytics 
FOR SELECT USING (created_at > NOW() - INTERVAL '15 days');

CREATE POLICY "public_read_interactions_15days" ON user_interactions 
FOR SELECT USING (timestamp > NOW() - INTERVAL '15 days');

CREATE POLICY "public_read_performance_15days" ON performance_metrics 
FOR SELECT USING (created_at > NOW() - INTERVAL '15 days');

CREATE POLICY "public_read_errors_15days" ON error_logs 
FOR SELECT USING (timestamp > NOW() - INTERVAL '15 days');
*/