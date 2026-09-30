'use me';
'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, X, BookOpen, User, FileText, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { courses, users, announcements } = useStore();
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredCourses = trimmed
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmed) ||
          c.code.toLowerCase().includes(trimmed) ||
          c.category.toLowerCase().includes(trimmed)
      )
    : courses.slice(0, 3);

  const filteredTrainers = trimmed
    ? users.filter(
        (u) =>
          u.role === 'trainer' &&
          (u.name.toLowerCase().includes(trimmed) || u.skills.some((s) => s.toLowerCase().includes(trimmed)))
      )
    : users.filter((u) => u.role === 'trainer').slice(0, 2);

  const filteredAnnouncements = trimmed
    ? announcements.filter(
        (a) => a.title.toLowerCase().includes(trimmed) || a.content.toLowerCase().includes(trimmed)
      )
    : announcements.slice(0, 2);

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, trainers, resources, or announcements..."
            className="w-full text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Courses Section */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Courses ({filteredCourses.length})</span>
            </div>
            {filteredCourses.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No courses found matching query.</p>
            ) : (
              <div className="space-y-1">
                {filteredCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleSelect(`/trainee/courses/${course.id}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-sky-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-sky-700">
                        [{course.code}] {course.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {course.category} • {course.trainerName} • {course.duration}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trainers Section */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>Trainers & Specialists ({filteredTrainers.length})</span>
            </div>
            {filteredTrainers.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No trainers found.</p>
            ) : (
              <div className="space-y-1">
                {filteredTrainers.map((trainer) => (
                  <button
                    key={trainer.id}
                    onClick={() => handleSelect(`/admin/competency?trainerId=${trainer.id}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-teal-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-teal-700">
                          {trainer.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{trainer.designation}</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-medium">
                      {trainer.experienceYears} Years Exp
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Announcements Section */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Announcements & News ({filteredAnnouncements.length})</span>
            </div>
            {filteredAnnouncements.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No announcements match.</p>
            ) : (
              <div className="space-y-1">
                {filteredAnnouncements.map((ann) => (
                  <div key={ann.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800">{ann.title}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                        {ann.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{ann.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>MoES / IMD Search Index</span>
        </div>
      </div>
    </div>
  );
};
