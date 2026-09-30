'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  FileCheck,
  TrendingUp,
  PlusCircle,
  FolderOpen,
  FileQuestion,
  Award,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export default function TrainerDashboardPage() {
  const { courses, currentUser, enrollments, assessments } = useStore();

  const trainerCourses = courses.filter(
    (c) => c.trainerId === currentUser?.id || c.trainerName === currentUser?.name
  );

  const totalTrainees = trainerCourses.reduce((acc, c) => acc + c.enrolledCount, 0);
  const totalAssessments = assessments.filter((a) => a.trainerId === currentUser?.id).length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Trainer Header Banner */}
        <div className="bg-gradient-to-r from-[#0b192c] via-[#0f2942] to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-teal-950/80 border border-teal-400/30 px-3 py-1 rounded-full text-xs text-teal-300 font-medium mb-3">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Lead Instructor & Senior Scientist • MoES / IMD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Instructor Portal: {currentUser?.name || 'Dr. Ananya Sharma'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Manage operational training courses, upload research resources, create assessments, and evaluate officer competency metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/trainer/courses/create"
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Course</span>
            </Link>
            <Link
              href="/trainer/questionnaires/create"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-700 transition-all flex items-center space-x-1.5"
            >
              <FileQuestion className="w-4 h-4 text-sky-400" />
              <span>Build Questionnaire</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-teal-50 text-teal-700 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{trainerCourses.length}</div>
              <div className="text-xs text-slate-500 font-medium">Active Courses</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-sky-50 text-sky-700 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{totalTrainees}</div>
              <div className="text-xs text-slate-500 font-medium">Enrolled Trainees</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{totalAssessments}</div>
              <div className="text-xs text-slate-500 font-medium">Active Questionnaires</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">88.4%</div>
              <div className="text-xs text-slate-500 font-medium">Avg Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Managed Courses Grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-900">Managed Training Programs</h2>
            <Link href="/trainer/courses" className="text-xs font-semibold text-teal-700 hover:underline">
              Manage All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainerCourses.map((course) => (
              <div key={course.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-bold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                      {course.code}
                    </span>
                    <span>{course.enrolledCount} Trainees</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{course.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{course.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Modules: {course.modules.length}</span>
                  <Link
                    href={`/trainer/courses/${course.id}`}
                    className="font-bold text-teal-700 hover:underline flex items-center space-x-1"
                  >
                    <span>Manage Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
