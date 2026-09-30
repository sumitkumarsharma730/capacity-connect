'use me';
'use client';

import React from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { FileCheck, Clock, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TraineeAssessmentsPage() {
  const { assessments, assessmentResults, currentUser } = useStore();

  const userResults = assessmentResults.filter((r) => r.traineeId === currentUser?.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Operational Assessments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete quarterly operational evaluations and subject quizzes to qualify for official MoES certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((asm) => {
            const previousResult = userResults.find((r) => r.assessmentId === asm.id);

            return (
              <div key={asm.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {asm.subject}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{asm.timeLimitMinutes} Mins</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2">{asm.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{asm.description}</p>

                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-lg text-xs font-semibold text-slate-700 mb-4">
                    <div>
                      <div className="text-[10px] text-slate-400 font-normal">Questions</div>
                      <div>{asm.totalQuestions}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-normal">Pass Score</div>
                      <div>{asm.passingScore}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-normal">Deadline</div>
                      <div className="text-rose-600">{asm.deadline}</div>
                    </div>
                  </div>
                </div>

                {previousResult ? (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-900">Attempt Completed</span>
                      <span className="text-[11px] text-emerald-700 block">Score: {previousResult.percentage}% ({previousResult.passed ? 'PASSED' : 'FAILED'})</span>
                    </div>
                    <Link
                      href="/trainee/results"
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
                    >
                      View Report
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/trainee/assessments/${asm.id}`}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>Start Timed MCQ Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
