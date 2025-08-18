import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wifi, WifiOff, RefreshCw, Database, AlertTriangle } from 'lucide-react';
import { enhancedAnalytics } from '@/utils/enhanced-analytics';

const ConnectionStatus = () => {
  const [status, setStatus] = useState({ success: false, message: 'Checking...' });
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkConnection = async () => {
    setIsRefreshing(true);
    const connectionStatus = enhancedAnalytics.getConnectionStatus();
    setStatus(connectionStatus);
    setIsRefreshing(false);
  };

  useEffect(() => {
    checkConnection();
    
    // Show status if there's an issue
    const timer = setTimeout(() => {
      if (!status.success) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide if connection is healthy
  useEffect(() => {
    if (status.success && isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status.success, isVisible]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Status indicator button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleVisibility}
          variant="ghost"
          size="sm"
          className={`glass-morphism ${status.success ? 'text-green-500' : 'text-red-500'}`}
        >
          {status.success ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        </Button>
      </div>

      {/* Status panel */}
      {isVisible && (
        <div className="fixed top-16 right-4 z-50 w-80">
          <Card className="glass-morphism border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Database Status</span>
                </div>
                <Button
                  onClick={checkConnection}
                  variant="ghost"
                  size="sm"
                  disabled={isRefreshing}
                  className="h-6 w-6 p-0"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connection:</span>
                  <Badge variant={status.success ? "default" : "destructive"}>
                    {status.success ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Analytics:</span>
                  <Badge variant={enhancedAnalytics.isConnectionHealthy() ? "default" : "secondary"}>
                    {enhancedAnalytics.isConnectionHealthy() ? 'Active' : 'Fallback'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Environment:</span>
                  <Badge variant="outline">
                    {window.location.hostname === 'localhost' ? 'Development' : 'Production'}
                  </Badge>
                </div>

                {!status.success && (
                  <div className="mt-3 p-2 bg-red-500/10 rounded border border-red-500/20">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-500">Connection Issue</p>
                        <p className="text-xs text-red-400 mt-1">{status.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {status.success && (
                  <div className="mt-3 p-2 bg-green-500/10 rounded border border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <p className="text-sm text-green-500">All systems operational</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ConnectionStatus;