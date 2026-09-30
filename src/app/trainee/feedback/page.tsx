'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Star, MessageSquare, CheckCircle2, Send } from 'lucide-react';

export default function TraineeFeedbackPage() {
  const { courses, submitFeedback, currentUser } = useStore();

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [overallRating, setOverallRating] = useState(5);
  const [courseQuality, setCourseQuality] = useState(5);
  const [trainerEffectiveness, setTrainerEffectiveness] = useState(5);
  const [learningResources, setLearningResources] = useState(4);
  const [assessmentQuality, setAssessmentQuality] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      traineeId: currentUser?.id || 'U001',
      courseId: selectedCourseId,
      overallRating,
      courseQuality,
      trainerEffectiveness,
      learningResources,
      assessmentQuality,
      comments
    });
    setSubmitted(true);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course & Trainer Feedback</h1>
          <p className="text-xs text-slate-500 mt-1">
            Provide institutional feedback to improve capacity building curriculum quality across MoES divisions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Feedback Submitted Successfully</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Thank you for contributing to scientific training quality assurance. Your feedback has been recorded in the administrative quality matrix.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 bg-[#0b192c] text-white text-xs font-bold rounded-lg hover:bg-[#1e3a8a]"
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Select Evaluated Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.code}] {c.title} — {c.trainerName}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Dimensions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-slate-800">Overall Course Satisfaction</div>
                  <div className="text-[11px] text-slate-500">General assessment of course value</div>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setOverallRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= overallRating ? 'text-amber-400 fill-current' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-slate-800">Trainer Effectiveness</div>
                  <div className="text-[11px] text-slate-500">Instructor domain clarity and guidance</div>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setTrainerEffectiveness(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= trainerEffectiveness ? 'text-amber-400 fill-current' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Detailed Comments & Recommendations</label>
              <textarea
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share constructive feedback regarding learning modules, WRF exercise scripts, or radar datasets..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0b192c] hover:bg-[#1e3a8a] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Official Feedback</span>
            </button>
          </form>
        )}
      </div>
    </AppShell>
  );
}
