'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Target, Award, CheckCircle2, UserCheck } from 'lucide-react';

export default function TrainerCompetencyPage() {
  const { currentUser } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Trainer Competency Profile</h1>
          <p className="text-xs text-slate-500 mt-1">Verified specialization scores used by the Competency Matching Engine.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <UserCheck className="w-6 h-6 text-teal-600" />
            <div>
              <h2 className="font-bold text-base text-slate-900">{currentUser?.name}</h2>
              <p className="text-xs text-slate-500">{currentUser?.designation} • {currentUser?.experienceYears} Years Experience</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {Object.entries(currentUser?.competencies || {}).map(([compName, score]) => (
              <div key={compName}>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>{compName}</span>
                  <span className="font-bold text-teal-700">{score}% Verified Competency</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
