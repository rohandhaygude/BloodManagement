import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, Lock, Users, HeartPulse, Droplet } from 'lucide-react';

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [email, setEmail]           = useState("");
  const [phone, setPhone]           = useState("");
  const [blood, setBlood]           = useState("");
  const [dob, setDob]               = useState("");
  const [gender, setGender]         = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole]             = useState("Patient");
  const [loading, setLoading]       = useState(false);

  const navigateTo = useNavigate();

  const endpointMap = {
    Patient: "http://localhost:3000/api/v1/user/register/patient",
    Donor:   "http://localhost:3000/api/v1/user/register/donor",
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !blood || !dob || !gender || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (phone.length < 10) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const endpoint = endpointMap[role] || endpointMap.Patient;
    const payload = { firstName, lastName, email, phone: String(phone), blood, dob, gender, password, role };

    setLoading(true);
    try {
      const res = await axios.post(
        endpoint,
        payload,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      if (res.data.user) setUser(res.data.user);
      navigateTo("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Check if backend is running.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 transition-colors">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden flex flex-col md:flex-row gap-10">
        
        {/* Aesthetic Background Decal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-bl-full pointer-events-none"></div>

        {/* Left Side Content */}
        <div className="md:w-1/3 flex flex-col justify-center relative z-10 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-8 md:pb-0 md:pr-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-2xl mb-6 shadow-sm">
            <Droplet className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Join Us Today</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Register as a Patient or Donor and become part of a vital, life-saving community network.
          </p>
          <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-3"><span className="text-red-500 text-lg">✓</span> Free & easy to register</li>
            <li className="flex items-center gap-3"><span className="text-red-500 text-lg">✓</span> Match instantly with donors</li>
            <li className="flex items-center gap-3"><span className="text-red-500 text-lg">✓</span> Secure role-based access</li>
          </ul>
        </div>

        {/* Right Side Form */}
        <div className="md:w-2/3 relative z-10">
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl mb-8 shadow-inner max-w-sm mx-auto md:mx-0">
            {["Patient", "Donor"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  role === r 
                    ? 'bg-white dark:bg-gray-800 text-red-600 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transform scale-[1.02]' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                }`}
              >
                {r === "Patient" ? <Users size={16} /> : <HeartPulse size={16} />} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleRegistration} className="space-y-5" noValidate>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="John" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="mail@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} required placeholder="9876543210" maxLength={10} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Blood Group</label>
                <select value={blood} onChange={(e) => setBlood(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white appearance-none cursor-pointer">
                  <option value="">Select Group</option>
                  {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date of Birth</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required max={new Date().toISOString().split("T")[0]} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white appearance-none cursor-pointer">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 6 characters" className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition dark:text-white" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98] text-lg flex justify-center items-center">
              {loading ? "Creating Account..." : `Register as ${role}`}
            </button>

            <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
              Already have an account? <Link to="/login" className="font-semibold text-red-600 hover:text-red-500 transition">Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
