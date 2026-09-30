'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Megaphone, PlusCircle, Pin, CheckCircle2 } from 'lucide-react';

export default function AdminContentPage() {
  const { announcements, publishAnnouncement, currentUser } = useStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'General' | 'Important' | 'New Course' | 'Achievement'>('Important');
  const [pinned, setPinned] = useState(true);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    publishAnnouncement({
      title,
      content,
      category,
      author: currentUser?.name || 'Admin Office',
      pinned
    });

    setPublishedSuccess(true);
    setTitle('');
    setContent('');
    setTimeout(() => setPublishedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Announcements & Portal Content</h1>
          <p className="text-xs text-slate-500 mt-1">Publish institutional news, achievements, and course alerts to the portal homepage.</p>
        </div>

        {/* Publisher Form Card */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-amber-600" />
            <span>Publish New Announcement</span>
          </h2>

          {publishedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Announcement published! It is now live on the Public Landing Page and Dashboards.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. National Workshop on Deep Learning for Radar Nowcasting"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              >
                <option value="Important">Important</option>
                <option value="New Course">New Course</option>
                <option value="Achievement">Achievement</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Announcement Body</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide full description and instructions for officers..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Pin to Portal Homepage Ticker</span>
            </label>

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-lg shadow-md transition-all flex items-center space-x-2"
            >
              <Megaphone className="w-4 h-4" />
              <span>Publish Announcement</span>
            </button>
          </div>
        </form>

        {/* Existing Published List */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Live Portal Announcements ({announcements.length})</h3>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {ann.category}
                    </span>
                    {ann.pinned && (
                      <span className="text-[10px] text-amber-700 font-bold flex items-center space-x-1">
                        <Pin className="w-3 h-3" />
                        <span>Pinned</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{ann.publishedAt}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 mt-1">{ann.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
