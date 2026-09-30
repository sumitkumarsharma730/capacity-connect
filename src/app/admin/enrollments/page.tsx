'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';

export default function AdminEnrollmentsPage() {
  const { enrollments, courses, users } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enrollment Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time enrollment status and progress across active personnel.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Enrollment ID</th>
                  <th className="p-3.5">Trainee</th>
                  <th className="p-3.5">Course</th>
                  <th className="p-3.5">Progress</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {enrollments.map((e) => {
                  const trainee = users.find((u) => u.id === e.traineeId);
                  const course = courses.find((c) => c.id === e.courseId);

                  return (
                    <tr key={e.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-mono text-[10px] text-slate-500">{e.id}</td>
                      <td className="p-3.5 font-bold text-slate-900">{trainee?.name || e.traineeId}</td>
                      <td className="p-3.5 font-semibold text-slate-700">{course?.title || e.courseId}</td>
                      <td className="p-3.5">
                        <div className="w-32 bg-slate-100 rounded-full h-2 inline-block mr-2">
                          <div className="bg-sky-600 h-2 rounded-full" style={{ width: `${e.progressPercentage}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-900">{e.progressPercentage}%</span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            e.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
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
