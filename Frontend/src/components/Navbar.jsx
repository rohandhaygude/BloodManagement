import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, User, LogOut } from 'lucide-react';
import { Context } from '../context.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let rolePath = "patient";
      if (user?.role === "Admin") rolePath = "admin";
      else if (user?.role === "Donor") rolePath = "donor";

      await axios.get(`https://bloodmanagement-9tbn.onrender.com/api/v1/user/${rolePath}/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if backend fails, we should clear the local state if the error is 401
      if (err.response?.status === 401) {
         // Token was likely already expired, just proceed
      } else {
        toast.error("Logout failed on server, but clearing local session.");
      }
    } finally {
      setIsAuthenticated(false);
      setUser({});
      localStorage.removeItem("adminAuth");
      localStorage.removeItem("adminToken");
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:shadow-red-600/40 transition">
              <Droplet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition">
              PulseConnect
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition font-medium">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition font-medium">About Us</Link>
            <Link to="/request" className="text-gray-300 hover:text-white transition font-medium">Blood Requests</Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-white">{user?.name || "User"}</div>
                  <div className="text-xs text-red-400">{user?.role || "Patient"}</div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={16}/> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-gray-300 hover:text-white font-medium transition">
                  Login
                </Link>
                <Link to="/register" className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-transform transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
