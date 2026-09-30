'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Users, Mail, Phone, BookOpen, CheckCircle2 } from 'lucide-react';

export default function TrainerTraineesPage() {
  const { users, enrollments, courses } = useStore();

  const trainees = users.filter((u) => u.role === 'trainee');

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Trainee Officers Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Review enrolled scientific assistants, meteorological officers, and technical specialists.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Officer Name</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Designation</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Active Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {trainees.map((t) => {
                  const activeEnrs = enrollments.filter((e) => e.traineeId === t.id);

                  return (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 flex items-center space-x-3">
                        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900">{t.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{t.email}</div>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600">{t.department}</td>
                      <td className="p-3.5 text-slate-700 font-semibold">{t.designation}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-sky-700">{activeEnrs.length} Enrolled</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
