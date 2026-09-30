'use me';
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { GovHeader } from '@/components/shared/GovHeader';
import { DemoCredentialsBar } from '@/components/shared/DemoCredentialsBar';
import { CloudRain, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);

      if (res.success && res.role) {
        if (res.role === 'trainee') router.push('/trainee/dashboard');
        else if (res.role === 'trainer') router.push('/trainer/dashboard');
        else if (res.role === 'admin') router.push('/admin/dashboard');
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
      }
    }, 300);
  };

  const handleSelectDemoCredentials = (selectedEmail: string, selectedPass: string) => {
    setEmail(selectedEmail);
    setPassword(selectedPass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GovHeader />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center items-center">
        {/* Branding header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#0b192c] flex items-center justify-center text-sky-400 shadow-md">
              <CloudRain className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">CAPACITY CONNECT</h1>
              <p className="text-xs text-slate-500 font-medium">Digital Learning & Competency Portal</p>
            </div>
          </Link>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Ministry of Earth Sciences • India Meteorological Department
          </p>
        </div>

        {/* Two-Column Grid: Demo Bar + Login Card */}
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Login Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Official Portal Login</h2>
            <p className="text-xs text-slate-500 mb-6">Enter your registered organizational email and password.</p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Official Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. trainee@capacityconnect.gov.in"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#0b192c] hover:bg-[#1e3a8a] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Sign In to Capacity Connect</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
              Technical Assistance: <span className="text-slate-600 font-medium">helpdesk@capacityconnect.gov.in</span>
            </div>
          </div>

          {/* Right Column: Demo Access Section */}
          <div className="lg:col-span-6 space-y-4">
            <DemoCredentialsBar onSelectCredentials={handleSelectDemoCredentials} autoLogin={true} />

            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/80 text-sky-900 text-xs space-y-2">
              <div className="flex items-center space-x-2 font-bold text-sky-950">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Smart India Hackathon Prototype Guarantee</span>
              </div>
              <p className="text-[11px] text-sky-800 leading-relaxed">
                This frontend-only prototype runs state completely inside local storage. Selecting any persona above auto-authenticates and redirects directly into the role's dashboard.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
