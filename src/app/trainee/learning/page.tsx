'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import {
  PlayCircle,
  FileText,
  Presentation,
  CheckCircle2,
  ChevronRight,
  Download,
  BookOpen,
  Award,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function LMSLearningPlayerPage() {
  const { courses, enrollments, currentUser, updateCourseProgress } = useStore();

  const userEnrollments = enrollments.filter((e) => e.traineeId === currentUser?.id);
  const activeEnrollment = userEnrollments.find((e) => e.status === 'in_progress') || userEnrollments[0];
  const activeCourse = activeEnrollment ? courses.find((c) => c.id === activeEnrollment.courseId) || courses[0] : courses[0];

  const [selectedModuleId, setSelectedModuleId] = useState(
    activeCourse.modules[0]?.id || 'MOD-101-1'
  );
  const [activeTab, setActiveTab] = useState<'video' | 'presentation' | 'pdf'>('video');

  const selectedModule = activeCourse.modules.find((m) => m.id === selectedModuleId) || activeCourse.modules[0];

  const handleCompleteLesson = () => {
    const newProgress = Math.min(100, (activeEnrollment?.progressPercentage || 40) + 20);
    updateCourseProgress(activeCourse.id, newProgress);
  };

  return (
    <AppShell>
      <div className="space-y-4">
        {/* Player Header Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-sky-100 text-sky-800">
              [{activeCourse.code}]
            </span>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">{activeCourse.title}</h1>
              <p className="text-xs text-slate-500">Instructor: {activeCourse.trainerName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] font-bold text-slate-500">Overall Progress</div>
              <div className="text-xs font-extrabold text-sky-700">
                {activeEnrollment?.progressPercentage || 40}% Completed
              </div>
            </div>
            {activeCourse.assessmentId && (
              <Link
                href={`/trainee/assessments/${activeCourse.assessmentId}`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Take Operational Assessment</span>
              </Link>
            )}
          </div>
        </div>

        {/* 3-Column Split Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Modules Navigation */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Course Curriculum</span>
            </h3>

            <div className="space-y-2">
              {activeCourse.modules.map((mod, idx) => {
                const isSelected = mod.id === selectedModuleId;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-sky-50 border-sky-300 font-bold text-sky-900 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {idx + 1}. {mod.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{mod.duration}</span>
                      </div>
                    </div>
                    {mod.completed && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Resource Viewer / Player */}
          <div className="lg:col-span-6 space-y-4">
            {/* Resource Type Switcher Tabs */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
                  activeTab === 'video' ? 'bg-[#0b192c] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <PlayCircle className="w-4 h-4" />
                <span>Video Lecture</span>
              </button>
              <button
                onClick={() => setActiveTab('presentation')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
                  activeTab === 'presentation'
                    ? 'bg-[#0b192c] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>Slide Deck</span>
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
                  activeTab === 'pdf' ? 'bg-[#0b192c] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>PDF Document</span>
              </button>
            </div>

            {/* Video / Slide Player Area */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl aspect-video flex flex-col justify-center items-center text-white relative">
              {activeTab === 'video' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800">
                  <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/40 flex items-center justify-center mb-4 animate-pulse">
                    <PlayCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 max-w-md">{selectedModule.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Operational Video Stream • High-Definition Scientific Demonstration
                  </p>
                  <div className="mt-4 flex items-center space-x-3">
                    <button
                      onClick={handleCompleteLesson}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Lesson Complete</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'presentation' && (
                <div className="w-full h-full bg-slate-800 p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-bold text-sky-400">MoES Official Slide Deck</span>
                    <span className="text-[10px] text-slate-400">Slide 4 of 24</span>
                  </div>
                  <div className="text-center py-6">
                    <Presentation className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                    <h4 className="font-bold text-base text-white">{selectedModule.title}</h4>
                    <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">{selectedModule.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <button className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600">Previous Slide</button>
                    <button className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-500">Next Slide</button>
                  </div>
                </div>
              )}

              {activeTab === 'pdf' && (
                <div className="w-full h-full bg-slate-100 p-6 text-slate-900 flex flex-col justify-between overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-rose-600" />
                      <span className="font-bold text-xs">Official Manual PDF Document</span>
                    </div>
                    <button className="text-xs text-sky-700 font-bold flex items-center space-x-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                  <div className="py-4 space-y-2 text-xs text-slate-700">
                    <h5 className="font-bold text-sm text-slate-900">{selectedModule.title}</h5>
                    <p className="leading-relaxed">{selectedModule.description}</p>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg text-[11px] font-mono text-slate-600">
                      [Document Content Preview]: Operational standard Operating Procedure (SOP) issued by IMD Director General of Meteorology...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Module Details & Resources */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-1">Module Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedModule.description}</p>

            <div className="border-t border-slate-100 pt-3">
              <h4 className="font-bold text-xs text-slate-900 mb-2">Attached Resources</h4>
              <div className="space-y-2 text-xs">
                {activeCourse.resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                      <span className="font-medium text-slate-800 group-hover:text-sky-700 truncate">{res.title}</span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
