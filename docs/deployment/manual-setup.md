# Manual Database Setup

Go to your Supabase dashboard: https://supabase.com/dashboard/project/qvzshmzffydlceirsulk

## 1. Create Tables

Go to SQL Editor and run this:

```sql
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

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access to visitors" ON visitors
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to page_views" ON page_views
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to visitors" ON visitors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to page_views" ON page_views
  FOR INSERT WITH CHECK (true);
```

## 2. Insert Dummy Data

```sql
-- Insert dummy visitors
INSERT INTO visitors (timestamp, user_agent, referrer, location, screen_resolution, language, timezone, session_id, ip, country, city, device, os, browser, pages_visited, entry_page) VALUES
(1735519416000, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Google', 'New York, USA', '1920x1080', 'en-US', 'America/New_York', 'session_1', '192.168.1.1', 'USA', 'New York', 'Desktop', 'Windows', 'Chrome', ARRAY['/'], '/'),
(1735562616000, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'LinkedIn', 'Mumbai, India', '1440x900', 'en-IN', 'Asia/Kolkata', 'session_2', '192.168.1.2', 'India', 'Mumbai', 'Desktop', 'macOS', 'Chrome', ARRAY['/', '/about'], '/'),
(1735584216000, 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15', 'Direct', 'London, UK', '375x812', 'en-GB', 'Europe/London', 'session_3', '192.168.1.3', 'UK', 'London', 'Mobile', 'iOS', 'Safari', ARRAY['/', '/projects'], '/');
```

After creating tables, run the setup script again.