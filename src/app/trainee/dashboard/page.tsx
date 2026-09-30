'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  FileCheck,
  Megaphone,
  Target,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function TraineeDashboard() {
  const { currentUser, courses, enrollments, certificates, assessments, announcements } = useStore();

  const userEnrollments = enrollments.filter((e) => e.traineeId === currentUser?.id);
  const inProgressCount = userEnrollments.filter((e) => e.status === 'in_progress').length;
  const completedCount = userEnrollments.filter((e) => e.status === 'completed').length;
  const userCertificates = certificates.filter((c) => c.traineeId === currentUser?.id);

  // Active in-progress course
  const activeEnrollment = userEnrollments.find((e) => e.status === 'in_progress');
  const activeCourse = activeEnrollment ? courses.find((c) => c.id === activeEnrollment.courseId) : courses[0];

  const recommendedCourses = courses.filter(
    (c) => !userEnrollments.some((e) => e.courseId === c.id)
  ).slice(0, 2);

  const activeAssessments = assessments.filter((a) => a.status === 'active').slice(0, 2);
  const latestAnnouncements = announcements.slice(0, 2);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#0b192c] via-[#0f2942] to-[#1e3a8a] text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-sky-950/80 border border-sky-400/30 px-3 py-1 rounded-full text-xs text-sky-300 font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Scientific Assistant • India Meteorological Department</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser?.name || 'Rahul Kumar'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Track your active weather prediction modules, submit quarterly assessments, and review officer competency achievements.
              </p>
            </div>

            {activeCourse && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shrink-0 max-w-sm">
                <div className="text-[10px] text-sky-300 font-bold uppercase tracking-wider mb-1">
                  Active Learning Module
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{activeCourse.title}</div>
                <div className="w-full bg-slate-700/80 rounded-full h-2 my-2">
                  <div
                    className="bg-sky-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${activeEnrollment?.progressPercentage || 40}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">{activeEnrollment?.progressPercentage || 40}% Completed</span>
                  <Link
                    href="/trainee/learning"
                    className="text-sky-300 font-bold hover:text-white flex items-center space-x-1"
                  >
                    <span>Continue Learning</span>
                    <PlayCircle className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-sky-50 text-sky-700 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{userEnrollments.length}</div>
              <div className="text-xs text-slate-500 font-medium">Courses Enrolled</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{inProgressCount}</div>
              <div className="text-xs text-slate-500 font-medium">In Progress</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{completedCount}</div>
              <div className="text-xs text-slate-500 font-medium">Completed</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{userCertificates.length}</div>
              <div className="text-xs text-slate-500 font-medium">Certificates Earned</div>
            </div>
          </div>
        </div>

        {/* Two Column Grid: Main Content + Sidebar Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Recommended Courses */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  <h2 className="font-bold text-base text-slate-900">Recommended Courses for Your Competency Profile</h2>
                </div>
                <Link href="/trainee/courses" className="text-xs font-semibold text-sky-700 hover:text-sky-900">
                  Explore Catalog →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-slate-200 rounded-xl overflow-hidden hover:border-sky-300 transition-all flex flex-col justify-between"
                  >
                    <img src={course.thumbnailUrl} alt={course.title} className="w-full h-32 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                          {course.category}
                        </span>
                        <h3 className="font-bold text-xs text-slate-900 mt-2 line-clamp-1">{course.title}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{course.trainerName}</span>
                        <Link
                          href={`/trainee/courses/${course.id}`}
                          className="font-bold text-sky-700 hover:underline flex items-center space-x-1"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competency Overview Progress */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-teal-600" />
                <h2 className="font-bold text-base text-slate-900">Scientific Competency Progress Matrix</h2>
              </div>
              <div className="space-y-4 text-xs">
                {Object.entries(currentUser?.competencies || {}).map(([compName, rating]) => (
                  <div key={compName}>
                    <div className="flex justify-between font-medium text-slate-700 mb-1">
                      <span>{compName}</span>
                      <span className="font-bold text-slate-900">{rating}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${rating}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upcoming Assessments */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center space-x-2 mb-3">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Upcoming Assessments</h3>
              </div>
              <div className="space-y-3">
                {activeAssessments.map((asm) => (
                  <div key={asm.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{asm.title}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                      <span>Time: {asm.timeLimitMinutes} Mins</span>
                      <span className="font-semibold text-rose-600">Due: {asm.deadline}</span>
                    </div>
                    <Link
                      href={`/trainee/assessments/${asm.id}`}
                      className="mt-2.5 block text-center py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-bold transition-colors"
                    >
                      Start Assessment Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Announcements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Megaphone className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Recent Announcements</h3>
              </div>
              <div className="space-y-3">
                {latestAnnouncements.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/60">
                    <div className="text-xs font-bold text-slate-800">{ann.title}</div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{ann.content}</p>
                    <div className="text-[10px] text-slate-400 mt-2">{ann.publishedAt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
