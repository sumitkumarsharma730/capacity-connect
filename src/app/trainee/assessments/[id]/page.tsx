'use me';
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Clock, HelpCircle, CheckCircle2, Bookmark, ArrowLeft, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function AssessmentRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const asmId = params.id as string;

  const { assessments, currentUser, submitAssessment } = useStore();

  const assessment = assessments.find((a) => a.id === asmId) || assessments[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(assessment.timeLimitMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown Timer Effect
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  const currentQuestion = assessment.questions[currentIndex];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }));
  };

  const toggleMarkReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }));
  };

  const handleFinalSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let totalEarned = 0;
    let totalPossible = 0;

    assessment.questions.forEach((q) => {
      totalPossible += q.marks;
      if (selectedAnswers[q.id] === q.correctAnswer) {
        totalEarned += q.marks;
      }
    });

    const percentage = Math.round((totalEarned / totalPossible) * 100);
    const passed = percentage >= assessment.passingScore;

    const resultPayload = {
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      traineeId: currentUser?.id || 'U001',
      score: totalEarned,
      totalMarks: totalPossible,
      percentage,
      passed,
      timeTakenMinutes: Math.ceil((assessment.timeLimitMinutes * 60 - timeLeftSeconds) / 60),
      subjectWisePerformance: [
        { subject: assessment.subject, score: percentage },
        { subject: 'Operational SOPs', score: Math.min(100, percentage + 5) }
      ],
      recommendations: passed
        ? ['Excellent proficiency demonstrated in operational meteorology. Ready for official endorsement.']
        : ['Review core WRF domain parameterization modules before re-evaluating.']
    };

    submitAssessment(resultPayload);

    setTimeout(() => {
      router.push('/trainee/results');
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header Bar with Countdown Timer */}
        <div className="bg-[#0b192c] text-white p-5 rounded-2xl border border-slate-800 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded">
              {assessment.subject} Assessment
            </span>
            <h1 className="text-lg font-bold text-white mt-1">{assessment.title}</h1>
          </div>

          <div className="flex items-center space-x-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Time Remaining</div>
              <div className="text-lg font-mono font-extrabold text-amber-300">{formatTime(timeLeftSeconds)}</div>
            </div>
          </div>
        </div>

        {/* 2-Column Assessment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Question {currentIndex + 1} of {assessment.questions.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">Marks: {currentQuestion.marks}</span>
            </div>

            <div className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswers[currentQuestion.id] === opt.key;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition-all flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={toggleMarkReview}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                  markedForReview[currentQuestion.id]
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark for Review'}
                </span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg disabled:opacity-40 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex < assessment.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg shadow-md flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Question Grid Navigator */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Question Navigator</h3>

            <div className="grid grid-cols-5 gap-2">
              {assessment.questions.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isMarked = !!markedForReview[q.id];
                const isCurrent = idx === currentIndex;

                let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isCurrent) btnStyle = 'bg-sky-600 text-white font-bold ring-2 ring-sky-300';
                else if (isMarked) btnStyle = 'bg-amber-400 text-amber-950 font-bold';
                else if (isAnswered) btnStyle = 'bg-emerald-500 text-white font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-10 rounded-lg text-xs flex items-center justify-center border transition-all ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block"></span>
                <span>Unanswered</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <button
                onClick={handleFinalSubmit}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg shadow-md flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Final Answers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
