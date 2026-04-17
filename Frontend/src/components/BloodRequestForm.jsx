import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { User, Phone, MapPin, AlertCircle, Droplet, Send } from "lucide-react";

const BloodRequestForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/blood/add",
        {
          patientName: `${firstName} ${lastName}`.trim(),
          bloodGroup,
          location: address,
          phone: String(phone),
          urgency
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setFirstName(""); setLastName(""); setPhone(""); setBloodGroup(""); setUrgency("Medium"); setAddress("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Request failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-900/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-red-900/30 rounded-2xl mb-6 border border-red-500/20">
            <Droplet className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Submit Blood Request
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Filling out this form will notify our admin team and registered donors in your area. Please provide accurate details for emergency situations.
          </p>
        </div>

        <form onSubmit={handleRequest} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-500" /></div>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="Patient First Name" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition text-white placeholder-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-500" /></div>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Patient Last Name" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition text-white placeholder-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Contact Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-500" /></div>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} required maxLength={10} placeholder="10 Digits Number" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition text-white placeholder-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Required Blood Group</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Droplet className="h-5 w-5 text-gray-500" /></div>
                <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition text-white appearance-none cursor-pointer">
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group, index) => <option key={index} value={group}>{group}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Urgency Level</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><AlertCircle className="h-5 w-5 text-gray-500" /></div>
                <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition text-white appearance-none cursor-pointer">
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Location / Hospital Address</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none"><MapPin className="h-5 w-5 text-gray-500" /></div>
              <textarea rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Hospital Name & Complete Address" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition text-white placeholder-gray-500 resize-none" />
            </div>
          </div>

          <div className="pt-4 text-center">
            <button 
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-transform transform hover:-translate-y-1 active:scale-[0.98]"
            >
              <Send size={20} />
              {loading ? "Submitting Request..." : "Broadcast Blood Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodRequestForm;