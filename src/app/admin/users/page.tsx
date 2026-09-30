'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Users, CheckCircle, XCircle, Shield, UserCheck, ShieldAlert } from 'lucide-react';
import { Role } from '@/types';

export default function AdminUsersPage() {
  const { users, approveUser, rejectUser, deactivateUser, changeUserRole } = useStore();
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = users.filter((u) => (filterRole === 'all' ? true : u.role === filterRole));

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-xs text-slate-500 mt-1">Manage personnel accounts, clearances, and role assignments.</p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-slate-600">Filter Role:</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="all">All Roles</option>
              <option value="trainee">Trainee</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Department & Designation</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{u.designation}</div>
                      <div className="text-[10px] text-slate-500">{u.department}</div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={u.role}
                        onChange={(e) => changeUserRole(u.id, e.target.value as Role)}
                        className="p-1 bg-slate-100 border border-slate-200 rounded text-[11px] font-bold text-slate-800 uppercase"
                      >
                        <option value="trainee">Trainee</option>
                        <option value="trainer">Trainer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : u.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      {u.status === 'pending' && (
                        <button
                          onClick={() => approveUser(u.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded shadow-xs"
                        >
                          Approve
                        </button>
                      )}
                      {u.status === 'approved' && (
                        <button
                          onClick={() => deactivateUser(u.id)}
                          className="px-2.5 py-1 bg-slate-200 hover:bg-rose-100 text-rose-700 font-bold text-[10px] rounded"
                        >
                          Deactivate
                        </button>
                      )}
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
