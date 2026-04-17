import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  LayoutDashboard, 
  Droplet, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link 
    to={path}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'text-white' : 'group-hover:text-red-500 transition-colors'} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/user/admin/me', {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/v1/user/admin/logout', { withCredentials: true });
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminToken');
      toast.success("Logged out successfully");
      navigate('/login');
    } catch (error) {
      // Still logout locally if server check fails
      localStorage.removeItem('adminAuth');
      navigate('/login');
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Droplet, label: 'Blood Requests', path: '/requests' },
    { icon: Users, label: 'Donors', path: '/donors' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans selection:bg-red-500/30">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-gray-900 border-r border-gray-800 z-50 transition-transform duration-300 lg:translate-x-0 lg:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="h-10 w-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <Droplet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PulseConnect</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.path}
                {...item}
                active={location.pathname === item.path}
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-600/10 hover:text-red-500 transition-all w-full group"
            >
              <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-medium">Logout System</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-20 bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg text-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search command center..." 
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-red-400 border border-red-500 shadow-lg shadow-red-600/20 flex items-center justify-center font-bold text-white uppercase" title={user?.email || 'Admin'}>
              {user ? `${user.firstName[0]}${user.lastName[0]}` : 'AD'}
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
