'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { Settings, ShieldCheck, Database, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Platform Settings & Governance</h1>
          <p className="text-xs text-slate-500 mt-1">Manage portal thresholds, storage persistence, and administrative defaults.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-bold text-slate-900">Prototype Local Storage Sync</div>
              <div className="text-slate-500">Automatically persist state changes across browser refreshes</div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Enabled</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-bold text-slate-900">Assessment Passing Threshold</div>
              <div className="text-slate-500">Global minimum percentage score required for certificate issuance</div>
            </div>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">70%</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Role Clearance Mode</div>
              <div className="text-slate-500">Require manual admin approval for newly registered scientific personnel</div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Strict Clearance</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
