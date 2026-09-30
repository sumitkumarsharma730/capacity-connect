'use me';
'use client';

import React from 'react';
import { User, Role } from '@/types';
import { UserCheck, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

interface DemoCredentialsBarProps {
  onSelectCredentials?: (email: string, pass: string) => void;
  autoLogin?: boolean;
}

export const DemoCredentialsBar: React.FC<DemoCredentialsBarProps> = ({ onSelectCredentials, autoLogin = false }) => {
  const { loginAsDemo } = useStore();
  const router = useRouter();

  const handleDemoClick = (role: Role, email: string, pass: string) => {
    if (onSelectCredentials) {
      onSelectCredentials(email, pass);
    }
    if (autoLogin) {
      loginAsDemo(role);
      if (role === 'trainee') router.push('/trainee/dashboard');
      else if (role === 'trainer') router.push('/trainer/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
    }
  };

  return (
    <div className="bg-slate-900/90 text-white rounded-xl p-5 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-sm tracking-wide text-slate-100">Prototype Demo Quick Access</h3>
        </div>
        <span className="text-[11px] bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-0.5 rounded-full font-medium">
          Frontend Mock Auth
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Click any role button below to autofill mock credentials and immediately test prototype role workflows:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Trainee Card */}
        <button
          type="button"
          onClick={() => handleDemoClick('trainee', 'trainee@capacityconnect.gov.in', 'Trainee@123')}
          className="group text-left p-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span className="font-semibold text-xs text-slate-100 group-hover:text-sky-300">Trainee Persona</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="text-[11px] font-medium text-slate-300">Rahul Kumar</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">trainee@capacityconnect.gov.in</div>
          <div className="mt-2 text-[10px] text-sky-400 font-medium flex items-center space-x-1">
            <span>Pass: Trainee@123</span>
          </div>
        </button>

        {/* Trainer Card */}
        <button
          type="button"
          onClick={() => handleDemoClick('trainer', 'trainer@capacityconnect.gov.in', 'Trainer@123')}
          className="group text-left p-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-xs text-slate-100 group-hover:text-teal-300">Trainer Persona</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="text-[11px] font-medium text-slate-300">Dr. Ananya Sharma</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">trainer@capacityconnect.gov.in</div>
          <div className="mt-2 text-[10px] text-teal-400 font-medium flex items-center space-x-1">
            <span>Pass: Trainer@123</span>
          </div>
        </button>

        {/* Admin Card */}
        <button
          type="button"
          onClick={() => handleDemoClick('admin', 'admin@capacityconnect.gov.in', 'Admin@123')}
          className="group text-left p-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-xs text-slate-100 group-hover:text-amber-300">Admin Persona</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="text-[11px] font-medium text-slate-300">Rajiv Mehta</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">admin@capacityconnect.gov.in</div>
          <div className="mt-2 text-[10px] text-amber-400 font-medium flex items-center space-x-1">
            <span>Pass: Admin@123</span>
          </div>
        </button>
      </div>
    </div>
  );
};
