-- Check if lifecycle policies are applied
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('user_sessions', 'page_analytics', 'user_interactions', 'performance_metrics', 'error_logs')
ORDER BY tablename, policyname;

-- Test the policy by checking data visibility
-- This should only show data from last 15 days
SELECT 
  'user_sessions' as table_name,
  COUNT(*) as total_visible_records,
  MIN(created_at) as oldest_visible,
  MAX(created_at) as newest_visible
FROM user_sessions
UNION ALL
SELECT 
  'page_analytics',
  COUNT(*),
  MIN(created_at),
  MAX(created_at)
FROM page_analytics
UNION ALL
SELECT 
  'user_interactions',
  COUNT(*),
  MIN(timestamp),
  MAX(timestamp)
FROM user_interactions;

-- Check if old data exists but is hidden (run as superuser)
-- This bypasses RLS and shows actual data count
SELECT 
  'user_sessions' as table_name,
  COUNT(*) as actual_total_records
FROM user_sessions
WHERE created_at < NOW() - INTERVAL '15 days';