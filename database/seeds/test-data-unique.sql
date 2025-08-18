-- Clear existing test data first
DELETE FROM user_interactions WHERE is_test_data = true;
DELETE FROM page_analytics WHERE is_test_data = true;
DELETE FROM performance_metrics WHERE is_test_data = true;
DELETE FROM error_logs WHERE is_test_data = true;
DELETE FROM user_sessions WHERE is_test_data = true;

-- Insert 100 unique test user sessions
INSERT INTO user_sessions (session_id, user_agent, ip_address, country, city, device_type, browser, os, referrer, screen_resolution, language, timezone, is_test_data, created_at)
SELECT 
  'test_' || extract(epoch from now()) || '_' || generate_series,
  'Mozilla/5.0 (Test Browser)',
  '192.168.1.' || (generate_series % 255 + 1),
  CASE (generate_series % 5)
    WHEN 0 THEN 'United States'
    WHEN 1 THEN 'India'
    WHEN 2 THEN 'United Kingdom'
    WHEN 3 THEN 'Germany'
    ELSE 'Canada'
  END,
  CASE (generate_series % 5)
    WHEN 0 THEN 'New York'
    WHEN 1 THEN 'Mumbai'
    WHEN 2 THEN 'London'
    WHEN 3 THEN 'Berlin'
    ELSE 'Toronto'
  END,
  CASE (generate_series % 3)
    WHEN 0 THEN 'Desktop'
    WHEN 1 THEN 'Mobile'
    ELSE 'Tablet'
  END,
  CASE (generate_series % 4)
    WHEN 0 THEN 'Chrome'
    WHEN 1 THEN 'Firefox'
    WHEN 2 THEN 'Safari'
    ELSE 'Edge'
  END,
  CASE (generate_series % 3)
    WHEN 0 THEN 'Windows'
    WHEN 1 THEN 'macOS'
    ELSE 'Linux'
  END,
  'Direct',
  '1920x1080',
  'en-US',
  'UTC',
  true,
  NOW() - INTERVAL '1 hour' * generate_series
FROM generate_series(1, 100);

-- Get the actual session IDs for foreign key references
WITH session_ids AS (
  SELECT session_id, ROW_NUMBER() OVER (ORDER BY created_at) as rn 
  FROM user_sessions WHERE is_test_data = true
)
-- Insert 150 test page analytics
INSERT INTO page_analytics (session_id, page_path, page_title, time_on_page, is_test_data, created_at)
SELECT 
  s.session_id,
  CASE (generate_series % 6)
    WHEN 0 THEN '/'
    WHEN 1 THEN '/about'
    WHEN 2 THEN '/projects'
    WHEN 3 THEN '/experience'
    WHEN 4 THEN '/contact'
    ELSE '/skills'
  END,
  'Test Page ' || generate_series,
  (generate_series % 300) + 10,
  true,
  NOW() - INTERVAL '30 minutes' * generate_series
FROM generate_series(1, 150), session_ids s
WHERE s.rn = ((generate_series % 100) + 1)
LIMIT 150;

-- Insert 200 test interactions
WITH session_ids AS (
  SELECT session_id, ROW_NUMBER() OVER (ORDER BY created_at) as rn 
  FROM user_sessions WHERE is_test_data = true
)
INSERT INTO user_interactions (session_id, interaction_type, element_id, page_path, is_test_data, timestamp)
SELECT 
  s.session_id,
  CASE (generate_series % 4)
    WHEN 0 THEN 'click'
    WHEN 1 THEN 'scroll'
    WHEN 2 THEN 'hover'
    ELSE 'form_submit'
  END,
  'element_' || generate_series,
  '/',
  true,
  NOW() - INTERVAL '15 minutes' * generate_series
FROM generate_series(1, 200), session_ids s
WHERE s.rn = ((generate_series % 100) + 1)
LIMIT 200;

-- Insert 80 performance metrics
WITH session_ids AS (
  SELECT session_id, ROW_NUMBER() OVER (ORDER BY created_at) as rn 
  FROM user_sessions WHERE is_test_data = true
)
INSERT INTO performance_metrics (session_id, page_path, load_time, dom_ready_time, connection_type, is_test_data, created_at)
SELECT 
  s.session_id,
  '/',
  (generate_series % 3000) + 500,
  (generate_series % 1000) + 200,
  '4g',
  true,
  NOW() - INTERVAL '45 minutes' * generate_series
FROM generate_series(1, 80), session_ids s
WHERE s.rn = ((generate_series % 100) + 1)
LIMIT 80;

-- Insert 60 error logs
WITH session_ids AS (
  SELECT session_id, ROW_NUMBER() OVER (ORDER BY created_at) as rn 
  FROM user_sessions WHERE is_test_data = true
)
INSERT INTO error_logs (session_id, error_type, error_message, page_path, is_test_data, timestamp)
SELECT 
  s.session_id,
  'javascript',
  'Test error ' || generate_series,
  '/',
  true,
  NOW() - INTERVAL '20 minutes' * generate_series
FROM generate_series(1, 60), session_ids s
WHERE s.rn = ((generate_series % 100) + 1)
LIMIT 60;