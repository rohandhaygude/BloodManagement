import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 py-20 px-6 relative overflow-hidden text-sans text-white border-t border-gray-800">
      {/* Glow Effects */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-800 rounded-2xl mb-6 shadow-sm border border-gray-700">
            <MessageSquare className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Send Us A Message
          </h2>
          <p className="text-gray-400">
            Have questions, issues, or want to partner up? Get in touch with our team below.
          </p>
        </div>

        <form onSubmit={handleMessage} className="w-full bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 p-8 md:p-10 rounded-3xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-500" /></div>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="John" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition placeholder-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-500" /></div>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition placeholder-gray-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-500" /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="mail@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition placeholder-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-500" /></div>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} required maxLength={10} placeholder="10 Digits Number" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition placeholder-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Message</label>
            <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Type your message here..." className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition placeholder-gray-500 resize-none" />
          </div>

          <div className="text-center pt-2">
            <button 
              disabled={loading}
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 bg-gray-100 hover:bg-white text-gray-900 font-bold rounded-xl text-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform transform hover:-translate-y-1 active:scale-[0.98]"
            >
              <Send size={20} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
