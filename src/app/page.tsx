'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { GovHeader } from '@/components/shared/GovHeader';
import { useStore } from '@/context/StoreContext';
import {
  CloudRain,
  BookOpen,
  Award,
  Users,
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe2,
  FileText,
  BarChart3,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const { courses, announcements } = useStore();

  const featuredCourses = courses.slice(0, 3);
  const latestAnnouncements = announcements.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GovHeader />

      {/* Navigation Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0b192c] flex items-center justify-center text-sky-400 shadow-md">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight block leading-none">
                CAPACITY CONNECT
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Digital Learning Portal</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-600">
            <Link href="/" className="text-sky-700 font-semibold hover:text-sky-800">
              Home
            </Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">
              Courses
            </Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">
              Learning
            </Link>
            <Link href="#about" className="hover:text-slate-900 transition-colors">
              About Platform
            </Link>
            <Link href="#competency" className="hover:text-slate-900 transition-colors">
              Competency Mapping
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Portal Login
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-[#0b192c] hover:bg-[#1e3a8a] text-xs font-semibold text-white shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <span>Explore Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0b192c] via-[#0f2942] to-[#1e3a8a] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(2,132,199,0.25),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-sky-950/80 border border-sky-500/30 px-3 py-1 rounded-full text-xs text-sky-300 mb-6 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>National Capacity Building Platform • MoES / IMD</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Building Capability. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">
                Connecting Knowledge.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              A centralized digital platform for organizational learning, competency development, training
              management, and knowledge sharing across India Meteorological Department & Ministry of Earth Sciences.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-sky-500/20 transition-all flex items-center space-x-2"
              >
                <span>Explore Learning Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Demo Account Access</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Band */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-sky-100 text-sky-700 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">1,240+</div>
              <div className="text-xs text-slate-500 font-medium">Active Trainee Officers</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">850+</div>
              <div className="text-xs text-slate-500 font-medium">Certificates Issued</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">48</div>
              <div className="text-xs text-slate-500 font-medium">Specialized Modules</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">96.4%</div>
              <div className="text-xs text-slate-500 font-medium">Competency Alignment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
              Curriculum Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Scientific Training Programs</h2>
          </div>
          <Link
            href="/login"
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center space-x-1"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      {course.category}
                    </span>
                    <span className="text-xs text-slate-500">{course.duration}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug mb-2">{course.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{course.description}</p>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Instructor: {course.trainerName}</span>
                  <Link
                    href="/login"
                    className="font-semibold text-sky-700 hover:text-sky-900 flex items-center space-x-1"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Competency Mapping Highlight Section */}
      <section id="competency" className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-teal-950 border border-teal-800 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>Competency Mapping Matrix</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                Data-Driven Scientific Skill & Trainer Matching Engine
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                Capacity Connect bridges department skill requirements with expert scientific trainers. Our visual matrix evaluates required competency thresholds against individual officer skill ratings to calculate deterministic matching scores.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Subject Competency Requirement Matrix</h4>
                    <p className="text-[11px] text-slate-400">
                      Defines precise skill thresholds across Atmospheric Dynamics, Doppler Radar, Satellite Radiometry, and NWP.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Deterministic Match Algorithm</h4>
                    <p className="text-[11px] text-slate-400">
                      Calculates percentage compatibility, skill gaps, and experience weighting for optimal trainer allocation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all inline-flex items-center space-x-2"
                >
                  <span>Experience Competency Matrix Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Matrix Graphic */}
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                <div>
                  <span className="text-xs font-bold text-sky-400">Subject Matrix: Numerical Weather Prediction</span>
                  <p className="text-[10px] text-slate-400">Matched Trainer: Dr. Ananya Sharma (Senior Scientist)</p>
                </div>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  94% Match
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Atmospheric Dynamics</span>
                    <span className="text-sky-400">95% / Req: 90%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-sky-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Numerical Weather Prediction</span>
                    <span className="text-teal-400">96% / Req: 95%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-teal-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Python Data Analytics</span>
                    <span className="text-emerald-400">92% / Req: 80%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>High Performance Computing</span>
                    <span className="text-indigo-400">90% / Req: 85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Ticker */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Latest Portal Announcements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestAnnouncements.map((ann) => (
            <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  {ann.category}
                </span>
                <span className="text-[10px] text-slate-400">{ann.publishedAt}</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-2">{ann.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{ann.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#0b192c] text-slate-400 border-t border-slate-800 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <CloudRain className="w-5 h-5 text-sky-400" />
            <div>
              <span className="font-bold text-slate-200">CAPACITY CONNECT</span>
              <span className="block text-[10px] text-slate-400">
                Ministry of Earth Sciences • India Meteorological Department
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 text-center md:text-right">
            <div>Smart India Hackathon Prototype • Problem Statement ID: 26075</div>
            <div className="text-slate-400 mt-0.5">Frontend Prototype Version 1.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
