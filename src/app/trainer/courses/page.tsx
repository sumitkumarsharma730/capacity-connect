'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { BookOpen, PlusCircle, Users, ArrowRight, Eye, Archive } from 'lucide-react';

export default function TrainerCoursesPage() {
  const { courses, currentUser } = useStore();

  const trainerCourses = courses.filter(
    (c) => c.trainerId === currentUser?.id || c.trainerName === currentUser?.name
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Management</h1>
            <p className="text-xs text-slate-500 mt-1">Author and maintain scientific capacity building courses.</p>
          </div>
          <Link
            href="/trainer/courses/create"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Course</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainerCourses.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {c.code}
                  </span>
                  <span className="text-slate-500">{c.enrolledCount} Trainees Enrolled</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">{c.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{c.description}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">Modules: {c.modules.length}</span>
                <Link
                  href={`/trainer/courses/${c.id}`}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Manage Course</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
