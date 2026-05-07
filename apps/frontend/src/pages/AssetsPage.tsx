import React, { useState } from 'react';
import { ServerStackIcon, CloudIcon, ComputerDesktopIcon, MagnifyingGlassIcon, FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';

const mockAssets = [
  { id: 'AST-8291', name: 'prod-api-cluster-01', ip: '10.0.1.45', type: 'Server', status: 'Online', criticality: 'Critical', vulnerabilities: 3 },
  { id: 'AST-8292', name: 'db-primary-node', ip: '10.0.2.12', type: 'Database', status: 'Online', criticality: 'Critical', vulnerabilities: 0 },
  { id: 'AST-8293', name: 'dev-environment-vm', ip: '10.0.5.88', type: 'Cloud', status: 'Offline', criticality: 'Low', vulnerabilities: 12 },
  { id: 'AST-8294', name: 'marketing-site-host', ip: '10.0.1.99', type: 'Server', status: 'Online', criticality: 'Medium', vulnerabilities: 2 },
  { id: 'AST-8295', name: 'hr-desktop-jdoe', ip: '192.168.1.15', type: 'Endpoint', status: 'Online', criticality: 'Low', vulnerabilities: 5 },
  { id: 'AST-8296', name: 'payment-gateway-proxy', ip: '10.0.1.10', type: 'Server', status: 'Warning', criticality: 'Critical', vulnerabilities: 8 },
];

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Asset Management</h1>
          <p className="text-gray-400 text-sm mt-1.5 font-medium">Inventory and monitor all connected devices and cloud resources.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all">
            <PlusIcon className="w-4 h-4 mr-2" /> Add Asset
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-[#111118]/80 backdrop-blur-xl border border-[#1f1f2e] p-4 rounded-2xl shadow-xl">
        <div className="flex items-center bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg px-3 py-2 w-full md:w-96 focus-within:border-cyan-500/50 transition-all">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, IP, or ID..." 
            className="bg-transparent border-none focus:ring-0 text-sm text-gray-200 w-full ml-2 placeholder-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-[#0a0a0f] hover:bg-[#1a1a24] border border-[#1f1f2e] text-gray-300 text-sm font-medium rounded-lg transition-colors">
            <FunnelIcon className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-400 uppercase bg-[#0a0a0f] border-b border-[#1f1f2e]">
              <tr>
                <th className="px-6 py-4 font-semibold">Asset Name / ID</th>
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Criticality</th>
                <th className="px-6 py-4 font-semibold text-right">Vulns</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f2e]/50">
              {mockAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-[#151520] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-[#1a1a24] rounded-lg mr-3 border border-[#2d2d3d] group-hover:border-cyan-500/30 transition-colors">
                        {asset.type === 'Cloud' ? <CloudIcon className="w-5 h-5 text-cyan-400" /> : 
                         asset.type === 'Endpoint' ? <ComputerDesktopIcon className="w-5 h-5 text-blue-400" /> : 
                         <ServerStackIcon className="w-5 h-5 text-purple-400" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{asset.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{asset.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-300">{asset.ip}</td>
                  <td className="px-6 py-4 text-gray-400">{asset.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      asset.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      asset.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        asset.status === 'Online' ? 'bg-emerald-500' :
                        asset.status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></span>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      asset.criticality === 'Critical' ? 'text-rose-400' :
                      asset.criticality === 'Medium' ? 'text-orange-400' : 'text-blue-400'
                    }`}>
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold ${asset.vulnerabilities > 0 ? 'text-rose-400' : 'text-gray-500'}`}>
                      {asset.vulnerabilities}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-400 font-medium">
                    <button className="hover:text-cyan-400 transition-colors">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
