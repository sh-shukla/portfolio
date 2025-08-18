-- Auto-cleanup function to delete data older than 15 days
CREATE OR REPLACE FUNCTION cleanup_old_analytics_data()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete old user sessions (cascades to related tables)
  DELETE FROM user_sessions 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  -- Delete old visitors
  DELETE FROM visitors 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  -- Delete orphaned records
  DELETE FROM page_views 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  DELETE FROM page_analytics 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  DELETE FROM user_interactions 
  WHERE timestamp < NOW() - INTERVAL '15 days';
  
  DELETE FROM performance_metrics 
  WHERE created_at < NOW() - INTERVAL '15 days';
  
  DELETE FROM error_logs 
  WHERE timestamp < NOW() - INTERVAL '15 days';
END;
$$;

-- Create extension for cron jobs (if not exists)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup to run daily at 2 AM
SELECT cron.schedule('cleanup-analytics', '0 2 * * *', 'SELECT cleanup_old_analytics_data();');