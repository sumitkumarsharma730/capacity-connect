'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { BarChart3, Clock, Users, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AdminParticipationPage() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const participationData = [
    { day: 'Mon', active: 240, completed: 45, avgTimeMins: 42 },
    { day: 'Tue', active: 310, completed: 58, avgTimeMins: 50 },
    { day: 'Wed', active: 420, completed: 78, avgTimeMins: 62 },
    { day: 'Thu', active: 380, completed: 62, avgTimeMins: 55 },
    { day: 'Fri', active: 450, completed: 89, avgTimeMins: 68 },
    { day: 'Sat', active: 290, completed: 40, avgTimeMins: 38 },
    { day: 'Sun', active: 180, completed: 25, avgTimeMins: 30 }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Participation Analytics</h1>
            <p className="text-xs text-slate-500 mt-1">Track daily active trainees, completion rates, and learning hours.</p>
          </div>

          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {(['7d', '30d', '90d', '1y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeframe === tf ? 'bg-[#0b192c] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : tf === '90d' ? '90 Days' : 'This Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Daily Active Trainees</div>
            <div className="text-2xl font-black text-sky-700 mt-1">324 Officers</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Average Learning Time</div>
            <div className="text-2xl font-black text-teal-700 mt-1">54 Mins / Day</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Assessment Participation</div>
            <div className="text-2xl font-black text-indigo-700 mt-1">88.2%</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Weekly Module Completions</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">397 Modules</div>
          </div>
        </div>

        {/* Recharts Bar Visualization */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Active Trainees & Module Completions ({timeframe.toUpperCase()})</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="active" fill="#0284c7" radius={[4, 4, 0, 0]} name="Active Trainees" />
                <Bar dataKey="completed" fill="#0d9488" radius={[4, 4, 0, 0]} name="Completed Modules" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
