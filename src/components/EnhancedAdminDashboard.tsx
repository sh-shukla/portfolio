import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Users, Globe, Monitor, TrendingUp, Clock, MapPin, Smartphone, Chrome, Activity, BarChart3, PieChart, X, Database, Wifi, WifiOff, RefreshCw, AlertTriangle, Calendar } from 'lucide-react';
import { supabase } from '@/lib/enhanced-supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, AreaChart, Area } from 'recharts';
import { validateAdmin } from '@/utils/adminSecret';
import { initSecretAccess } from '@/utils/secretAccess';
import { enhancedAnalytics } from '@/utils/enhanced-analytics';
import PasswordModal from './PasswordModal';

interface AnalyticsData {
  connectionStatus: { success: boolean; message: string };
  totalSessions: number;
  totalPageViews: number;
  sessions: any[];
  pageAnalytics: any[];
  interactions: any[];
  performance: any[];
  errors: any[];
  analytics: {
    countries: Record<string, number>;
    devices: Record<string, number>;
    browsers: Record<string, number>;
    referrers: Record<string, number>;
    topPages: Record<string, number>;
    avgSessionDuration: number;
    bounceRate: number;
  };
}

const EnhancedAdminDashboard = () => {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [cleanupOption, setCleanupOption] = useState('50');
  const [showCleanupOptions, setShowCleanupOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminAccess = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (password: string) => {
    if (validateAdmin(password)) {
      setShowPasswordModal(false);
      setIsVisible(true);
      loadStats();
    } else {
      throw new Error('Invalid password');
    }
  };

  useEffect(() => {
    const cleanup = initSecretAccess(() => setShowPasswordModal(true));
    return cleanup;
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await enhancedAnalytics.getAnalytics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
    setIsLoading(false);
  };

  const getFilteredData = () => {
    if (!stats) return stats;

    let startDate: Date, endDate: Date;
    const now = new Date();

    if (timeRange === 'custom' && customStartDate && customEndDate) {
      startDate = new Date(customStartDate);
      endDate = new Date(customEndDate);
      endDate.setHours(23, 59, 59, 999); // End of day
    } else {
      endDate = now;
      switch (timeRange) {
        case '1h':
          startDate = new Date(now.getTime() - (1 * 60 * 60 * 1000));
          break;
        case '6h':
          startDate = new Date(now.getTime() - (6 * 60 * 60 * 1000));
          break;
        case '24h':
          startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
          break;
        case '7d':
          startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
          break;
        case '30d':
          startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
          break;
        case '90d':
          startDate = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
          break;
        default:
          startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
      }
    }

    const filteredSessions = stats.sessions.filter(session => {
      const sessionDate = new Date(session.created_at);
      return sessionDate >= startDate && sessionDate <= endDate;
    });

    const filteredPageAnalytics = stats.pageAnalytics.filter(page => {
      const pageDate = new Date(page.created_at);
      return pageDate >= startDate && pageDate <= endDate;
    });

    const filteredInteractions = stats.interactions.filter(interaction => {
      const interactionDate = new Date(interaction.timestamp);
      return interactionDate >= startDate && interactionDate <= endDate;
    });

    // Recalculate analytics for filtered data
    const countries = filteredSessions.reduce((acc, session) => {
      acc[session.country] = (acc[session.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const devices = filteredSessions.reduce((acc, session) => {
      acc[session.device_type] = (acc[session.device_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const browsers = filteredSessions.reduce((acc, session) => {
      acc[session.browser] = (acc[session.browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = filteredPageAnalytics.reduce((acc, page) => {
      acc[page.page_path] = (acc[page.page_path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgSessionDuration = filteredSessions.reduce((sum, session) => 
      sum + (session.duration_seconds || 0), 0) / (filteredSessions.length || 1);

    const bounceRate = (filteredSessions.filter(s => s.is_bounce).length || 0) / 
      (filteredSessions.length || 1) * 100;

    return {
      ...stats,
      totalSessions: filteredSessions.length,
      totalPageViews: filteredPageAnalytics.length,
      sessions: filteredSessions,
      pageAnalytics: filteredPageAnalytics,
      interactions: filteredInteractions,
      analytics: {
        ...stats.analytics,
        countries,
        devices,
        browsers,
        topPages,
        avgSessionDuration: Math.round(avgSessionDuration),
        bounceRate: Math.round(bounceRate)
      }
    };
  };

  const getVisitorTrend = () => {
    const filteredStats = getFilteredData();
    if (!filteredStats?.sessions.length) return [];

    const days = parseInt(timeRange.replace('d', ''));
    const trend = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const dayVisitors = filteredStats.sessions.filter(session => {
        const sessionDate = new Date(session.created_at);
        return sessionDate >= dayStart && sessionDate < dayEnd;
      }).length;

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        visitors: dayVisitors
      };
    });

    return trend;
  };

  const getDeviceData = () => {
    const filteredStats = getFilteredData();
    if (!filteredStats?.analytics?.devices) return [];
    
    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    return Object.entries(filteredStats.analytics.devices).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  };

  const getTopPages = () => {
    const filteredStats = getFilteredData();
    if (!filteredStats?.analytics?.topPages) return [];
    
    return Object.entries(filteredStats.analytics.topPages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const refreshConnection = async () => {
    // Just reload stats without triggering new analytics
    setIsLoading(true);
    try {
      const data = await enhancedAnalytics.getAnalytics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const filteredStats = getFilteredData();

  const dashboardContent = (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-7xl max-h-[90vh] glass-morphism-strong rounded-2xl p-6 overflow-auto backdrop-blur-xl border border-white/10"
      >
        {/* Header with Connection Status */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold gradient-text-premium">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Enterprise analytics dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-36 glass-morphism">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              {timeRange === 'custom' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="datetime-local"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="px-2 py-1 text-sm glass-morphism rounded border-0 bg-white/5"
                  />
                  <span className="text-sm text-muted-foreground">to</span>
                  <input
                    type="datetime-local"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="px-2 py-1 text-sm glass-morphism rounded border-0 bg-white/5"
                  />
                </div>
              )}
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full glass-morphism hover:bg-red-500/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Database Status Card */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <Card className={`glass-morphism border-0 ${!stats?.connectionStatus.success ? 'border-red-500/20' : 'border-green-500/20'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stats?.connectionStatus.success ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <Database className={`h-6 w-6 ${stats?.connectionStatus.success ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold flex items-center space-x-2">
                      <span>Database Management</span>
                      {stats?.connectionStatus.success ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stats?.connectionStatus.message}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={stats?.connectionStatus.success ? "default" : "destructive"}>
                    {stats?.connectionStatus.success ? 'Connected' : 'Disconnected'}
                  </Badge>
                  <Badge variant="outline">
                    {window.location.hostname === 'localhost' ? 'Development' : 'Production'}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Records: {stats ? (stats.totalSessions + stats.totalPageViews + stats.interactions.length + stats.performance.length + stats.errors.length).toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Auto cleanup: 15 days</span>
                    </div>
                  </div>
                  
                  <div>
                    <Button
                      onClick={() => setShowCleanupOptions(!showCleanupOptions)}
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                      className="glass-morphism hover:bg-red-500/10 border-red-500/20 text-red-400"
                    >
                      {isLoading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <RefreshCw className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Database className="h-4 w-4" />
                      )}
                      <span className="ml-2">{isLoading ? 'Cleaning...' : 'Clean Data'}</span>
                    </Button>
                  </div>
                  
                  {showCleanupOptions && (
                    <div className="mt-3 p-3 glass-morphism rounded-lg border border-white/10">
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Database Cleanup Options</p>
                        <p className="text-xs text-muted-foreground">Keep only the most recent records from each table</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'empty', label: 'Empty All', desc: 'Delete everything' },
                          { value: '25', label: 'Keep 25', desc: 'Keep last 25 records' },
                          { value: '50', label: 'Keep 50', desc: 'Keep last 50 records' },
                          { value: '100', label: 'Keep 100', desc: 'Keep last 100 records' },
                          { value: '200', label: 'Keep 200', desc: 'Keep last 200 records' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={async () => {
                              setCleanupOption(option.value);
                              setShowCleanupOptions(false);
                              setIsLoading(true);
                              
                              try {
                                if (option.value === 'empty') {
                                  await Promise.all([
                                    supabase.from('user_interactions').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
                                    supabase.from('page_analytics').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
                                    supabase.from('performance_metrics').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
                                    supabase.from('error_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
                                    supabase.from('user_sessions').delete().neq('id', '00000000-0000-0000-0000-000000000000')
                                  ]);
                                } else {
                                  const limit = parseInt(option.value);
                                  const [sessions, pages, interactions, performance, errors] = await Promise.all([
                                    supabase.from('user_sessions').select('id').order('created_at', { ascending: false }).limit(limit),
                                    supabase.from('page_analytics').select('id').order('created_at', { ascending: false }).limit(limit),
                                    supabase.from('user_interactions').select('id').order('timestamp', { ascending: false }).limit(limit),
                                    supabase.from('performance_metrics').select('id').order('created_at', { ascending: false }).limit(limit),
                                    supabase.from('error_logs').select('id').order('timestamp', { ascending: false }).limit(limit)
                                  ]);
                                  
                                  // Delete all records except the ones we want to keep
                                  const deletePromises = [];
                                  
                                  // For each table, delete records NOT in the keep list
                                  if (sessions.data?.length) {
                                    const keepIds = sessions.data.map(r => r.id);
                                    const { data: allSessions } = await supabase.from('user_sessions').select('id');
                                    const deleteIds = allSessions?.filter(s => !keepIds.includes(s.id)).map(s => s.id) || [];
                                    if (deleteIds.length > 0) {
                                      deletePromises.push(supabase.from('user_sessions').delete().in('id', deleteIds));
                                    }
                                  }
                                  
                                  if (pages.data?.length) {
                                    const keepIds = pages.data.map(r => r.id);
                                    const { data: allPages } = await supabase.from('page_analytics').select('id');
                                    const deleteIds = allPages?.filter(p => !keepIds.includes(p.id)).map(p => p.id) || [];
                                    if (deleteIds.length > 0) {
                                      deletePromises.push(supabase.from('page_analytics').delete().in('id', deleteIds));
                                    }
                                  }
                                  
                                  if (interactions.data?.length) {
                                    const keepIds = interactions.data.map(r => r.id);
                                    const { data: allInteractions } = await supabase.from('user_interactions').select('id');
                                    const deleteIds = allInteractions?.filter(i => !keepIds.includes(i.id)).map(i => i.id) || [];
                                    if (deleteIds.length > 0) {
                                      deletePromises.push(supabase.from('user_interactions').delete().in('id', deleteIds));
                                    }
                                  }
                                  
                                  if (performance.data?.length) {
                                    const keepIds = performance.data.map(r => r.id);
                                    const { data: allPerformance } = await supabase.from('performance_metrics').select('id');
                                    const deleteIds = allPerformance?.filter(p => !keepIds.includes(p.id)).map(p => p.id) || [];
                                    if (deleteIds.length > 0) {
                                      deletePromises.push(supabase.from('performance_metrics').delete().in('id', deleteIds));
                                    }
                                  }
                                  
                                  if (errors.data?.length) {
                                    const keepIds = errors.data.map(r => r.id);
                                    const { data: allErrors } = await supabase.from('error_logs').select('id');
                                    const deleteIds = allErrors?.filter(e => !keepIds.includes(e.id)).map(e => e.id) || [];
                                    if (deleteIds.length > 0) {
                                      deletePromises.push(supabase.from('error_logs').delete().in('id', deleteIds));
                                    }
                                  }
                                  
                                  await Promise.all(deletePromises);
                                }
                                
                                await loadStats();
                              } catch (error) {
                                console.error('Cleanup failed:', error);
                              }
                              setIsLoading(false);
                            }}
                            className="p-3 text-left bg-white/5 hover:bg-white/10 rounded transition-colors"
                          >
                            <div className="text-xs font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{option.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
                >
                  <div className="flex items-center space-x-2 text-blue-400">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Database className="h-4 w-4" />
                    </motion.div>
                    <span className="text-sm">
                      {cleanupOption === 'empty' 
                        ? 'Emptying all tables...' 
                        : `Cleaning all tables... Keeping last ${cleanupOption} records from each table`
                      }
                    </span>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {filteredStats && (
          <>
            {/* Stats Cards */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {[
                { icon: Users, label: 'Total Sessions', value: filteredStats.totalSessions, color: 'text-blue-500', bg: 'from-blue-500/20 to-blue-400/5' },
                { icon: Eye, label: 'Page Views', value: filteredStats.totalPageViews, color: 'text-green-500', bg: 'from-green-500/20 to-green-400/5' },
                { icon: Clock, label: 'Avg Duration', value: `${filteredStats.analytics.avgSessionDuration}s`, color: 'text-purple-500', bg: 'from-purple-500/20 to-purple-400/5' },
                { icon: TrendingUp, label: 'Bounce Rate', value: `${filteredStats.analytics.bounceRate}%`, color: 'text-orange-500', bg: 'from-orange-500/20 to-orange-400/5' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="glass-morphism border-0 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold mb-1">{item.value}</p>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center`}>
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Visitor Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={getVisitorTrend()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="visitors" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    <span>Device Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={getDeviceData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getDeviceData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Detailed Analytics */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
            >
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Top Countries</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(filteredStats.analytics.countries)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([country, count], index) => (
                        <motion.div 
                          key={country}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="flex justify-between items-center p-3 glass-morphism rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <span className="text-xs font-bold">{country.slice(0, 2).toUpperCase()}</span>
                            </div>
                            <span className="font-medium">{country}</span>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">{count} sessions</Badge>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span>Devices & Browsers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                        <Monitor className="h-4 w-4" />
                        <span>Devices</span>
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(filteredStats.analytics.devices).map(([device, count], index) => (
                          <motion.div 
                            key={device}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.0 + index * 0.1 }}
                            className="flex justify-between items-center p-2 glass-morphism rounded"
                          >
                            <span className="text-sm">{device}</span>
                            <Badge variant="outline">{count}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                        <Chrome className="h-4 w-4" />
                        <span>Browsers</span>
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(filteredStats.analytics.browsers).map(([browser, count], index) => (
                          <motion.div 
                            key={browser}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            className="flex justify-between items-center p-2 glass-morphism rounded"
                          >
                            <span className="text-sm">{browser}</span>
                            <Badge variant="outline">{count}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <span>Top Pages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getTopPages().map(([page, count], index) => (
                    <motion.div 
                      key={page}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="flex justify-between items-center mb-3 p-3 glass-morphism rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium">{page || 'Home'}</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">{count} views</Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="grid grid-cols-1 lg:grid-cols-1 gap-6"
            >
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Recent Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-auto">
                  {filteredStats.sessions.slice(-5).reverse().map((session, index) => (
                    <motion.div 
                      key={session.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                      className="mb-4 p-4 glass-morphism rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex space-x-2">
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">{session.browser}</Badge>
                          <Badge variant="outline">{session.device_type}</Badge>
                          {session.is_test_data && <Badge variant="destructive">Test Data</Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(session.created_at)}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Location:</strong> {session.city}, {session.country}</p>
                          <p><strong>IP:</strong> {session.ip_address}</p>
                          <p><strong>OS:</strong> {session.os}</p>
                        </div>
                        <div>
                          <p><strong>Duration:</strong> {session.duration_seconds || 0}s</p>
                          <p><strong>Pages:</strong> {session.pages_count || 0}</p>
                          <p><strong>Referrer:</strong> {session.referrer}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
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
        <AnimatePresence>
          {dashboardContent}
        </AnimatePresence>
      )}
      
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
};

export default EnhancedAdminDashboard;