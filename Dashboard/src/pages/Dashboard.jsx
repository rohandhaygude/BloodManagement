import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar 
} from 'recharts';
import { 
  Droplet, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeRequests: 0,
    fulfilledRequests: 0,
    totalDonors: 0,
    bloodGroups: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/blood/stats', {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        toast.error('Failed to sync data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const lineChartData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 12 },
    { name: 'Fri', count: 8 },
    { name: 'Sat', count: 15 },
    { name: 'Sun', count: stats.totalRequests || 10 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl relative overflow-hidden group hover:border-red-500/30 transition-all duration-300 shadow-lg">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl bg-gray-800 border border-gray-700`}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
            <ArrowUpRight size={14} /> {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 animate-pulse">Syncing Command Center...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Main Monitor</h1>
          <p className="text-gray-400 mt-1">Live overview of PulseConnect ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-gray-300">
            <Calendar size={16} className="text-red-500" />
            Last 7 Days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value={stats.totalRequests} icon={Droplet} color="from-red-500 to-red-400" trend="+12%" />
        <StatCard title="Active Needs" value={stats.activeRequests} icon={Clock} color="from-amber-500 to-amber-400" trend="+5%" />
        <StatCard title="Saved Lives" value={stats.fulfilledRequests} icon={CheckCircle2} color="from-green-500 to-green-400" trend="+18%" />
        <StatCard title="Total Donors" value={stats.totalDonors} icon={Users} color="from-blue-500 to-blue-400" trend="+24k" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-red-500" /> Activity Analytics
            </h2>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl flex flex-col">
          <h2 className="text-xl font-bold mb-8">Blood Availability</h2>
          <div className="flex-1 space-y-6">
            {stats.bloodGroups?.length > 0 ? stats.bloodGroups.map((group, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-gray-300">{group.name}</span>
                  <span className="text-white">{group.value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000" 
                    style={{ width: `${group.value}%` }}
                  ></div>
                </div>
              </div>
            )) : (
              <div className="flex-1 flex items-center justify-center text-gray-600 italic">
                Awaiting detailed matrix...
              </div>
            )}
          </div>
          <button className="mt-8 py-3 w-full bg-gray-800 hover:bg-gray-700 rounded-xl transition-all text-sm font-semibold text-gray-300">
            Export Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
