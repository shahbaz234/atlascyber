import StatCard from '../components/dashboard/StatCard';
import RiskScoreGauge from '../components/dashboard/RiskScoreGauge';
import VulnerabilityChart from '../components/dashboard/VulnerabilityChart';
import AlertFeed from '../components/dashboard/AlertFeed';
import RecentScans from '../components/dashboard/RecentScans';
import ComplianceScore from '../components/dashboard/ComplianceScore';
import IncidentTimeline from '../components/dashboard/IncidentTimeline';
import {
  ShieldCheckIcon,
  ServerIcon,
  ExclamationTriangleIcon,
  BugAntIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  // Mock data for UI presentation
  const stats = { total: 142 };
  const vulnStats = { bySeverity: { CRITICAL: 3 }, complianceScore: 89, riskScore: 78, trend: { value: 12, isPositive: true } };
  const alertStats = { open: 14 };
  const incidentStats = { active: 2, avgMttrHours: 4.5 };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">Security Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1.5 font-medium">Real-time overview of your organizational security posture</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-[#1a1a24] hover:bg-[#252533] border border-[#2d2d3d] text-white text-sm font-semibold rounded-lg transition-all shadow-lg">
            Download Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all">
            Run Scan
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-6">
        <StatCard title="Total Assets" value={stats.total} icon={ServerIcon} color="blue" />
        <StatCard title="Critical Vulns" value={vulnStats.bySeverity.CRITICAL} icon={BugAntIcon} color="red" trend={vulnStats.trend} />
        <StatCard title="Open Alerts" value={alertStats.open} icon={ExclamationTriangleIcon} color="yellow" />
        <StatCard title="Active Incidents" value={incidentStats.active} icon={ShieldCheckIcon} color="orange" />
        <StatCard title="Avg MTTR" value={`${incidentStats.avgMttrHours}h`} icon={ClockIcon} color="purple" />
        <StatCard title="Compliance" value={`${vulnStats.complianceScore}%`} icon={ChartBarIcon} color="green" />
      </div>

      {/* Main Grid 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Risk Score</h2>
          <RiskScoreGauge score={vulnStats.riskScore} />
        </div>

        {/* Vulnerability Trend */}
        <div className="lg:col-span-2 bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vulnerability Discovery Trend (7 Days)</h2>
          <VulnerabilityChart />
        </div>
      </div>

      {/* Main Grid 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Alert Feed */}
        <div className="lg:col-span-2 bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
              Live SOC Alerts
            </h2>
            <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">View All →</button>
          </div>
          <AlertFeed />
        </div>

        {/* Compliance Score */}
        <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-6 shadow-2xl">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Framework Compliance</h2>
          <ComplianceScore />
        </div>
      </div>

      {/* Main Grid 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-0 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-[#1f1f2e]">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Scans</h2>
          </div>
          <RecentScans />
        </div>
        <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-6 shadow-2xl">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Incident Timeline</h2>
          <IncidentTimeline />
        </div>
      </div>
    </div>
  );
}
