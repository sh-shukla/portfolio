-- Enhanced analytics tables
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  pages_count INTEGER DEFAULT 0,
  is_bounce BOOLEAN DEFAULT true,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  screen_resolution TEXT,
  language TEXT,
  timezone TEXT,
  is_test_data BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES user_sessions(session_id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  page_title TEXT,
  visit_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  time_on_page INTEGER,
  scroll_depth INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  form_submissions INTEGER DEFAULT 0,
  exit_page BOOLEAN DEFAULT false,
  is_test_data BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES user_sessions(session_id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- click, scroll, form_submit, download, etc
  element_id TEXT,
  element_class TEXT,
  element_text TEXT,
  page_path TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB,
  is_test_data BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES user_sessions(session_id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  load_time INTEGER, -- milliseconds
  dom_ready_time INTEGER,
  first_paint INTEGER,
  largest_contentful_paint INTEGER,
  cumulative_layout_shift DECIMAL,
  first_input_delay INTEGER,
  connection_type TEXT,
  is_test_data BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS error_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT,
  error_type TEXT NOT NULL,
  error_message TEXT,
  stack_trace TEXT,
  page_path TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_test_data BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "public_read_sessions" ON user_sessions FOR SELECT USING (true);
CREATE POLICY "public_insert_sessions" ON user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_sessions" ON user_sessions FOR UPDATE USING (true);

CREATE POLICY "public_read_page_analytics" ON page_analytics FOR SELECT USING (true);
CREATE POLICY "public_insert_page_analytics" ON page_analytics FOR INSERT WITH CHECK (true);

CREATE POLICY "public_read_interactions" ON user_interactions FOR SELECT USING (true);
CREATE POLICY "public_insert_interactions" ON user_interactions FOR INSERT WITH CHECK (true);

CREATE POLICY "public_read_performance" ON performance_metrics FOR SELECT USING (true);
CREATE POLICY "public_insert_performance" ON performance_metrics FOR INSERT WITH CHECK (true);

CREATE POLICY "public_read_errors" ON error_logs FOR SELECT USING (true);
CREATE POLICY "public_insert_errors" ON error_logs FOR INSERT WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON user_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_country ON user_sessions(country);
CREATE INDEX IF NOT EXISTS idx_sessions_device ON user_sessions(device_type);
CREATE INDEX IF NOT EXISTS idx_sessions_test_data ON user_sessions(is_test_data);

CREATE INDEX IF NOT EXISTS idx_page_analytics_session ON page_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_page_analytics_page ON page_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_page_analytics_test_data ON page_analytics(is_test_data);

CREATE INDEX IF NOT EXISTS idx_interactions_session ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_test_data ON user_interactions(is_test_data);