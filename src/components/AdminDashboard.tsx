import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Users, Globe, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { validateAdmin } from '@/utils/adminSecret';
import { initSecretAccess } from '@/utils/secretAccess';
import PasswordModal from './PasswordModal';

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

const AdminDashboard = () => {
  const [stats, setStats] = useState<{
    totalVisitors: number;
    totalPageViews: number;
    visitors: VisitorData[];
    pageViews: PageView[];
    analytics: {
      countries: Record<string, number>;
      devices: Record<string, number>;
      browsers: Record<string, number>;
      referrers: Record<string, number>;
    };
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleAdminAccess = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (password: string) => {
    if (validateAdmin(password)) {
      setShowPasswordModal(false);
      setIsVisible(true);
      loadStats();
    } else {
      alert('❌ Invalid password');
    }
  };

  useEffect(() => {
    const cleanup = initSecretAccess(() => setShowPasswordModal(true));
    return cleanup;
  }, []);

  const loadStats = () => {
    if ((window as any).getPortfolioStats) {
      setStats((window as any).getPortfolioStats());
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatTimeSpent = (ms?: number) => {
    if (!ms) return 'N/A';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
  };



  const getTopPages = () => {
    if (!stats) return [];
    const pageCounts = stats.pageViews.reduce((acc, pv) => {
      acc[pv.page] = (acc[pv.page] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const dashboardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-4 z-50 glass-morphism-strong rounded-2xl p-6 overflow-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold gradient-text-premium">Admin Dashboard</h2>
        <Button
          onClick={() => {
            setIsVisible(false);
          }}
          variant="outline"
          size="sm"
        >
          Close
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-morphism">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalVisitors}</p>
                  <p className="text-sm text-muted-foreground">Total Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalPageViews}</p>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {stats?.analytics?.countries ? Object.keys(stats.analytics.countries).length : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {stats?.analytics?.devices ? Object.keys(stats.analytics.devices).length : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Device Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Top Countries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.analytics?.countries ? Object.entries(stats.analytics.countries)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([country, count]) => (
                <div key={country} className="flex justify-between items-center mb-2 p-2 glass-morphism rounded">
                  <span className="font-medium">{country}</span>
                  <Badge>{count} visitors</Badge>
                </div>
              )) : <p className="text-muted-foreground">No data available</p>}
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <span>Devices & Browsers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-2">Devices</h4>
                {stats?.analytics?.devices ? Object.entries(stats.analytics.devices).map(([device, count]) => (
                  <div key={device} className="flex justify-between text-sm mb-1">
                    <span>{device}</span>
                    <span>{count}</span>
                  </div>
                )) : <p className="text-xs text-muted-foreground">No data</p>}
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Browsers</h4>
                {stats?.analytics?.browsers ? Object.entries(stats.analytics.browsers).map(([browser, count]) => (
                  <div key={browser} className="flex justify-between text-sm mb-1">
                    <span>{browser}</span>
                    <span>{count}</span>
                  </div>
                )) : <p className="text-xs text-muted-foreground">No data</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Traffic Sources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.analytics?.referrers ? Object.entries(stats.analytics.referrers)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([referrer, count]) => (
                <div key={referrer} className="flex justify-between items-center mb-2 p-2 glass-morphism rounded">
                  <span className="font-medium text-sm">{referrer}</span>
                  <Badge>{count}</Badge>
                </div>
              )) : <p className="text-muted-foreground">No data available</p>}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Recent Visitors</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-auto">
            {stats?.visitors.slice(-10).reverse().map((visitor) => (
              <div key={visitor.id} className="mb-4 p-3 glass-morphism rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex space-x-2">
                    <Badge variant="secondary">{visitor.browser}</Badge>
                    <Badge variant="outline">{visitor.device}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(visitor.timestamp)}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Location:</strong> {visitor.city}, {visitor.country}</p>
                  <p><strong>IP:</strong> {visitor.ip}</p>
                  <p><strong>OS:</strong> {visitor.os}</p>
                  <p><strong>Screen:</strong> {visitor.screenResolution}</p>
                  <p><strong>Language:</strong> {visitor.language}</p>
                  <p><strong>Timezone:</strong> {visitor.timezone}</p>
                  <p><strong>Entry:</strong> {visitor.entryPage}</p>
                  {visitor.referrer !== 'Direct' && (
                    <p><strong>From:</strong> {visitor.referrer}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Top Pages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getTopPages().map(([page, count]) => (
              <div key={page} className="flex justify-between items-center mb-3 p-2 glass-morphism rounded">
                <span className="font-medium">{page || 'Home'}</span>
                <Badge>{count} views</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  return (
    <>
      {!isVisible ? (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={handleAdminAccess}
            variant="outline"
            size="sm"
            className="glass-morphism"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        dashboardContent
      )}
      
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
};

export default AdminDashboard;