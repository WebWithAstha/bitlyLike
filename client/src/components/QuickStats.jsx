import React, { useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { fetchQuickStats } from '../store/actions/linkActions';
import { useDispatch, useSelector } from 'react-redux';

// Static dummy data for now
const stats = [
  {
    _id: '2025-04-01',
    totalLinks: 5,
    activeLinks: 4,
    expiredLinks: 1,
  },
  {
    _id: '2025-04-02',
    totalLinks: 7,
    activeLinks: 6,
    expiredLinks: 1,
  },
  {
    _id: '2025-04-03',
    totalLinks: 3,
    activeLinks: 1,
    expiredLinks: 2,
  },
  {
    _id: '2025-04-04',
    totalLinks: 8,
    activeLinks: 5,
    expiredLinks: 3,
  },
  {
    _id: '2025-04-05',
    totalLinks: 10,
    activeLinks: 8,
    expiredLinks: 2,
  },
];

const QuickStats = () => {
  const dispatch = useDispatch();

  const { quick } = useSelector((state) => state.links);
  useEffect(() => {
    if (quick===null) {
      dispatch(fetchQuickStats());
    }
  }, [dispatch]);

  


  return (
    quick && 
    <div className="w-full h-96 max-w-5xl mx-auto px-6 py-8 rounded-2xl border dark:border-gray-700 border-gray-300">

      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpired" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />

            <Area
              type="monotone"
              dataKey="activeLinks"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorActive)"
              name="Active Links"
            />
            <Area
              type="monotone"
              dataKey="expiredLinks"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorExpired)"
              name="Expired Links"
            />
            <Line
              type="monotone"
              dataKey="totalLinks"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Total Links"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuickStats;
