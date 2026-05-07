import React from 'react';

const mockScans = [
  { id: 'SCN-1002', target: 'Production API Cluster', status: 'Completed', findings: 12 },
  { id: 'SCN-1003', target: 'Internal VPN Gateway', status: 'Running', findings: 0 },
  { id: 'SCN-1004', target: 'Customer DB Replica', status: 'Failed', findings: 0 },
];

export default function RecentScans() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-[#111118] border-b border-[#1f1f2e]">
          <tr>
            <th className="px-4 py-3 font-medium">Scan ID</th>
            <th className="px-4 py-3 font-medium">Target</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Findings</th>
          </tr>
        </thead>
        <tbody>
          {mockScans.map((scan) => (
            <tr key={scan.id} className="border-b border-[#1f1f2e]/50 hover:bg-[#151520] transition-colors">
              <td className="px-4 py-3 font-mono text-cyan-400">{scan.id}</td>
              <td className="px-4 py-3 text-gray-300 font-medium">{scan.target}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  scan.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                  scan.status === 'Running' ? 'bg-blue-500/10 text-blue-400 animate-pulse' :
                  'bg-rose-500/10 text-rose-400'
                }`}>
                  {scan.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-medium text-gray-300">{scan.findings || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
