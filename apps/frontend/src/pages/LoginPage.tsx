import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheckIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@atlascyber.com');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/20 mb-4">
            <ShieldCheckIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">AtlasCyber</h1>
          <p className="text-gray-500 mt-2">Enterprise Security Intelligence</p>
        </div>

        {/* Card */}
        <div className="bg-[#111118] border border-[#1f1f2e] rounded-3xl p-8 shadow-2xl shadow-black/50">
          <h2 className="text-xl font-bold text-white mb-6">Welcome Back</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <a href="#" className="text-xs text-cyan-500 hover:text-cyan-400">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[#1f1f2e] bg-[#0a0a0f] text-cyan-600 focus:ring-cyan-500/50"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyan-500 hover:text-cyan-400 font-bold">
                Get Started
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-600 mt-8 uppercase tracking-widest font-bold">
          Protected by Atlas Guard AI
        </p>
      </div>
    </div>
  );
}
