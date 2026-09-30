'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  Award,
  Layers,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Megaphone,
  Target,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboardPage() {
  const { users, courses, enrollments, certificates, announcements, currentUser } = useStore();

  const totalUsers = users.length;
  const activeTrainees = users.filter((u) => u.role === 'trainee' && u.status === 'approved').length;
  const activeTrainers = users.filter((u) => u.role === 'trainer' && u.status === 'approved').length;
  const pendingUsersCount = users.filter((u) => u.status === 'pending').length;

  // Chart dataset 1: User Growth Monthly
  const userGrowthData = [
    { month: 'May', trainees: 420, trainers: 18 },
    { month: 'Jun', trainees: 580, trainers: 22 },
    { month: 'Jul', trainees: 750, trainers: 26 },
    { month: 'Aug', trainees: 980, trainers: 30 },
    { month: 'Sep', trainees: 1240, trainers: 34 }
  ];

  // Chart dataset 2: Category Distribution
  const categoryData = [
    { name: 'Atmospheric Modeling', value: 38 },
    { name: 'Radar Meteorology', value: 26 },
    { name: 'Satellite Sensing', value: 20 },
    { name: 'Climate Science', value: 16 }
  ];

  const COLORS = ['#0284c7', '#0d9488', '#6366f1', '#f59e0b'];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Executive Header Banner */}
        <div className="bg-gradient-to-r from-[#0b192c] via-[#0f2942] to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-950/80 border border-amber-400/30 px-3 py-1 rounded-full text-xs text-amber-300 font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>System Administrator • MoES Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Executive Portal: {currentUser?.name || 'Rajiv Mehta'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Centralized administrative monitoring, officer clearances, course governance, and institutional capacity analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {pendingUsersCount > 0 && (
              <Link
                href="/admin/users/pending"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center space-x-1.5 animate-bounce"
              >
                <span>Clear {pendingUsersCount} Pending Users</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/admin/competency"
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center space-x-1.5"
            >
              <Target className="w-4 h-4" />
              <span>Competency Matrix Engine</span>
            </Link>
          </div>
        </div>

        {/* 7 KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Users</div>
            <div className="text-xl font-black text-slate-900 mt-1">{totalUsers}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Active Trainees</div>
            <div className="text-xl font-black text-sky-700 mt-1">{activeTrainees}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Active Trainers</div>
            <div className="text-xl font-black text-teal-700 mt-1">{activeTrainers}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Courses</div>
            <div className="text-xl font-black text-indigo-700 mt-1">{courses.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Enrollments</div>
            <div className="text-xl font-black text-slate-900 mt-1">{enrollments.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Completion Rate</div>
            <div className="text-xl font-black text-emerald-700 mt-1">92.4%</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Certificates</div>
            <div className="text-xl font-black text-amber-700 mt-1">{certificates.length}</div>
          </div>
        </div>

        {/* Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* User Growth Chart */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Institutional Trainee & Trainer Growth</h3>
                <p className="text-[11px] text-slate-500">Monthly active user onboarding trajectory</p>
              </div>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded">2026 Metrics</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTrainees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="trainees" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorTrainees)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Pie Chart */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Course Category Share</h3>
              <p className="text-[11px] text-slate-500">Discipline distribution across MoES domains</p>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-semibold border-t border-slate-100 pt-3">
              {categoryData.map((cat, idx) => (
                <div key={cat.name} className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span className="truncate">{cat.name}: {cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
