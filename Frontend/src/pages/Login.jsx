import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, Lock, Mail, Users, HeartPulse, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState('Patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If Admin is already logged in, push to admin dashboard.
    const token = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (isAdmin && token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/user/login',
        { email, password, role },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );

      toast.success(`Logged in successfully as ${data.user.role}!`);
      
      // Role-based routing
      if (data.user.role === 'Admin') {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else if (data.user.role === 'Donor') {
        navigate('/donor-dashboard'); // Requires adding DonorDashboard route
      } else {
        navigate('/'); // Patient goes to Home
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Check credentials and selected role.');
    }
  };

  const roles = [
    { name: 'Patient', icon: <Users size={16} className="inline mr-1" /> },
    { name: 'Donor', icon: <HeartPulse size={16} className="inline mr-1" /> },
    { name: 'Admin', icon: <ShieldAlert size={16} className="inline mr-1" /> }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        
        {/* Aesthetic Background Decal */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-bl-[100px] pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-red-100 dark:bg-red-900/30 rounded-2xl mb-4 shadow-sm">
            <Droplet className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl mb-8 relative z-10 shadow-inner">
          {roles.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setRole(r.name)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                role === r.name 
                  ? 'bg-white dark:bg-gray-800 text-red-600 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {r.icon} {r.name}
            </button>
          ))}
        </div>

        <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white placeholder-gray-400"
                placeholder={`your.email@example.com`}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgb(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] transition-all active:scale-[0.98] text-lg flex justify-center items-center gap-2"
          >
            <span>Sign In as {role}</span>
          </button>
          
          {role === 'Admin' && (
            <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-600">
              Demo Credentials: admin@bloodsource.com / admin123
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
