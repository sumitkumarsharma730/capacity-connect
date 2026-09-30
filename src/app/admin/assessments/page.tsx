'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';

export default function AdminAssessmentsPage() {
  const { assessments, assessmentResults } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Assessment Registry</h1>
          <p className="text-xs text-slate-500 mt-1">Audit operational question banks, attempt history, and pass metrics.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Assessment Title</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Questions</th>
                  <th className="p-3.5">Time Limit</th>
                  <th className="p-3.5">Pass Score</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {assessments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">{a.title}</td>
                    <td className="p-3.5 font-semibold text-sky-700">{a.subject}</td>
                    <td className="p-3.5">{a.totalQuestions} Questions</td>
                    <td className="p-3.5">{a.timeLimitMinutes} Mins</td>
                    <td className="p-3.5 font-bold text-emerald-700">{a.passingScore}%</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {a.status}
                      </span>
                    </td>
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
