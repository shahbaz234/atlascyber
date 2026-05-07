export default function RiskScoreGauge({ score }: { score: number }) {
  // Mock visually stunning gauge
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-[#1f1f2e]"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-cyan-400 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score || 85}</span>
          <span className="text-xs text-cyan-400 font-medium">/ 100</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-400 text-center">Overall Security Posture is <span className="text-cyan-400 font-medium">Good</span></p>
    </div>
  );
}
