'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { User, Award, GraduationCap, Briefcase, Target, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

export default function TrainerProfilePage() {
  const { currentUser } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-md ring-2 ring-teal-500"
            />
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase border border-teal-300">
                  {currentUser?.role}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">{currentUser?.designation}</p>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser?.department}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser?.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser?.phone}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Competencies Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <h2 className="font-bold text-base text-slate-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-teal-600" />
            <span>Instructor Competency & Domain Proficiency</span>
          </h2>
          <div className="space-y-4 text-xs">
            {Object.entries(currentUser?.competencies || {}).map(([compName, rating]) => (
              <div key={compName}>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>{compName}</span>
                  <span className="font-bold text-teal-700">{rating}% Proficiency</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${rating}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
