-- Auto cleanup trigger - runs on every 50th insert
CREATE OR REPLACE FUNCTION auto_cleanup_old_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Only run cleanup every 50 inserts to avoid performance issues
  IF (NEW.id::text)::bigint % 50 = 0 THEN
    -- Delete data older than 15 days
    DELETE FROM user_interactions WHERE timestamp < NOW() - INTERVAL '15 days';
    DELETE FROM page_analytics WHERE created_at < NOW() - INTERVAL '15 days';
    DELETE FROM performance_metrics WHERE created_at < NOW() - INTERVAL '15 days';
    DELETE FROM error_logs WHERE timestamp < NOW() - INTERVAL '15 days';
    DELETE FROM user_sessions WHERE created_at < NOW() - INTERVAL '15 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on user_sessions table
DROP TRIGGER IF EXISTS cleanup_trigger ON user_sessions;
CREATE TRIGGER cleanup_trigger
  AFTER INSERT ON user_sessions
  FOR EACH ROW EXECUTE FUNCTION auto_cleanup_old_data();