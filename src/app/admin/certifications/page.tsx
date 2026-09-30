'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { ShieldCheck } from 'lucide-react';

export default function AdminCertificationsPage() {
  const { certificates } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Certifications Registry Log</h1>
          <p className="text-xs text-slate-500 mt-1">Official certificate issue records and verification codes.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Certificate No</th>
                  <th className="p-3.5">Trainee Name</th>
                  <th className="p-3.5">Course Title</th>
                  <th className="p-3.5">Issue Date</th>
                  <th className="p-3.5">Grade</th>
                  <th className="p-3.5">Verification Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {certificates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-900 font-bold">{c.certificateNo}</td>
                    <td className="p-3.5 font-bold text-slate-900">{c.traineeName}</td>
                    <td className="p-3.5 font-semibold text-slate-700">{c.courseTitle}</td>
                    <td className="p-3.5 text-slate-500">{c.issueDate}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{c.grade}</td>
                    <td className="p-3.5 font-mono text-[10px] text-sky-700">{c.verificationCode}</td>
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
