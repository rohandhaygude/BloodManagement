import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Droplet, CheckCircle, Clock, Users } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#64748b'];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeRequests: 0,
    fulfilledRequests: 0,
    totalDonors: 0,
    bloodGroups: []
  });
  const [loading, setLoading] = useState(true);

  const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    withCredentials: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/blood/stats', getAuthConfig());
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Mocked time data for line chart (no backend historical stats implemented yet)
  const lineChartData = [
    { name: 'Mon', requests: 2 },
    { name: 'Tue', requests: 5 },
    { name: 'Wed', requests: 8 },
    { name: 'Thu', requests: 4 },
    { name: 'Fri', requests: 10 },
    { name: 'Sat', requests: 3 },
    { name: 'Today', requests: stats.totalRequests },
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center transition-transform hover:scale-[1.02]">
      <div className={`p-4 rounded-full mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back, Admin. Real-time data from the live database.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Requests" 
          value={stats.totalRequests} 
          icon={<Droplet size={24} />} 
          color="bg-red-100 text-red-600" 
        />
        <StatCard 
          title="Active Requests" 
          value={stats.activeRequests} 
          icon={<Clock size={24} />} 
          color="bg-amber-100 text-amber-600" 
        />
        <StatCard 
          title="Completed" 
          value={stats.fulfilledRequests} 
          icon={<CheckCircle size={24} />} 
          color="bg-emerald-100 text-emerald-600" 
        />
        <StatCard 
          title="Total Donors" 
          value={stats.totalDonors} 
          icon={<Users size={24} />} 
          color="bg-blue-100 text-blue-600" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Requests Trend</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={3} dot={{r:4, strokeWidth:2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Blood Group Distribution</h2>
          <div className="h-80 w-full flex items-center justify-center">
            {stats.bloodGroups.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.bloodGroups}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.bloodGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
                <div className="text-gray-400">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
