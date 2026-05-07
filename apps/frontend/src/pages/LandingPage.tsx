import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  MagnifyingGlassCircleIcon, 
  LockClosedIcon,
  ChartBarSquareIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Real-time Vulnerability Scanning',
    description: 'Continuously monitor your entire infrastructure for known vulnerabilities and misconfigurations.',
    icon: MagnifyingGlassCircleIcon,
  },
  {
    name: 'AI-Powered SOC Alerts',
    description: 'Reduce noise with intelligent alert correlation and automated threat detection.',
    icon: BoltIcon,
  },
  {
    name: 'Unified Asset Inventory',
    description: 'Get a single pane of glass view of all your cloud, server, and endpoint assets.',
    icon: CubeTransparentIcon,
  },
  {
    name: 'Compliance Automation',
    description: 'Automate evidence collection and audit reporting for SOC2, ISO27001, and more.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Identity & Access Management',
    description: 'Secure your organization with multi-tenant isolation and strict RBAC controls.',
    icon: LockClosedIcon,
  },
  {
    name: 'Predictive Risk Analytics',
    description: 'Identify potential security gaps before they are exploited with our risk scoring engine.',
    icon: ChartBarSquareIcon,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-[#0a0a0f] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
               <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mr-3">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">AtlasCyber</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Products</a>
              <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
              <a href="#about" className="hover:text-white transition-colors">Enterprise</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-4 py-2">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-cyan-500/10 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-60 md:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
            <BoltIcon className="w-4 h-4 mr-2" /> Powered by Advanced AI
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            The New Standard in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Enterprise Security</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
            Protect your entire digital ecosystem with AtlasCyber. A unified multi-tenant platform for vulnerability management, real-time threat detection, and continuous compliance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register" className="w-full sm:w-auto bg-white text-black text-lg font-bold px-10 py-4 rounded-full hover:bg-gray-200 transition-all shadow-xl">
              Start Free Trial
            </Link>
            <button className="w-full sm:w-auto bg-[#1a1a24] text-white border border-gray-800 text-lg font-bold px-10 py-4 rounded-full hover:bg-[#252533] transition-all">
              Request Demo
            </button>
          </div>
          
          <div className="mt-20 relative px-4">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20"></div>
             <div className="relative bg-[#111118] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                 alt="Dashboard Preview" 
                 className="w-full h-auto opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-4">Core Products</h2>
            <p className="text-4xl md:text-5xl font-black text-white">Everything you need to stay secure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="p-8 bg-[#111118] border border-gray-800 rounded-3xl hover:border-cyan-500/50 transition-all group">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <feature.icon className="w-6 h-6 text-cyan-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.name}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#111118] to-[#0a0a0f] border border-gray-800 rounded-[40px] p-12 md:p-24 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to secure your organization?</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of enterprises who trust AtlasCyber to protect their most critical data.
            </p>
            <Link to="/register" className="inline-block bg-white text-black text-lg font-bold px-12 py-5 rounded-full hover:bg-gray-200 transition-all shadow-2xl">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
             <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3">
              <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-xl font-bold tracking-tighter">AtlasCyber</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 AtlasCyber Inc. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
