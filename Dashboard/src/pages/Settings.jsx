import React from 'react';
import { 
  Shield, 
  Settings as SettingsIcon, 
  Bell, 
  Smartphone, 
  Save,
  Cpu,
  Database,
  Lock
} from 'lucide-react';

const Settings = () => {
  const SettingSection = ({ icon: Icon, title, children }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
        <Icon className="text-red-500" size={24} />
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );

  const InputRow = ({ label, description, type = "text", placeholder }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <label className="block font-bold text-gray-200">{label}</label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full md:w-64 bg-gray-950 border border-gray-800 rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-sm"
      />
    </div>
  );

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">System Settings</h1>
        <p className="text-gray-400 mt-1">Configure core PulseConnect operational parameters.</p>
      </div>

      <SettingSection icon={SettingsIcon} title="General Protocol">
        <InputRow 
          label="Agency Identification" 
          description="Public name displayed across the network."
          placeholder="PulseConnect Central"
        />
        <InputRow 
          label="Support Frequency" 
          description="Primary contact email for emergency support."
          placeholder="hq@pulseconnect.com"
        />
      </SettingSection>

      <SettingSection icon={Shield} title="Security & Access">
        <InputRow 
          label="Admin Passcode" 
          description="Last updated 12 days ago."
          type="password"
          placeholder="••••••••••••"
        />
        <div className="flex items-center justify-between p-4 bg-red-900/10 border border-red-500/20 rounded-2xl">
          <div className="flex items-center gap-3">
            <Lock className="text-red-500" size={20} />
            <div>
              <p className="font-bold text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Enhanced biometric or token check.</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-red-600 rounded-full flex items-center px-1">
             <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
          </div>
        </div>
      </SettingSection>

      <SettingSection icon={Bell} title="Alert Hub">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Push Notifications for Critical Drops</span>
            <div className="w-12 h-6 bg-gray-800 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Daily Ops Summary Email</span>
            <div className="w-12 h-6 bg-red-600 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
            </div>
          </div>
        </div>
      </SettingSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border border-gray-800 flex items-center gap-4">
          <Cpu className="text-blue-500" size={32} />
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Engine Status</p>
            <p className="text-xl font-black text-white">OPTIMIZED</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border border-gray-800 flex items-center gap-4">
          <Database className="text-green-500" size={32} />
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">DB Integrity</p>
            <p className="text-xl font-black text-white">100.00%</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 gap-4">
        <button className="px-8 py-3 bg-gray-900 border border-gray-800 hover:bg-gray-800 rounded-xl font-bold transition-all text-sm">Reset to Default</button>
        <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all flex items-center gap-2">
          <Save size={18} /> Sync System
        </button>
      </div>
    </div>
  );
};

export default Settings;
