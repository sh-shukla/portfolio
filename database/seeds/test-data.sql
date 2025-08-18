-- Insert 100 test user sessions
INSERT INTO user_sessions (session_id, user_agent, ip_address, country, city, device_type, browser, os, referrer, screen_resolution, language, timezone, is_test_data, created_at)
SELECT 
  'test_session_' || generate_series,
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
  CASE (generate_series % 3)
    WHEN 0 THEN 'Google'
    WHEN 1 THEN 'Direct'
    ELSE 'LinkedIn'
  END,
  '1920x1080',
  'en-US',
  'America/New_York',
  true,
  NOW() - INTERVAL '1 hour' * generate_series
FROM generate_series(1, 100);

-- Insert 150 test page analytics
INSERT INTO page_analytics (session_id, page_path, page_title, time_on_page, is_test_data, created_at)
SELECT 
  'test_session_' || ((generate_series % 100) + 1),
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
FROM generate_series(1, 150);

-- Insert 200 test user interactions
INSERT INTO user_interactions (session_id, interaction_type, element_id, element_class, element_text, page_path, metadata, is_test_data, timestamp)
SELECT 
  'test_session_' || ((generate_series % 100) + 1),
  CASE (generate_series % 4)
    WHEN 0 THEN 'click'
    WHEN 1 THEN 'scroll'
    WHEN 2 THEN 'hover'
    ELSE 'form_submit'
  END,
  'test_element_' || generate_series,
  'test-class',
  'Test Element ' || generate_series,
  '/',
  '{"test": true}',
  true,
  NOW() - INTERVAL '15 minutes' * generate_series
FROM generate_series(1, 200);

-- Insert 80 test performance metrics
INSERT INTO performance_metrics (session_id, page_path, load_time, dom_ready_time, first_paint, largest_contentful_paint, connection_type, is_test_data, created_at)
SELECT 
  'test_session_' || ((generate_series % 100) + 1),
  '/',
  (generate_series % 3000) + 500,
  (generate_series % 1000) + 200,
  (generate_series % 2000) + 100,
  (generate_series % 4000) + 800,
  CASE (generate_series % 3)
    WHEN 0 THEN '4g'
    WHEN 1 THEN 'wifi'
    ELSE '3g'
  END,
  true,
  NOW() - INTERVAL '45 minutes' * generate_series
FROM generate_series(1, 80);

-- Insert 60 test error logs
INSERT INTO error_logs (session_id, error_type, error_message, stack_trace, page_path, user_agent, is_test_data, timestamp)
SELECT 
  'test_session_' || ((generate_series % 100) + 1),
  CASE (generate_series % 3)
    WHEN 0 THEN 'javascript'
    WHEN 1 THEN 'network'
    ELSE 'validation'
  END,
  'Test error message ' || generate_series,
  'Test stack trace for error ' || generate_series,
  '/',
  'Mozilla/5.0 (Test Browser)',
  true,
  NOW() - INTERVAL '20 minutes' * generate_series
FROM generate_series(1, 60);