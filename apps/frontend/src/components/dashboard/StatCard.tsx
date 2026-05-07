import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'blue' | 'red' | 'yellow' | 'green' | 'orange' | 'purple';
  trend?: { value: number; isPositive: boolean };
}

const colorStyles = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10',
  red: 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/10',
  yellow: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10',
  green: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-orange-500/10',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/10',
};

export default function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#111118] border border-[#1f1f2e] p-6 transition-all duration-300 hover:border-gray-600 hover:shadow-xl group`}>
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40 ${colorStyles[color].split(' ')[1]}`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl border ${colorStyles[color]} backdrop-blur-md`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
          </div>
        </div>
        <div className="mt-4 flex items-baseline">
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          {trend && (
            <div className={`ml-3 flex items-baseline text-sm font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.isPositive ? (
                <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 mr-1" aria-hidden="true" />
              ) : (
                <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 mr-1" aria-hidden="true" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
