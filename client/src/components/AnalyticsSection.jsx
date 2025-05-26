import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { ArrowLeft, TrendingUp, Eye, Monitor, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CHART_COLORS = ['#1e40af', '#06b6d4', '#10b981', '#f59e0b'];

// Mock data
const mockData = {
  timeline: [
    { date: 'Jan 1', clicks: 45 },
    { date: 'Jan 2', clicks: 62 },
    { date: 'Jan 3', clicks: 38 },
    { date: 'Jan 4', clicks: 71 },
    { date: 'Jan 5', clicks: 89 },
    { date: 'Jan 6', clicks: 56 },
    { date: 'Jan 7', clicks: 94 }
  ],
  devices: [
    { name: 'Desktop', value: 245 },
    { name: 'Mobile', value: 312 },
    { name: 'Tablet', value: 89 }
  ],
  browsers: [
    { name: 'Chrome', value: 398 },
    { name: 'Safari', value: 142 },
    { name: 'Firefox', value: 87 },
    { name: 'Edge', value: 43 }
  ]
};

// Minimal Card Component
const Card = ({ children, className = '' }) => (
  <div className={` dark:bg-gray-800 bg-white rounded-lg border dark:border-gray-600 border-gray-100 ${className}`}>
    {children}
  </div>
);

// Metric Card Component
const MetricCard = ({ icon: Icon, title, value, change }) => (
  <Card className="p-6 shadow-md">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 dark:bg-gray-300 bg-blue-50 rounded-lg">
        <Icon className="w-5 h-5 dark:text-blue-400 text-blue-600" />
      </div>
      {change && (
        <div className="flex items-center text-green-600 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          +{change}%
        </div>
      )}
    </div>
    <div>
      <p className="text-sm dark:text-white text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-semibold dark:text-white text-gray-900">{value}</p>
    </div>
  </Card>
);

// Chart Container
const ChartContainer = ({ title, children, action }) => (
  <Card className="p-6 shadow">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold dark:text-white text-gray-900">{title}</h3>
      {action}
    </div>
    {children}
  </Card>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border dark:border-gray-700 border-gray-200 rounded-lg p-3 shadow-lg">
        <p className="font-medium dark:text-white text-gray-900 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm dark:text-white text-gray-600">
            {entry.name}: <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsSection = () => {
  const [viewType, setViewType] = useState('device');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="dark:text-white text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const totalClicks = mockData.timeline.reduce((sum, item) => sum + item.clicks, 0);
  const peakClicks = Math.max(...mockData.timeline.map(item => item.clicks));
  const avgClicks = Math.round(totalClicks / mockData.timeline.length);
  
  const pieData = viewType === 'device' ? mockData.devices : mockData.browsers;
  const totalPieValue = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b dark:border-gray-700 border-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={(e)=>navigate(-1)} className="p-2 dark:bg-gray-800 dark:hover:bg-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 dark:text-white text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold dark:text-white text-gray-900">Analytics</h1>
                <p className="dark:text-white text-gray-600 text-xs sm:text-sm mt-1">Link performance overview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <MetricCard
            icon={Eye}
            title="Total Clicks"
            value={totalClicks.toLocaleString()}
            change={12}
          />
          <MetricCard
            icon={TrendingUp}
            title="Peak Performance"
            value={peakClicks}
            change={8}
          />
          <MetricCard
            icon={Calendar}
            title="Daily Average"
            value={avgClicks}
            change={5}
          />
          <MetricCard
            icon={Monitor}
            title="Top Device"
            value="Mobile"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Timeline Chart */}
          <ChartContainer title="Click Timeline">
            <ResponsiveContainer width="100%" height={220} minHeight={180}>
              <LineChart data={mockData.timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#1e40af" 
                  strokeWidth={2}
                  dot={{ fill: '#1e40af', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#1e40af' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Distribution Chart */}
          <ChartContainer 
            title="Traffic Distribution"
            action={
              <select
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                className="text-xs sm:text-sm border dark:text-white text-gray-700 dark:border-gray-700 border-gray-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-600 focus:border-transparent"
              >
                <option className='dark:text-white text-gray-700 dark:bg-gray-700 cursor-pointer' value="device">Device</option>
                <option className='dark:text-white text-gray-700 dark:bg-gray-700 cursor-pointer' value="browser">Browser</option>
              </select>
            }
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <ResponsiveContainer width="100%" height={180} minHeight={140} className="sm:w-3/5">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full sm:w-40 space-y-2 sm:space-y-3">
                {pieData.map((item, index) => {
                  const percentage = Math.round((item.value / totalPieValue) * 100);
                  return (
                    <div key={item.name} className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium dark:text-white text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs dark:text-white opacity-70 text-gray-600">
                          {item.value} ({percentage}%)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 sm:mt-8 shadow">
          <Card className="p-4 sm:p-6 dark:bg-gradient-to-br bg-white dark:from-gray-700 dark:to-gray-900">
            <h3 className="text-base sm:text-lg font-semibold dark:text-white text-gray-900 mb-2 sm:mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-600 mb-1">94.2%</p>
                <p className="text-sm dark:text-white text-gray-600">Engagement Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-600 mb-1">0.8s</p>
                <p className="text-sm dark:text-white text-gray-600">Avg Load Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600 mb-1">28</p>
                <p className="text-sm dark:text-white text-gray-600">Countries</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;