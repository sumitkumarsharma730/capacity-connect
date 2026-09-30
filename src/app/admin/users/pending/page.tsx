'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { CheckCircle, XCircle, ShieldCheck } from 'lucide-react';

export default function AdminPendingUsersPage() {
  const { users, approveUser, rejectUser } = useStore();

  const pendingUsers = users.filter((u) => u.status === 'pending');

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pending User Approvals</h1>
          <p className="text-xs text-slate-500 mt-1">Clear newly registered scientific assistants and meteorological officers.</p>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            No pending user registration requests in queue.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map((u) => (
              <div key={u.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{u.name}</h3>
                    <p className="text-xs text-slate-600">{u.designation} • {u.department}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{u.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => rejectUser(u.id)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => approveUser(u.id)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center space-x-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve Clearance</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
