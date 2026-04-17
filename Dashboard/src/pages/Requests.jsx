import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  Activity,
  MapPin,
  PhoneCall
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    withCredentials: true,
  });

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/blood/all', getAuthConfig());
      if (data.success) setRequests(data.bloodRequests);
    } catch (error) {
      toast.error('Sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/blood/update/${id}`, { status }, getAuthConfig());
      toast.success(`Request ${status}`);
      fetchRequests();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Erase this data point?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/blood/delete/${id}`, getAuthConfig());
        toast.success('Deleted');
        fetchRequests();
      } catch (error) {
        toast.error('Deletion failed');
      }
    }
  };

  const filtered = requests.filter(req => {
    const matchesSearch = req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Blood Requests</h1>
          <p className="text-gray-400 mt-1">Operational view of life-critical missions.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all">
          <Plus size={20} /> Deploy New Request
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search protocols by patient or sector..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-white"
          />
        </div>
        <div className="flex items-center gap-3 bg-gray-800/50 border border-gray-700 px-4 rounded-2xl">
          <Filter size={18} className="text-gray-500" />
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-transparent border-none text-gray-300 py-3 outline-none text-sm font-medium cursor-pointer"
          >
            <option value="All">All Operations</option>
            <option value="Pending">Active / Pending</option>
            <option value="Fulfilled">Successful / Fulfilled</option>
            <option value="Cancelled">Aborted / Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-20 text-center text-gray-600 animate-pulse">Scanning database...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-widest font-black">
                  <th className="px-8 py-6">Patient Protocol</th>
                  <th className="px-6 py-6 text-center">Group</th>
                  <th className="px-6 py-6">Sector / Location</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-6 py-6">Urgency</th>
                  <th className="px-8 py-6 text-right">Commands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {filtered.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-800 rounded-xl flex items-center justify-center text-red-500 border border-gray-700 font-bold">
                          {req.patientName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-md">{req.patientName}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <PhoneCall size={12} className="text-gray-600" /> {req.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-900/20 text-red-500 border border-red-500/20 font-black text-lg">
                          {req.bloodGroup}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-600" /> {req.location}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        req.status === 'Fulfilled' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        req.status === 'Cancelled' ? 'bg-gray-800 text-gray-500 border border-gray-700' : 
                        'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <Activity size={14} className={req.urgency === 'Critical' ? 'text-red-500' : 'text-blue-500'} />
                        <span className={req.urgency === 'Critical' ? 'text-red-500' : 'text-gray-300'}>
                          {req.urgency}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {req.status === 'Pending' && (
                          <button onClick={() => handleStatusUpdate(req._id, 'Fulfilled')} className="p-2 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors">
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(req._id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
