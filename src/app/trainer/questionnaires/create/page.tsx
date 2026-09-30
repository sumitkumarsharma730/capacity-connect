'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { FileQuestion, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { Question } from '@/types';

export default function CreateQuestionnairePage() {
  const { courses, createAssessment, currentUser } = useStore();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Numerical Weather Prediction');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [passingScore, setPassingScore] = useState(70);
  const [deadline, setDeadline] = useState('2026-10-30');

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'Q-NEW-1',
      question: 'Sample Question: What is the main objective of WRF WPS geogrid execution?',
      options: [
        { key: 'A', text: 'To interpolate static terrestrial datasets onto model grid domains' },
        { key: 'B', text: 'To convert GRIB files to intermediate binary format' },
        { key: 'C', text: 'To submit parallel MPI jobs on Mihir supercomputer' },
        { key: 'D', text: 'To calibrate Doppler radar reflectivity offsets' }
      ],
      correctAnswer: 'A',
      marks: 20
    }
  ]);

  const [currentQText, setCurrentQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctKey, setCorrectKey] = useState<'A' | 'B' | 'C' | 'D'>('A');

  const handleAddQuestion = () => {
    if (!currentQText || !optA || !optB) return;

    const newQ: Question = {
      id: `Q-${Date.now()}`,
      question: currentQText,
      options: [
        { key: 'A', text: optA },
        { key: 'B', text: optB },
        { key: 'C', text: optC || 'Option C' },
        { key: 'D', text: optD || 'Option D' }
      ],
      correctAnswer: correctKey,
      marks: 20
    };

    setQuestions((prev) => [...prev, newQ]);
    setCurrentQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || questions.length === 0) return;

    createAssessment({
      title,
      subject,
      courseId,
      trainerId: currentUser?.id || 'U002',
      description,
      totalQuestions: questions.length,
      timeLimitMinutes,
      passingScore,
      deadline,
      status: 'active',
      questions
    });

    router.push('/trainer/dashboard');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Questionnaire Builder</h1>
          <p className="text-xs text-slate-500 mt-1">
            Construct operational MCQ assessments with time limits, passing scores, and automated answer keys.
          </p>
        </div>

        <form onSubmit={handlePublish} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Assessment Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Operational Weather Radar Diagnostics Exam"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Target Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.code}] {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Time Limit (Minutes)</label>
              <input
                type="number"
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Passing Score (%)</label>
              <input
                type="number"
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Submission Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          {/* Question List Preview */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Questions Added ({questions.length})
            </h3>

            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Q{idx + 1}: {q.question}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-600">
                    {q.options.map((o) => (
                      <span
                        key={o.key}
                        className={o.key === q.correctAnswer ? 'text-emerald-700 font-bold' : ''}
                      >
                        {o.key}. {o.text} {o.key === q.correctAnswer ? '✓' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Question Builder Form */}
          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200/80 space-y-3">
            <h4 className="font-bold text-xs text-sky-950 flex items-center space-x-1.5">
              <PlusCircle className="w-4 h-4 text-sky-600" />
              <span>Add New Question</span>
            </h4>

            <input
              type="text"
              value={currentQText}
              onChange={(e) => setCurrentQText(e.target.value)}
              placeholder="Question statement..."
              className="w-full p-2 bg-white border border-sky-200 rounded text-xs text-slate-900"
            />

            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                placeholder="Option A"
                className="p-2 bg-white border border-sky-200 rounded"
              />
              <input
                type="text"
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                placeholder="Option B"
                className="p-2 bg-white border border-sky-200 rounded"
              />
              <input
                type="text"
                value={optC}
                onChange={(e) => setOptC(e.target.value)}
                placeholder="Option C"
                className="p-2 bg-white border border-sky-200 rounded"
              />
              <input
                type="text"
                value={optD}
                onChange={(e) => setOptD(e.target.value)}
                placeholder="Option D"
                className="p-2 bg-white border border-sky-200 rounded"
              />
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <label className="font-bold text-slate-700">Correct Answer Key:</label>
              {(['A', 'B', 'C', 'D'] as const).map((k) => (
                <label key={k} className="flex items-center space-x-1 font-semibold text-slate-800">
                  <input
                    type="radio"
                    name="correctKey"
                    checked={correctKey === k}
                    onChange={() => setCorrectKey(k)}
                  />
                  <span>{k}</span>
                </label>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="ml-auto px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded shadow-xs"
              >
                + Add Question to Builder
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0b192c] hover:bg-[#1e3a8a] text-white font-extrabold text-xs rounded-lg shadow-md flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Publish Assessment Questionnaire</span>
          </button>
        </form>
      </div>
    </AppShell>
  );
}
