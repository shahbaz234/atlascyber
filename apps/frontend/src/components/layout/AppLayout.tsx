import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ServerStackIcon, 
  ShieldExclamationIcon, 
  DocumentCheckIcon, 
  Cog8ToothIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Assets', href: '/assets', icon: ServerStackIcon },
  { name: 'Incidents', href: '/incidents', icon: ShieldExclamationIcon },
  { name: 'Compliance', href: '/compliance', icon: DocumentCheckIcon },
  { name: 'Settings', href: '/settings', icon: Cog8ToothIcon },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#111118] border-r border-[#1f1f2e] flex flex-col transition-all duration-300 shadow-2xl relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-[#1f1f2e] bg-gradient-to-r from-[#111118] to-[#151520]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldExclamationIcon className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 font-bold text-lg tracking-wide text-white">AtlasCyber</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Main Menu</div>
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/10 text-cyan-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-blue-500/20' 
                    : 'text-gray-400 hover:bg-[#1a1a24] hover:text-gray-200'
                }`}
              >
                <item.icon className={`flex-shrink-0 mr-3 h-5 w-5 transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                {item.name}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#1f1f2e]">
          <div className="flex items-center px-3 py-2 rounded-xl bg-[#151520] border border-[#1f1f2e] cursor-pointer hover:border-gray-700 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center ring-2 ring-gray-700">
              <UserCircleIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-500">Acme Corp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#0d0d14]">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#1f1f2e] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center bg-[#111118] border border-[#1f1f2e] rounded-lg px-3 py-1.5 w-96 focus-within:ring-1 focus-within:ring-cyan-500/50 focus-within:border-cyan-500/50 transition-all">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search assets, alerts, or IPs..." 
              className="bg-transparent border-none focus:ring-0 text-sm text-gray-200 w-full ml-2 placeholder-gray-600 py-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1f1f2e] transition-colors">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0a0a0f] animate-pulse" />
            </button>
            <div className="h-6 w-px bg-[#1f1f2e]"></div>
            <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">Documentation</button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          {children}
        </main>
      </div>
    </div>
  );
}
