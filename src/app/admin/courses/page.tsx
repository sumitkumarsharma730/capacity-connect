'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { BookOpen, Star, Eye } from 'lucide-react';

export default function AdminCoursesPage() {
  const { courses } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Governance & Monitoring</h1>
          <p className="text-xs text-slate-500 mt-1">Audit active training programs across MoES scientific divisions.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Course Code & Title</th>
                  <th className="p-3.5">Instructor</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Enrolled</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">[{c.code}] {c.title}</div>
                      <div className="text-[10px] text-slate-500">{c.duration} • {c.difficulty}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{c.trainerName}</td>
                    <td className="p-3.5 text-sky-700 font-bold">{c.category}</td>
                    <td className="p-3.5 font-bold text-slate-900">{c.enrolledCount} Trainees</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {c.status}
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
