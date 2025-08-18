-- Drop ALL existing policies first
DROP POLICY IF EXISTS "public_read_sessions" ON user_sessions;
DROP POLICY IF EXISTS "public_insert_sessions" ON user_sessions;
DROP POLICY IF EXISTS "public_update_sessions" ON user_sessions;
DROP POLICY IF EXISTS "public_read_page_analytics" ON page_analytics;
DROP POLICY IF EXISTS "public_insert_page_analytics" ON page_analytics;
DROP POLICY IF EXISTS "public_read_interactions" ON user_interactions;
DROP POLICY IF EXISTS "public_insert_interactions" ON user_interactions;
DROP POLICY IF EXISTS "public_read_performance" ON performance_metrics;
DROP POLICY IF EXISTS "public_insert_performance" ON performance_metrics;
DROP POLICY IF EXISTS "public_read_errors" ON error_logs;
DROP POLICY IF EXISTS "public_insert_errors" ON error_logs;

-- Create lifecycle policies - only show data from last 15 days
CREATE POLICY "lifecycle_sessions" ON user_sessions 
FOR ALL USING (created_at > NOW() - INTERVAL '15 days');

CREATE POLICY "lifecycle_page_analytics" ON page_analytics 
FOR ALL USING (created_at > NOW() - INTERVAL '15 days');

CREATE POLICY "lifecycle_interactions" ON user_interactions 
FOR ALL USING (timestamp > NOW() - INTERVAL '15 days');

CREATE POLICY "lifecycle_performance" ON performance_metrics 
FOR ALL USING (created_at > NOW() - INTERVAL '15 days');

CREATE POLICY "lifecycle_errors" ON error_logs 
FOR ALL USING (timestamp > NOW() - INTERVAL '15 days');