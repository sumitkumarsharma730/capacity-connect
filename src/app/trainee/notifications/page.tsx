'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TraineeNotificationsPage() {
  const { notifications, currentUser, markNotificationRead, markAllNotificationsRead } = useStore();

  const userNotifs = notifications.filter(
    (n) => !n.userId || (currentUser && n.userId === currentUser.id)
  );

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notifications Center</h1>
            <p className="text-xs text-slate-500 mt-1">
              Important alerts regarding assessment deadlines, course updates, and certifications.
            </p>
          </div>
          <button
            onClick={markAllNotificationsRead}
            className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg flex items-center space-x-1.5"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
          {userNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 flex items-start space-x-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                !n.read ? 'bg-sky-50/40' : ''
              }`}
            >
              <div className="mt-0.5">
                {n.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : n.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Info className="w-5 h-5 text-sky-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                {n.link && (
                  <Link href={n.link} className="inline-block text-xs font-bold text-sky-700 hover:underline mt-2">
                    View Related Page →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
