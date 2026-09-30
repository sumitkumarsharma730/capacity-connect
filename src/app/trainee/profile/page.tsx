'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { User, Award, BookOpen, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function TraineeProfilePage() {
  const { currentUser, certificates, enrollments } = useStore();

  const userCertificates = certificates.filter((c) => c.traineeId === currentUser?.id);
  const userEnrollments = enrollments.filter((e) => e.traineeId === currentUser?.id);

  // Profile completion percentage calculation
  const completionPercentage = 92;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-md ring-2 ring-sky-500"
            />
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase border border-sky-300">
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
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>IMD Headquarters, New Delhi</span>
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion Gauge */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shrink-0 w-full md:w-56">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Profile Completion
            </div>
            <div className="text-3xl font-extrabold text-sky-600">{completionPercentage}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2 my-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Officer Record</span>
            </p>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bio & Qualifications */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bio Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="font-bold text-sm text-slate-900 mb-3 flex items-center space-x-2">
                <User className="w-4 h-4 text-sky-600" />
                <span>Professional Summary & Biography</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">{currentUser?.bio}</p>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="font-bold text-sm text-slate-900 mb-4 flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span>Academic Qualifications & Degrees</span>
              </h2>
              <div className="space-y-3">
                {currentUser?.qualifications.map((qual, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="font-bold text-sm text-slate-900 mb-4 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Technical Skills & Operational Experience ({currentUser?.experienceYears} Years)</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentUser?.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates & Enrollments summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Earned Certificates ({userCertificates.length})</h3>
              </div>
              <div className="space-y-3">
                {userCertificates.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-lg border border-amber-200 bg-amber-50/50">
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{cert.courseTitle}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Issued: {cert.issueDate}</div>
                    <div className="text-[10px] text-amber-700 font-mono mt-0.5">{cert.certificateNo}</div>
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
