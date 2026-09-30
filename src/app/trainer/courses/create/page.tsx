'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { BookOpen, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function CreateCoursePage() {
  const { createCourse, currentUser } = useStore();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Atmospheric Modeling');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');
  const [duration, setDuration] = useState('4 Weeks (24 Hours)');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourse({
      code: code || `CRS-${Date.now().toString().slice(-4)}`,
      title,
      category,
      description,
      trainerId: currentUser?.id || 'U002',
      trainerName: currentUser?.name || 'Dr. Ananya Sharma',
      trainerDesignation: currentUser?.designation || 'Senior Scientist',
      duration,
      difficulty,
      requiredCompetencies: ['Atmospheric Dynamics', 'Numerical Weather Prediction', 'Python Data Analytics'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
      status: 'published',
      modules: [
        {
          id: `MOD-${Date.now()}-1`,
          title: 'Module 1: Introduction & Fundamental Equations',
          description: 'Basic principles and initial condition formulations.',
          duration: '6 Hours',
          resourcesCount: 2
        }
      ],
      resources: []
    });

    router.push('/trainer/courses');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create New Training Course</h1>
          <p className="text-xs text-slate-500 mt-1">
            Author scientific capacity building curriculum for MoES & IMD staff.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Course Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. NWP-202"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              >
                <option value="Atmospheric Modeling">Atmospheric Modeling</option>
                <option value="Radar Meteorology">Radar Meteorology</option>
                <option value="Satellite Remote Sensing">Satellite Remote Sensing</option>
                <option value="Extreme Weather Hazard">Extreme Weather Hazard</option>
                <option value="Climate Science">Climate Science</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Course Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced Ensemble Tropical Cyclone Track Forecasting"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Duration</label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 4 Weeks (24 Hours)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Course Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of scientific objectives and operational SOPs covered..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-lg shadow-md flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Course to Catalog</span>
          </button>
        </form>
      </div>
    </AppShell>
  );
}
