'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Target, Search, UserCheck, Award, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminCompetencyPage() {
  const { competencies, findTrainerMatches } = useStore();

  const [selectedSubjectId, setSelectedSubjectId] = useState(competencies[0]?.id || 'CMP-NWP');

  const currentSubject = competencies.find((c) => c.id === selectedSubjectId) || competencies[0];
  const trainerMatches = findTrainerMatches(selectedSubjectId);

  const [selectedTrainerMatch, setSelectedTrainerMatch] = useState(trainerMatches[0] || null);

  const activeMatch = selectedTrainerMatch || trainerMatches[0];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-teal-100 text-teal-900 border border-teal-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>MoES Key Differentiating Feature</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Visual Competency Mapping & Trainer Matching Matrix
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Deterministic skill-matching engine linking scientific subjects, required competencies, officer skills, and trainer availability.
            </p>
          </div>
        </div>

        {/* Subject Selection Toolbar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 flex-1 min-w-[280px]">
            <Target className="w-5 h-5 text-teal-600 shrink-0" />
            <div className="w-full">
              <label className="block text-[11px] font-bold uppercase text-slate-400">Select Subject Domain:</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => {
                  setSelectedSubjectId(e.target.value);
                  const newMatches = findTrainerMatches(e.target.value);
                  setSelectedTrainerMatch(newMatches[0] || null);
                }}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
              >
                {competencies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.subject} ({comp.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 px-4 py-2.5 rounded-xl text-xs text-teal-900 flex items-center space-x-3">
            <div>
              <span className="text-[10px] text-teal-700 font-bold uppercase block">Subject Description</span>
              <span className="font-semibold text-slate-800 line-clamp-1">{currentSubject?.description}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Matrix View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Trainer Match Rankings */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center justify-between">
              <span>Matched Trainer Candidates</span>
              <span className="text-xs font-normal text-slate-500">({trainerMatches.length} Available)</span>
            </h3>

            <div className="space-y-3">
              {trainerMatches.map((m) => {
                const isSelected = activeMatch?.trainerId === m.trainerId;

                return (
                  <button
                    key={m.trainerId}
                    onClick={() => setSelectedTrainerMatch(m)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-400 shadow-sm ring-2 ring-teal-200'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-slate-900">{m.trainerName}</div>
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                        {m.matchScore}% Match
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 mt-1">{m.trainerDesignation}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                      Experience: {m.experienceYears} Years
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Competency Matrix heatmap */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Visual Competency Evaluation Matrix
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Subject: {currentSubject?.subject}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-emerald-400">{activeMatch?.matchScore}%</span>
                <span className="block text-[10px] text-slate-400 uppercase">Skill Overlap Index</span>
              </div>
            </div>

            {/* Matrix Items */}
            <div className="space-y-5 text-xs">
              {activeMatch?.competencyDetails.map((detail, idx) => (
                <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>{detail.name}</span>
                    <span className="text-teal-300">{detail.matchPercentage}% Alignment</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400">
                    <div>Required Threshold: <span className="text-slate-200 font-bold">{detail.requiredLevel}%</span></div>
                    <div>Candidate Level: <span className="text-emerald-400 font-bold">{detail.trainerLevel}%</span></div>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-teal-400 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${detail.matchPercentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Assign Trainer CTA */}
            <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Candidate: <span className="text-white font-bold">{activeMatch?.trainerName}</span>
              </div>
              <button
                onClick={() => alert(`Trainer ${activeMatch?.trainerName} assigned to ${currentSubject?.subject}`)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-lg shadow-lg transition-all flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Assign Trainer to Subject</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
