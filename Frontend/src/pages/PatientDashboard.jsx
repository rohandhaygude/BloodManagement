import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, Clock, CheckCircle, XCircle, LogOut, User, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../context';

const PatientDashboard = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser, authLoading } = useContext(Context);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const { data } = await axios.get(
          'https://bloodmanagement-9tbn.onrender.com/api/v1/blood/all',
          { withCredentials: true }
        );
        if (data.success) {
          // Filter only this patient's requests
          const myRequests = data.bloodRequests?.filter(
            (r) => r.patientId === user?._id || r.email === user?.email
          ) || [];
          setRequests(myRequests);
        }
      } catch {
        // No requests yet is fine
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchMyRequests();
    else setLoading(false);
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get(
        'https://bloodmanagement-9tbn.onrender.com/api/v1/user/patient/logout',
        { withCredentials: true }
      );
    } catch {}
    setIsAuthenticated(false);
    setUser({});
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const statusIcon = (status) => {
    if (status === 'Fulfilled') return <CheckCircle size={16} className="text-green-500" />;
    if (status === 'Rejected') return <XCircle size={16} className="text-red-500" />;
    return <Clock size={16} className="text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-xl">
            <Droplet size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold">PulseConnect</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User size={18} />
            <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-red-700 to-red-500 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.firstName}! 👋</h1>
            <p className="text-red-100 mt-1">Blood Group: <span className="font-bold text-white">{user?.blood || 'N/A'}</span></p>
          </div>
          <button
            onClick={() => navigate('/request')}
            className="flex items-center gap-2 bg-white text-red-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-red-50 transition"
          >
            <PlusCircle size={18} /> Request Blood
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">My Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Full Name', value: `${user?.firstName || ''} ${user?.lastName || ''}` },
              { label: 'Email', value: user?.email },
              { label: 'Phone', value: user?.phone },
              { label: 'Blood Group', value: user?.blood },
              { label: 'Gender', value: user?.gender },
              { label: 'Role', value: user?.role },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                <p className="text-white font-medium">{item.value || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My Blood Requests */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">My Blood Requests</h2>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : requests.length === 0 ? (
            <div className="text-center py-10">
              <Droplet size={40} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No blood requests yet.</p>
              <button
                onClick={() => navigate('/request')}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm transition"
              >
                Make a Request
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req._id} className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{req.bloodGroup} — {req.hospital}</p>
                    <p className="text-gray-400 text-xs mt-1">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {statusIcon(req.status)}
                    <span className="text-gray-300">{req.status || 'Pending'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
