import { useState } from 'react';
import { UserCircleIcon, BuildingOfficeIcon, CreditCardIcon, KeyIcon } from '@heroicons/react/24/outline';

const tabs = [
  { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  { id: 'organization', name: 'Organization', icon: BuildingOfficeIcon },
  { id: 'billing', name: 'Billing & Plan', icon: CreditCardIcon },
  { id: 'api', name: 'API Keys', icon: KeyIcon },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
          <p className="text-gray-400 text-sm mt-1.5 font-medium">Manage your account, organization, billing, and API access.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all">
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500/10 text-cyan-400 border border-blue-500/20'
                  : 'text-gray-400 hover:bg-[#1a1a24] hover:text-gray-200 border border-transparent'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500'}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-[#111118]/80 backdrop-blur-xl border border-[#1f1f2e] rounded-2xl shadow-2xl p-6 md:p-8 min-h-[500px]">
            
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-white border-b border-[#1f1f2e] pb-4">Personal Information</h3>
                
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-[#1f1f2e]">
                    <UserCircleIcon className="w-12 h-12 text-gray-500" />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-[#1a1a24] hover:bg-[#252533] border border-[#2d2d3d] text-white text-xs font-semibold rounded-lg transition-all">
                      Upload Avatar
                    </button>
                    <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">First Name</label>
                    <input type="text" defaultValue="Admin" className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input type="email" defaultValue="admin@atlascyber.com" className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed" disabled />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1f1f2e]">
                  <h3 className="text-sm font-bold text-white mb-4">Security</h3>
                  <div className="flex justify-between items-center p-4 bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1a1a24] hover:bg-[#252533] border border-[#2d2d3d] text-white text-xs font-semibold rounded-lg transition-all">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'organization' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-white border-b border-[#1f1f2e] pb-4">Organization Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Company Name</label>
                    <input type="text" defaultValue="Acme Corp" className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-cyan-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Workspace Slug</label>
                    <input type="text" defaultValue="acme-corp" className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed" disabled />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-white border-b border-[#1f1f2e] pb-4">Billing & Plan</h3>
                
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <CreditCardIcon className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-wider">Enterprise Plan</span>
                    <div className="mt-4 mb-6">
                      <p className="text-3xl font-bold text-white">$499 <span className="text-base font-normal text-gray-400">/ month</span></p>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-300 mb-6">
                      <li className="flex items-center">✓ Unlimited Assets</li>
                      <li className="flex items-center">✓ 24/7 SOC Monitoring</li>
                      <li className="flex items-center">✓ Automated Compliance Audits</li>
                    </ul>
                    <button className="px-4 py-2 bg-[#0a0a0f] border border-[#1f1f2e] text-white text-sm font-semibold rounded-lg hover:border-gray-500 transition-all">
                      Manage Subscription
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-white border-b border-[#1f1f2e] pb-4">API Keys</h3>
                <p className="text-sm text-gray-400">Use these keys to authenticate API requests from your internal tools.</p>
                
                <div className="p-4 bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Production Key</h4>
                    <p className="text-xs text-gray-500 mt-1 font-mono">sk_live_839f...4f9a</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">Copy</button>
                    <button className="text-xs font-semibold text-rose-400 hover:text-rose-300">Revoke</button>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-[#1a1a24] hover:bg-[#252533] border border-[#2d2d3d] text-white text-sm font-semibold rounded-lg transition-all mt-4 inline-flex items-center">
                  <KeyIcon className="w-4 h-4 mr-2" /> Generate New Key
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
