import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  UserCheck, 
  ShieldAlert,
  ArrowUpRight,
  Droplet
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    withCredentials: true,
  });

  const fetchDonors = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/user/admin/donors', getAuthConfig());
      if (data.success) setDonors(data.donors);
    } catch (error) {
      toast.error('Registry sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDonors(); }, []);

  const filtered = donors.filter(d => 
    d.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.blood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Donor Registry</h1>
          <p className="text-gray-400 mt-1">Unified database of active life-savers.</p>
        </div>
        <div className="flex bg-gray-900 border border-gray-800 p-1.5 rounded-2xl">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-xl text-sm font-bold shadow-sm">Verified</button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-300 rounded-xl text-sm font-bold transition-all">Pending</button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10">
          <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Global Search</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Query by identity, blood type, or contact..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-white text-lg placeholder-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
             [1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-900 border border-gray-800 h-64 rounded-3xl animate-pulse"></div>
             ))
        ) : (
          filtered.map((donor) => (
            <div key={donor._id} className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:border-red-500/40 transition-all duration-300 group shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700 font-bold text-2xl text-gray-300 group-hover:text-white group-hover:scale-110 transition-all">
                    {donor.firstName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{donor.firstName} {donor.lastName}</h3>
                    <span className="flex items-center gap-1 text-xs text-green-500 font-bold mt-1">
                      <UserCheck size={14} /> ACTIVE DONOR
                    </span>
                  </div>
                </div>
                <div className="h-14 w-14 bg-red-900/20 rounded-2xl border border-red-500/20 flex flex-col items-center justify-center">
                  <span className="text-red-500 font-black text-xl leading-none">{donor.blood}</span>
                  <Droplet size={14} className="text-red-500/50 mt-1" />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Contact Protocol</span>
                  <span className="text-gray-300 font-bold">{donor.phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Digital Address</span>
                  <span className="text-gray-300 truncate max-w-[150px] font-bold">{donor.email}</span>
                </div>
              </div>

              <button className="w-full mt-8 py-3 bg-gray-800 hover:bg-red-600 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn">
                View Mission Profile <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          ))
        )}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="py-20 flex flex-col items-center text-gray-600 gap-4">
          <ShieldAlert size={64} className="opacity-20" />
          <p className="text-xl font-bold italic">Identity not found in central registry.</p>
        </div>
      )}
    </div>
  );
};

export default Donors;
