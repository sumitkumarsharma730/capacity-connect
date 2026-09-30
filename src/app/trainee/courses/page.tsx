'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { Search, Filter, BookOpen, Star, Clock, User, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CourseCatalogPage() {
  const { courses, enrollments, currentUser, enrollCourse } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Atmospheric Modeling', 'Radar Meteorology', 'Satellite Remote Sensing', 'Extreme Weather Hazard', 'Climate Science'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const userEnrollments = enrollments.filter((e) => e.traineeId === currentUser?.id);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Scientific Course Catalog</h1>
            <p className="text-xs text-slate-500 mt-1">
              Explore capacity building courses across atmospheric modeling, radar operations, and climate projections.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course title, code, or topic..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-slate-600">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-slate-600">Level:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrollment = userEnrollments.find((e) => e.courseId === course.id);
            const isEnrolled = !!enrollment;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative">
                    <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {course.code}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {course.difficulty}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold text-sky-700">{course.category}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug mb-2">{course.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{course.description}</p>

                    <div className="flex items-center space-x-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-800 truncate">{course.trainerName}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.enrolledCount})</span>
                  </div>

                  {isEnrolled ? (
                    <Link
                      href="/trainee/learning"
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/trainee/courses/${course.id}`}
                      className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <span>View Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
