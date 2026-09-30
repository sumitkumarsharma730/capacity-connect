'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { LineChart, BarChart3, Award, Users, TrendingUp } from 'lucide-react';

export default function TrainerPerformancePage() {
  const { assessmentResults, users, courses } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Trainee Performance Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Track assessment scores, completion rates, and officer evaluation metrics.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-base text-slate-900">Recent Assessment Submissions</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Assessment Title</th>
                  <th className="p-3">Trainee ID</th>
                  <th className="p-3">Score %</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {assessmentResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{r.assessmentTitle}</td>
                    <td className="p-3 text-slate-600">{r.traineeId}</td>
                    <td className="p-3 font-extrabold text-sky-700">{r.percentage}%</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          r.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {r.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{r.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
