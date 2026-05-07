import React from 'react';

const mockTimeline = [
  { time: '10:45 AM', title: 'Incident INC-8402 Resolved', desc: 'Malware cleaned from Endpt-02' },
  { time: '09:12 AM', title: 'New Vulnerability Detected', desc: 'CVE-2024-3094 on DB Server' },
  { time: '08:00 AM', title: 'Daily Scan Completed', desc: '14 new assets discovered' },
];

export default function IncidentTimeline() {
  return (
    <div className="relative border-l border-[#1f1f2e] ml-3 space-y-6 pb-2">
      {mockTimeline.map((item, i) => (
        <div key={i} className="relative pl-6">
          <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-1.5 top-1.5 ring-4 ring-[#111118] shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          <div className="text-xs font-bold text-cyan-400 mb-1">{item.time}</div>
          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
