'use me';
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  User,
  Star,
  CheckCircle2,
  FileCheck,
  Award,
  Video,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const { courses, enrollments, currentUser, enrollCourse } = useStore();

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const isEnrolled = enrollments.some((e) => e.courseId === course.id && e.traineeId === currentUser?.id);

  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => {
      enrollCourse(course.id);
      setEnrolling(false);
      setEnrollSuccess(true);
    }, 400);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Course Header Banner */}
        <div className="bg-[#0b192c] text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold px-2.5 py-0.5 rounded">
                  [{course.code}] {course.category}
                </span>
                <span className="bg-slate-800 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded">
                  {course.difficulty} Level
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{course.title}</h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <User className="w-4 h-4 text-sky-400" />
                  <span>{course.trainerName} ({course.trainerDesignation})</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>{course.duration}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-bold text-white">{course.rating} Rating</span>
                </span>
              </div>
            </div>

            {/* Enrollment Action Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-center">
              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-4" />

              {enrollSuccess || isEnrolled ? (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-lg text-emerald-300 text-xs font-bold flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Successfully Enrolled in Course</span>
                  </div>
                  <Link
                    href="/trainee/learning"
                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Launch LMS Learning Player</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {enrolling ? (
                    <span>Processing Enrollment...</span>
                  ) : (
                    <>
                      <span>Enroll in Course Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Tabs / Modules section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Modules & Curriculum */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="font-bold text-base text-slate-900 mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                <span>Course Modules & Technical Curriculum ({course.modules.length} Modules)</span>
              </h2>

              <div className="space-y-4">
                {course.modules.map((mod, idx) => (
                  <div key={mod.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{mod.title}</div>
                        <p className="text-xs text-slate-600 mt-1">{mod.description}</p>
                      </div>
                      <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded shrink-0">
                        {mod.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Competencies */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="font-bold text-base text-slate-900 mb-3">Target Competencies Developed</h2>
              <div className="flex flex-wrap gap-2">
                {course.requiredCompetencies.map((comp, idx) => (
                  <span
                    key={idx}
                    className="bg-teal-50 border border-teal-200 text-teal-900 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    ✓ {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Assessment & Certification</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Includes timed MCQ operational assessment (passing threshold: 70%). Upon passing, an official MoES/IMD digital certificate with verification code will be generated.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-700 space-y-1">
                <div>• Verified Digital Seal & Signature</div>
                <div>• Automatic Competency Matrix Update</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
