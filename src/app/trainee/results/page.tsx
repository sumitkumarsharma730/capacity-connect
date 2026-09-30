'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { Award, CheckCircle2, XCircle, Clock, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';

export default function TraineeResultsPage() {
  const { assessmentResults, currentUser } = useStore();

  const userResults = assessmentResults.filter((r) => r.traineeId === currentUser?.id);
  const latestResult = userResults[0] || assessmentResults[0];

  if (!latestResult) {
    return (
      <AppShell>
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
          <p className="text-sm text-slate-500">No assessment results available yet.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Pass / Fail Result Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border shadow-lg text-white ${
            latestResult.passed
              ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-[#0b192c] border-emerald-500/40'
              : 'bg-gradient-to-r from-rose-900 via-slate-900 to-[#0b192c] border-rose-500/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3 bg-white/10 backdrop-blur-md">
                {latestResult.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>{latestResult.passed ? 'PASSED QUALIFICATION' : 'REQUIREMENT NOT MET'}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white">{latestResult.assessmentTitle}</h1>
              <p className="text-xs text-slate-300 mt-1">Submitted on {latestResult.submittedAt}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center shrink-0 border border-white/20">
              <div className="text-[10px] uppercase font-bold text-slate-300">Final Score</div>
              <div className="text-4xl font-extrabold text-white my-1">{latestResult.percentage}%</div>
              <div className="text-[11px] text-slate-300">{latestResult.score} / {latestResult.totalMarks} Marks</div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Completion Time</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{latestResult.timeTakenMinutes} Minutes</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Qualification Status</div>
            <div className={`text-xl font-bold mt-1 ${latestResult.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
              {latestResult.passed ? 'Certified' : 'Needs Retake'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Official Certificate</div>
            <div className="text-xl font-bold text-sky-600 mt-1">
              {latestResult.passed ? 'Generated' : 'Locked'}
            </div>
          </div>
        </div>

        {/* Subject Breakdown & Recommendations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h2 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            Subject-Wise Performance Analysis
          </h2>

          <div className="space-y-4 text-xs">
            {latestResult.subjectWisePerformance.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>{item.subject}</span>
                  <span className="font-bold text-slate-900">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.score >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="font-bold text-xs text-slate-900 mb-2">Competency Recommendations</h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {latestResult.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <Link
              href="/trainee/assessments"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Back to Assessments</span>
            </Link>

            {latestResult.passed && (
              <Link
                href="/trainee/certificates"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg shadow-md transition-all flex items-center space-x-2"
              >
                <Award className="w-4 h-4" />
                <span>View Official Certificate</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
