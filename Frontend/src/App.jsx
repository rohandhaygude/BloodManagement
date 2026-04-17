import React, { useEffect, useContext } from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Request from './pages/Request'
import PublicLogin from './pages/Login' // Public login
import Register from './pages/Register'
import PatientDashboard from './pages/PatientDashboard'

// Admin Pages
import AdminLogin from './pages/Login' // Dashboard login (renamed to avoid conflict)
import Dashboard from './pages/Dashboard'
import Requests from './pages/Requests'
import Donors from './pages/Donors'
import Settings from './pages/Settings'

// Components
import Navbar from './components/Navbar'
import Layout from './components/Layout'

// Context
import { Context } from './context.jsx'

const App = () => {
  const {
    setIsAuthenticated,
    setUser,
    setIsAdminAuthenticated,
    setAdminUser,
    setAuthLoading
  } = useContext(Context);

  useEffect(() => {
    // Check for regular user authentication (Patient/Donor)
    const fetchUser = async () => {
      const endpoints = [
        "https://bloodmanagement-9tbn.onrender.com/api/v1/user/patient/me",
        "https://bloodmanagement-9tbn.onrender.com/api/v1/user/donor/me",
      ];

      for (const url of endpoints) {
        try {
          const response = await axios.get(url, { withCredentials: true });
          setIsAuthenticated(true);
          setUser(response.data.user);
          setAuthLoading(false);
          return;
        } catch {
          // try next endpoint
        }
      }

      // None succeeded — user is not logged in
      setIsAuthenticated(false);
      setUser({});
      setAuthLoading(false);
    };

    // Check for admin authentication
    const fetchAdminUser = async () => {
      const adminToken = localStorage.getItem('adminToken');
      const isAdmin = localStorage.getItem('adminAuth') === 'true';

      if (isAdmin && adminToken) {
        try {
          const response = await axios.get('https://bloodmanagement-9tbn.onrender.com/api/v1/user/admin/me', {
            headers: { Authorization: `Bearer ${adminToken}` },
            withCredentials: true
          });
          setIsAdminAuthenticated(true);
          setAdminUser(response.data.user);
        } catch (error) {
          // Admin token invalid, clear it
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminAuth');
          setIsAdminAuthenticated(false);
          setAdminUser({});
        }
      } else {
        setIsAdminAuthenticated(false);
        setAdminUser({});
      }
    };

    fetchUser();
    fetchAdminUser();
  }, [setIsAuthenticated, setUser, setIsAdminAuthenticated, setAdminUser]);

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<><Navbar /><Home /></>} />
          <Route path='/request' element={<><Navbar /><Request /></>} />
          <Route path='/about' element={<><Navbar /><About /></>} />
          <Route path='/login' element={<><Navbar /><PublicLogin /></>} />
          <Route path='/register' element={<><Navbar /><Register /></>} />
          <Route path='/patient/dashboard' element={<PatientDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<Layout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="requests" element={<Requests />} />
            <Route path="donors" element={<Donors />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <ToastContainer position='top-center' />
    </>
  )
}

export default App
