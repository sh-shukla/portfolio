import { supabase, testConnection } from '@/lib/enhanced-supabase';
import type { UserSession, PageAnalytics, UserInteraction, PerformanceMetrics, ErrorLog } from '@/lib/enhanced-supabase';

class EnhancedAnalyticsService {
  private sessionId: string;
  private sessionStartTime: number;
  private currentPage: string = '';
  private pageStartTime: number = 0;
  private isEnabled: boolean = false;
  private connectionStatus: { success: boolean; message: string } = { success: false, message: 'Not tested' };
  private isTestEnvironment: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    this.isTestEnvironment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeTracking() {
    try {
      // Test connection first
      this.connectionStatus = await testConnection();
      this.isEnabled = this.connectionStatus.success;

      if (this.isEnabled) {
        await this.createSession();
        this.setupEventListeners();
        this.trackPageView(window.location.pathname);
      } else {
        console.log('Analytics disabled:', this.connectionStatus.message);
      }
    } catch (error) {
      console.log('Analytics initialization failed:', error);
      this.isEnabled = false;
    }
  }

  private async getLocationData() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        ip: data.ip || 'Unknown',
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown'
      };
    } catch {
      return { ip: 'Unknown', country: 'Unknown', city: 'Unknown' };
    }
  }

  private getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown', os = 'Unknown', device = 'Desktop';

    // Browser detection
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    // OS detection
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';

    // Device detection
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      device = /iPad/.test(ua) ? 'Tablet' : 'Mobile';
    }

    return { browser, os, device };
  }

  private getUTMParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign')
    };
  }

  private async createSession() {
    if (!this.isEnabled) return;

    try {
      const locationData = await this.getLocationData();
      const browserInfo = this.getBrowserInfo();
      const utmParams = this.getUTMParams();

      const sessionData: UserSession = {
        session_id: this.sessionId,
        user_agent: navigator.userAgent,
        ip_address: locationData.ip,
        country: locationData.country,
        city: locationData.city,
        device_type: browserInfo.device,
        browser: browserInfo.browser,
        os: browserInfo.os,
        referrer: document.referrer || 'Direct',
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        screen_resolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        is_test_data: this.isTestEnvironment
      };

      const { error } = await supabase.from('user_sessions').insert([sessionData]);
      if (error) {
        console.log('Session creation failed:', error.message);
        this.isEnabled = false;
      }
    } catch (error) {
      console.log('Session creation error:', error);
      this.isEnabled = false;
    }
  }

  async trackPageView(pagePath: string) {
    if (!this.isEnabled) return;
    
    // Skip tracking for admin dashboard
    if (pagePath.includes('admin') || document.title.includes('Analytics Dashboard')) {
      return;
    }

    // End previous page tracking
    if (this.currentPage && this.pageStartTime) {
      await this.endPageTracking();
    }

    // Start new page tracking
    this.currentPage = pagePath;
    this.pageStartTime = Date.now();

    try {
      const pageData: PageAnalytics = {
        session_id: this.sessionId,
        page_path: pagePath,
        page_title: document.title,
        is_test_data: this.isTestEnvironment
      };

      const { error } = await supabase.from('page_analytics').insert([pageData]);
      if (error) {
        console.log('Page tracking failed:', error.message);
      }

      // Update session page count
      const { error: updateError } = await supabase
        .from('user_sessions')
        .update({ 
          pages_count: supabase.rpc('increment_pages_count', { session_id: this.sessionId }),
          is_bounce: false 
        })
        .eq('session_id', this.sessionId);

    } catch (error) {
      console.log('Page view tracking error:', error);
    }
  }

  private async endPageTracking() {
    if (!this.isEnabled || !this.currentPage || !this.pageStartTime) return;

    const timeOnPage = Date.now() - this.pageStartTime;

    try {
      const { error } = await supabase
        .from('page_analytics')
        .update({ time_on_page: timeOnPage })
        .eq('session_id', this.sessionId)
        .eq('page_path', this.currentPage)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.log('End page tracking failed:', error.message);
      }
    } catch (error) {
      console.log('End page tracking error:', error);
    }
  }

  async trackInteraction(type: string, element?: HTMLElement, metadata?: any) {
    if (!this.isEnabled) return;
    
    // Skip tracking interactions on admin dashboard
    if (this.currentPage.includes('admin') || document.title.includes('Analytics Dashboard')) {
      return;
    }

    try {
      const interactionData: UserInteraction = {
        session_id: this.sessionId,
        interaction_type: type,
        element_id: element?.id,
        element_class: element?.className,
        element_text: element?.textContent?.substring(0, 100),
        page_path: this.currentPage,
        metadata,
        is_test_data: this.isTestEnvironment
      };

      const { error } = await supabase.from('user_interactions').insert([interactionData]);
      if (error) {
        console.log('Interaction tracking failed:', error.message);
      }
    } catch (error) {
      console.log('Interaction tracking error:', error);
    }
  }

  async trackPerformance(pagePath: string) {
    if (!this.isEnabled) return;

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      const performanceData: PerformanceMetrics = {
        session_id: this.sessionId,
        page_path: pagePath,
        load_time: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        dom_ready_time: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        first_paint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        largest_contentful_paint: paint.find(p => p.name === 'largest-contentful-paint')?.startTime || 0,
        connection_type: (navigator as any).connection?.effectiveType || 'Unknown',
        is_test_data: this.isTestEnvironment
      };

      const { error } = await supabase.from('performance_metrics').insert([performanceData]);
      if (error) {
        console.log('Performance tracking failed:', error.message);
      }
    } catch (error) {
      console.log('Performance tracking error:', error);
    }
  }

  async trackError(error: Error, errorType: string = 'javascript') {
    try {
      const errorData: ErrorLog = {
        session_id: this.sessionId,
        error_type: errorType,
        error_message: error.message,
        stack_trace: error.stack,
        page_path: this.currentPage,
        user_agent: navigator.userAgent,
        is_test_data: this.isTestEnvironment
      };

      const { error: insertError } = await supabase.from('error_logs').insert([errorData]);
      if (insertError) {
        console.log('Error tracking failed:', insertError.message);
      }
    } catch (trackingError) {
      console.log('Error tracking error:', trackingError);
    }
  }

  private setupEventListeners() {
    // Track clicks
    document.addEventListener('click', (e) => {
      this.trackInteraction('click', e.target as HTMLElement);
    });

    // Track scroll depth
    let maxScroll = 0;
    document.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.trackInteraction('scroll', undefined, { scroll_depth: maxScroll });
        }
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      this.trackInteraction('form_submit', e.target as HTMLElement);
    });

    // Track errors
    window.addEventListener('error', (e) => {
      this.trackError(e.error || new Error(e.message), 'javascript');
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      this.trackError(new Error(e.reason), 'promise_rejection');
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });
  }

  private async endSession() {
    if (!this.isEnabled) return;

    await this.endPageTracking();

    const sessionDuration = Math.round((Date.now() - this.sessionStartTime) / 1000);

    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({ 
          end_time: new Date().toISOString(),
          duration_seconds: sessionDuration 
        })
        .eq('session_id', this.sessionId);

      if (error) {
        console.log('Session end failed:', error.message);
      }
    } catch (error) {
      console.log('Session end error:', error);
    }
  }

  private async performCleanup() {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 15);
      
      await supabase
        .from('user_sessions')
        .delete()
        .lt('created_at', cutoffDate.toISOString());
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }

  async getAnalytics() {
    // Run cleanup occasionally (1% chance)
    if (Math.random() < 0.01) {
      this.performCleanup();
    }
    
    if (!this.isEnabled) {
      return {
        connectionStatus: this.connectionStatus,
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
          bounceRate: 0
        }
      };
    }

    try {
      // Filter out test data in production
      const testFilter = this.isTestEnvironment ? {} : { is_test_data: false };

      const [
        { data: sessions, error: sessionsError },
        { data: pageAnalytics, error: pageError },
        { data: interactions, error: interactionsError },
        { data: performance, error: performanceError },
        { data: errors, error: errorsError }
      ] = await Promise.all([
        supabase.from('user_sessions').select('*').match(testFilter).order('created_at', { ascending: false }).limit(100),
        supabase.from('page_analytics').select('*').match(testFilter).order('created_at', { ascending: false }).limit(200),
        supabase.from('user_interactions').select('*').match(testFilter).order('timestamp', { ascending: false }).limit(500),
        supabase.from('performance_metrics').select('*').match(testFilter).order('created_at', { ascending: false }).limit(100),
        supabase.from('error_logs').select('*').match(testFilter).order('timestamp', { ascending: false }).limit(50)
      ]);

      if (sessionsError || pageError || interactionsError || performanceError || errorsError) {
        throw new Error('Failed to fetch analytics data');
      }

      // Calculate analytics
      const countries = sessions?.reduce((acc, session) => {
        acc[session.country] = (acc[session.country] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const devices = sessions?.reduce((acc, session) => {
        acc[session.device_type] = (acc[session.device_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const browsers = sessions?.reduce((acc, session) => {
        acc[session.browser] = (acc[session.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const referrers = sessions?.reduce((acc, session) => {
        acc[session.referrer] = (acc[session.referrer] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const topPages = pageAnalytics?.reduce((acc, page) => {
        acc[page.page_path] = (acc[page.page_path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const avgSessionDuration = sessions?.reduce((sum, session) => sum + (session.duration_seconds || 0), 0) / (sessions?.length || 1);
      const bounceRate = (sessions?.filter(s => s.is_bounce).length || 0) / (sessions?.length || 1) * 100;

      return {
        connectionStatus: this.connectionStatus,
        totalSessions: sessions?.length || 0,
        totalPageViews: pageAnalytics?.length || 0,
        sessions: sessions || [],
        pageAnalytics: pageAnalytics || [],
        interactions: interactions || [],
        performance: performance || [],
        errors: errors || [],
        analytics: {
          countries,
          devices,
          browsers,
          referrers,
          topPages,
          avgSessionDuration: Math.round(avgSessionDuration),
          bounceRate: Math.round(bounceRate)
        }
      };
    } catch (error) {
      console.error('Failed to get analytics:', error);
      return {
        connectionStatus: { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
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
          bounceRate: 0
        }
      };
    }
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }

  isConnectionHealthy() {
    return this.isEnabled && this.connectionStatus.success;
  }
}

export const enhancedAnalytics = new EnhancedAnalyticsService();

// Make analytics available globally for admin dashboard
(window as any).getPortfolioStats = () => enhancedAnalytics.getAnalytics();
(window as any).getConnectionStatus = () => enhancedAnalytics.getConnectionStatus();