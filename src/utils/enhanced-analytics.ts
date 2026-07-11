// DB DECOMMISSIONED - All Supabase/analytics tracking disabled
/*
import { supabase, testConnection } from '@/lib/enhanced-supabase';
... full EnhancedAnalyticsService class with DB calls removed ...
*/

// Stub so existing imports (EnhancedAdminDashboard, App.tsx) don't break
class EnhancedAnalyticsService {
  getConnectionStatus() {
    return { success: false, message: 'DB decommissioned' };
  }

  isConnectionHealthy() {
    return false;
  }

  async getAnalytics() {
    return {
      connectionStatus: { success: false, message: 'DB decommissioned' },
      totalSessions: 0,
      totalPageViews: 0,
      sessions: [],
      pageAnalytics: [],
      interactions: [],
      performance: [],
      errors: [],
      analytics: {
        countries: {},
        devices: {},
        browsers: {},
        referrers: {},
        topPages: {},
        avgSessionDuration: 0,
        bounceRate: 0,
      },
    };
  }
}

export const enhancedAnalytics = new EnhancedAnalyticsService();
