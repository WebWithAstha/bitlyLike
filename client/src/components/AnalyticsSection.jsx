import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { fetchAnalytics } from '../store/actions/linkActions';

const COLORS = ['#6366F1', '#60A5FA', '#34D399', '#FBBF24', '#EC4899', '#8B5CF6'];

const AnalyticsSection = () => {
  const { selectedLinkAnalytics } = useSelector((state) => state.links);
  const analytics = selectedLinkAnalytics || {};
  const { id } = useParams();
  const dispatch = useDispatch();
  const [breakdownType, setBreakdownType] = useState('device');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAnalytics(id));
  }, [dispatch, id]);

  if (!analytics.clickTimeline) return null;

  const clicksOverTime = Object.entries(analytics.clickTimeline).map(([date, clicks]) => ({ date, clicks }));
  const totalClicks = clicksOverTime.reduce((sum, item) => sum + item.clicks, 0);
  const peakDay = [...clicksOverTime].sort((a, b) => b.clicks - a.clicks)[0];
  const deviceData = Object.entries(analytics.deviceStats || {}).map(([type, count]) => ({ type, count }));
  const browserData = Object.entries(analytics.browserStats || {}).map(([type, count]) => ({ type, count }));
  const breakdownData = breakdownType === 'device' ? deviceData : browserData;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 md:p-10 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm font-medium px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
      >
        ← Back
      </button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Clicks', color: 'indigo', value: totalClicks },
          { title: 'Peak Day', color: 'blue', value: peakDay?.clicks || 0, sub: peakDay?.date || 'N/A' },
          { title: 'Top Device', color: 'green', value: deviceData[0]?.type || 'N/A' },
          {
            title: 'Conversion',
            color: 'amber',
            value: deviceData.length > 0 ? Math.round((deviceData[0].count / totalClicks) * 100) + '%' : '0%'
          }
        ].map(({ title, color, value, sub }) => (
          <div key={title} className={`bg-${color}-50 dark:bg-${color}-900 opacity-60 rounded-xl p-5 shadow-sm`}>
            <h3 className={`text-sm font-medium uppercase tracking-wide text-${color}-600 dark:text-${color}-300`}>
              {title}
            </h3>
            <p className={`mt-2 text-2xl font-bold text-${color}-800 dark:text-${color}-100`}>{value}</p>
            {sub && <p className={`text-xs text-${color}-600 dark:text-${color}-300`}>{sub}</p>}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Clicks Over Time</h2>
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full">
              {clicksOverTime.length} types
            </span>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={clicksOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="clicks" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {breakdownType === 'device' ? 'Device' : 'Browser'} Breakdown
            </h2>
            <span className={`text-xs font-semibold ${breakdownType === 'device' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100'} px-3 py-1 rounded-full`}>
              {breakdownData.length} types
            </span>
          </div>
          <div className="p-6">
            <div className="mb-4 flex justify-end">
              <select
                value={breakdownType}
                onChange={(e) => setBreakdownType(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="device">Device</option>
                <option value="browser">Browser</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={breakdownData}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} clicks`, 'Count']}
                  contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;