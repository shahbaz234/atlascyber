import React from 'react';
import { ShieldExclamationIcon, CheckCircleIcon, ClockIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';

const mockIncidents = [
  { id: 'INC-9011', title: 'Ransomware Activity Detected', status: 'Open', severity: 'Critical', assignee: 'Unassigned', time: '10 mins ago', tags: ['Malware', 'Endpoint'] },
  { id: 'INC-9010', title: 'Multiple Failed Logins', status: 'In Progress', severity: 'High', assignee: 'Alex M.', time: '2 hours ago', tags: ['Identity', 'Auth'] },
  { id: 'INC-9009', title: 'Suspicious Port Scan', status: 'In Progress', severity: 'Medium', assignee: 'Sarah J.', time: '5 hours ago', tags: ['Network'] },
  { id: 'INC-9008', title: 'DLP Policy Violation', status: 'Resolved', severity: 'High', assignee: 'Mike T.', time: '1 day ago', tags: ['Data', 'Compliance'] },
];

export default function IncidentsPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Incident Response</h1>
          <p className="text-gray-400 text-sm mt-1.5 font-medium">Track, manage, and resolve active security incidents.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-[#1a1a24] hover:bg-[#252533] border border-[#2d2d3d] text-white text-sm font-semibold rounded-lg transition-all shadow-lg">
             Export Report
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all">
            <PlusIcon className="w-4 h-4 mr-2" /> Declare Incident
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Incidents', value: '4', icon: ShieldExclamationIcon, color: 'text-rose-400', bg: 'bg-rose-500/10' },
          { label: 'In Progress', value: '12', icon: ClockIcon, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Resolved (7d)', value: '45', icon: CheckCircleIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Unassigned', value: '2', icon: UserGroupIcon, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111118]/80 backdrop-blur-xl border border-[#1f1f2e] p-5 rounded-2xl flex items-center space-x-4 shadow-xl">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Incident List */}
      <div className="bg-[#111118]/80 backdrop-blur-xl border border-[#1f1f2e] rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-[#1f1f2e] flex justify-between items-center bg-[#0a0a0f]/50">
          <h3 className="font-semibold text-white">Active Incidents</h3>
          <div className="flex space-x-2 text-sm">
            <button className="px-3 py-1 bg-[#1a1a24] text-white rounded border border-[#2d2d3d]">All</button>
            <button className="px-3 py-1 text-gray-400 hover:text-white">Assigned to Me</button>
          </div>
        </div>
        <div className="divide-y divide-[#1f1f2e]">
          {mockIncidents.map((incident) => (
            <div key={incident.id} className="p-5 hover:bg-[#151520] transition-colors group cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full ${
                    incident.severity === 'Critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' :
                    incident.severity === 'High' ? 'bg-orange-500' : 'bg-amber-500'
                  }`}></div>
                  <div>
                    <h4 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">{incident.title}</h4>
                    <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                      <span className="font-mono text-cyan-400 text-xs">{incident.id}</span>
                      <span>•</span>
                      <span>Opened {incident.time}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1 text-gray-600" />
                        {incident.assignee}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      {incident.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#1a1a24] border border-[#2d2d3d] rounded text-[10px] uppercase font-bold text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    incident.status === 'Open' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    incident.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {incident.status}
                  </span>
                  <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
