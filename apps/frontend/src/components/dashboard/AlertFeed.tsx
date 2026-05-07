import React from 'react';

const mockAlerts = [
  { id: 1, title: 'Suspicious login attempt', time: '2 mins ago', type: 'high' },
  { id: 2, title: 'Malware signature detected', time: '15 mins ago', type: 'critical' },
  { id: 3, title: 'Unusual outbound traffic', time: '1 hour ago', type: 'medium' },
  { id: 4, title: 'Firewall rule modified', time: '3 hours ago', type: 'low' },
];

export default function AlertFeed() {
  return (
    <div className="space-y-4">
      {mockAlerts.map(alert => (
        <div key={alert.id} className="flex items-start p-3 bg-[#151520] rounded-xl border border-[#1f1f2e] hover:bg-[#1a1a24] transition-colors cursor-pointer group">
          <div className="mt-1 mr-4 relative">
            <div className={`w-3 h-3 rounded-full ${
              alert.type === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse' :
              alert.type === 'high' ? 'bg-orange-500' :
              alert.type === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
            }`}></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{alert.title}</h4>
            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
              alert.type === 'critical' ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' :
              alert.type === 'high' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' :
              alert.type === 'medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 
              'text-blue-400 border-blue-500/30 bg-blue-500/10'
            }`}>
              {alert.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
