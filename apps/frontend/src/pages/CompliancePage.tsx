import React, { useState } from 'react';
import { ShieldCheckIcon, DocumentTextIcon, ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const frameworks = [
  { id: 'soc2', name: 'SOC 2 Type II', score: 92, status: 'Passing', lastAudit: 'Oct 12, 2023', totalControls: 64, passedControls: 59 },
  { id: 'iso27001', name: 'ISO 27001', score: 85, status: 'Needs Attention', lastAudit: 'Jan 05, 2024', totalControls: 114, passedControls: 97 },
  { id: 'gdpr', name: 'GDPR', score: 100, status: 'Passing', lastAudit: 'Mar 15, 2024', totalControls: 32, passedControls: 32 },
  { id: 'hipaa', name: 'HIPAA', score: 78, status: 'Failing', lastAudit: 'Dec 01, 2023', totalControls: 48, passedControls: 37 },
];

const mockControls = [
  { id: 'CC6.1', name: 'Logical Access Security', framework: 'SOC 2', status: 'Passed', evidence: 'SSO Configuration' },
  { id: 'CC6.2', name: 'User Access Revocation', framework: 'SOC 2', status: 'Failed', evidence: 'Missing HR Offboarding Logs' },
  { id: 'A.8.1.1', name: 'Inventory of Assets', framework: 'ISO 27001', status: 'Passed', evidence: 'Asset Management DB' },
  { id: 'A.9.2.1', name: 'User Registration', framework: 'ISO 27001', status: 'Passed', evidence: 'IdP Logs' },
  { id: 'A.9.2.2', name: 'User Access Provisioning', framework: 'ISO 27001', status: 'Failed', evidence: 'Missing approval tickets' },
];

export default function CompliancePage() {
  const [activeFramework, setActiveFramework] = useState('soc2');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Compliance Center</h1>
          <p className="text-gray-400 text-sm mt-1.5 font-medium">Monitor adherence to regulatory standards and security frameworks.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-[#1a1a24] hover:bg-[#252533] border border-[#2d2d3d] text-white text-sm font-semibold rounded-lg shadow-lg transition-all">
            <DocumentTextIcon className="w-4 h-4 mr-2" /> Generate Report
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all">
            <ArrowPathIcon className="w-4 h-4 mr-2" /> Run Assessment
          </button>
        </div>
      </div>

      {/* Framework Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {frameworks.map(fw => (
          <div 
            key={fw.id} 
            onClick={() => setActiveFramework(fw.id)}
            className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
              activeFramework === fw.id 
                ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                : 'bg-[#111118]/80 backdrop-blur-xl border-[#1f1f2e] hover:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-200">{fw.name}</h3>
              <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${
                fw.status === 'Passing' ? 'bg-emerald-500/20 text-emerald-400' :
                fw.status === 'Needs Attention' ? 'bg-amber-500/20 text-amber-400' :
                'bg-rose-500/20 text-rose-400'
              }`}>
                {fw.status}
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{fw.score}<span className="text-lg text-gray-500">%</span></p>
                <p className="text-xs text-gray-500 mt-1">Controls: {fw.passedControls}/{fw.totalControls}</p>
              </div>
              <div className="w-12 h-12 relative">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#1f1f2e]" />
                  <circle 
                    cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={(2 * Math.PI * 20) * (1 - fw.score / 100)}
                    className={fw.score === 100 ? 'text-emerald-500' : fw.score > 80 ? 'text-cyan-500' : 'text-amber-500'} 
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Control Status Details */}
      <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] shadow-2xl overflow-hidden mt-8">
        <div className="p-5 border-b border-[#1f1f2e] flex justify-between items-center bg-[#0a0a0f]/50">
          <h3 className="font-semibold text-white">Continuous Control Monitoring</h3>
          <div className="flex space-x-2 text-sm">
            <button className="px-3 py-1 bg-[#1a1a24] text-white rounded border border-[#2d2d3d]">All Controls</button>
            <button className="px-3 py-1 text-gray-400 hover:text-white">Failing Only</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-[#0a0a0f]">
              <tr>
                <th className="px-6 py-4 font-semibold">Control ID</th>
                <th className="px-6 py-4 font-semibold">Requirement</th>
                <th className="px-6 py-4 font-semibold">Framework</th>
                <th className="px-6 py-4 font-semibold">Evidence source</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f2e]/50">
              {mockControls.map((control, i) => (
                <tr key={i} className="hover:bg-[#151520] transition-colors">
                  <td className="px-6 py-4 font-mono text-cyan-400">{control.id}</td>
                  <td className="px-6 py-4 text-gray-200 font-medium">{control.name}</td>
                  <td className="px-6 py-4 text-gray-400">{control.framework}</td>
                  <td className="px-6 py-4 text-gray-400 flex items-center">
                    <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-600" />
                    {control.evidence}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      control.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {control.status === 'Passed' ? (
                        <ShieldCheckIcon className="w-4 h-4 mr-1" />
                      ) : (
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      )}
                      {control.status}
                    </span>
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
