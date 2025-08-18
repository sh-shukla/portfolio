-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  location TEXT,
  screen_resolution TEXT,
  language TEXT,
  timezone TEXT,
  session_id TEXT NOT NULL,
  ip TEXT,
  country TEXT,
  city TEXT,
  device TEXT,
  os TEXT,
  browser TEXT,
  visit_duration INTEGER,
  pages_visited TEXT[],
  entry_page TEXT,
  exit_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
  page TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  time_spent INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at);
CREATE INDEX IF NOT EXISTS idx_visitors_country ON visitors(country);
CREATE INDEX IF NOT EXISTS idx_visitors_device ON visitors(device);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for analytics)
CREATE POLICY "Allow public read access to visitors" ON visitors
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to page_views" ON page_views
  FOR SELECT USING (true);

-- Create policies for public insert access (for tracking)
CREATE POLICY "Allow public insert to visitors" ON visitors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to page_views" ON page_views
  FOR INSERT WITH CHECK (true);