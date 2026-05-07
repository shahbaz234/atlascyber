export default function ComplianceScore() {
  const standards = [
    { name: 'SOC 2 Type II', score: 92 },
    { name: 'ISO 27001', score: 85 },
    { name: 'GDPR', score: 100 },
    { name: 'HIPAA', score: 78 },
  ];

  return (
    <div className="space-y-5">
      {standards.map(std => (
        <div key={std.name}>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-300">{std.name}</span>
            <span className="text-cyan-400 font-bold">{std.score}%</span>
          </div>
          <div className="w-full bg-[#151520] rounded-full h-2 border border-[#1f1f2e] overflow-hidden">
            <div 
              className={`h-2 rounded-full ${std.score === 100 ? 'bg-emerald-500' : std.score > 80 ? 'bg-cyan-500' : 'bg-amber-500'}`} 
              style={{ width: `${std.score}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
