'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { FileSpreadsheet, Download, Printer } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Institutional Reports & Audits</h1>
          <p className="text-xs text-slate-500 mt-1">Export official capacity building audit reports for MoES stakeholders.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Quarterly Officer Certification Audit</h3>
              <p className="text-xs text-slate-500 mt-1">Complete breakdown of certified officers, scores, and department distributions.</p>
            </div>
            <button
              onClick={() => alert('Exporting CSV/PDF audit report...')}
              className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 flex items-center justify-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit CSV</span>
            </button>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <FileSpreadsheet className="w-8 h-8 text-sky-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900">Competency Alignment Matrix Report</h3>
              <p className="text-xs text-slate-500 mt-1">Detailed skill gap matrix comparing department requirements against current levels.</p>
            </div>
            <button
              onClick={() => alert('Generating Competency PDF...')}
              className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 flex items-center justify-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Competency PDF</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
