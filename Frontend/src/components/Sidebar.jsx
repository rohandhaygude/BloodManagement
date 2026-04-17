import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Droplet, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Requests', path: '/requests', icon: <Droplet size={20} /> },
    { name: 'Donors', path: '/donors', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen hidden md:flex flex-col shadow-sm">
      <div className="h-16 flex items-center px-6 border-b">
        <Droplet className="text-red-500 mr-2" size={24} />
        <h1 className="text-xl font-bold text-gray-800">BloodSource</h1>
      </div>
      <div className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-red-50 text-red-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
