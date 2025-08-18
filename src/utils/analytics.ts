interface VisitorData {
  id: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
  location: string;
  screenResolution: string;
  language: string;
  timezone: string;
  sessionId: string;
  ip?: string;
  country?: string;
  city?: string;
  device: string;
  os: string;
  browser: string;
  visitDuration?: number;
  pagesVisited: string[];
  entryPage: string;
  exitPage?: string;
}

interface PageView {
  visitorId: string;
  page: string;
  timestamp: number;
  timeSpent?: number;
}

class VisitorTracker {
  private visitorId: string;
  private sessionId: string;
  private startTime: number;
  private currentPage: string = '';

  constructor() {
    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.init();
  }

  private getOrCreateVisitorId(): string {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = this.generateUniqueId();
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  private generateUniqueId(): string {
    return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private async init() {
    await this.trackVisitor();
    this.trackPageView(window.location.pathname);
    this.setupPageTracking();
  }

  private async trackVisitor() {
    const deviceInfo = this.getDeviceInfo();
    const locationData = await this.getLocationData();
    
    const visitorData: VisitorData = {
      id: this.visitorId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      location: window.location.href,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      sessionId: this.sessionId,
      device: deviceInfo.device,
      os: deviceInfo.os,
      browser: deviceInfo.browser,
      country: locationData.country,
      city: locationData.city,
      ip: locationData.ip,
      pagesVisited: [window.location.pathname],
      entryPage: window.location.pathname
    };

    this.storeVisitorData(visitorData);
  }

  private storeVisitorData(data: VisitorData) {
    const visitors = JSON.parse(localStorage.getItem('portfolio_visitors') || '[]');
    const existingIndex = visitors.findIndex((v: VisitorData) => v.id === data.id);
    
    if (existingIndex >= 0) {
      visitors[existingIndex] = { ...visitors[existingIndex], ...data };
    } else {
      visitors.push(data);
    }
    
    localStorage.setItem('portfolio_visitors', JSON.stringify(visitors));
  }

  public trackPageView(page: string) {
    if (this.currentPage && this.currentPage !== page) {
      // Track time spent on previous page
      const timeSpent = Date.now() - this.startTime;
      this.storePageView(this.currentPage, timeSpent);
    }

    this.currentPage = page;
    this.startTime = Date.now();
    this.storePageView(page);
  }

  private storePageView(page: string, timeSpent?: number) {
    const pageView: PageView = {
      visitorId: this.visitorId,
      page,
      timestamp: Date.now(),
      timeSpent
    };

    const pageViews = JSON.parse(localStorage.getItem('portfolio_pageviews') || '[]');
    pageViews.push(pageView);
    localStorage.setItem('portfolio_pageviews', JSON.stringify(pageViews));
  }

  private getDeviceInfo() {
    const ua = navigator.userAgent;
    const device = /Mobile|Android|iPhone|iPad/.test(ua) ? 'Mobile' : 
                  /Tablet|iPad/.test(ua) ? 'Tablet' : 'Desktop';
    
    const os = /Windows/.test(ua) ? 'Windows' :
               /Mac/.test(ua) ? 'macOS' :
               /Linux/.test(ua) ? 'Linux' :
               /Android/.test(ua) ? 'Android' :
               /iOS/.test(ua) ? 'iOS' : 'Unknown';
    
    const browser = /Chrome/.test(ua) ? 'Chrome' :
                    /Firefox/.test(ua) ? 'Firefox' :
                    /Safari/.test(ua) ? 'Safari' :
                    /Edge/.test(ua) ? 'Edge' : 'Unknown';
    
    return { device, os, browser };
  }

  private async getLocationData() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        ip: data.ip,
        country: data.country_name,
        city: data.city
      };
    } catch {
      return { ip: 'Unknown', country: 'Unknown', city: 'Unknown' };
    }
  }

  public getVisitorStats() {
    const visitors = JSON.parse(localStorage.getItem('portfolio_visitors') || '[]');
    const pageViews = JSON.parse(localStorage.getItem('portfolio_pageviews') || '[]');
    
    return {
      totalVisitors: visitors.length,
      totalPageViews: pageViews.length,
      visitors,
      pageViews,
      analytics: this.getAnalytics(visitors, pageViews)
    };
  }

  private getAnalytics(visitors: VisitorData[], pageViews: PageView[]) {
    const countries = visitors.reduce((acc, v) => {
      acc[v.country || 'Unknown'] = (acc[v.country || 'Unknown'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const devices = visitors.reduce((acc, v) => {
      acc[v.device] = (acc[v.device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const browsers = visitors.reduce((acc, v) => {
      acc[v.browser] = (acc[v.browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const referrers = visitors.reduce((acc, v) => {
      const ref = v.referrer === '' ? 'Direct' : new URL(v.referrer || 'Direct').hostname;
      acc[ref] = (acc[ref] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { countries, devices, browsers, referrers };
  }
}

// Admin access function (only accessible via console)
(window as any).getPortfolioStats = () => {
  const tracker = new VisitorTracker();
  return tracker.getVisitorStats();
};

export default VisitorTracker;