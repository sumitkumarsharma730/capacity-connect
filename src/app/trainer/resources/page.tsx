'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { FolderOpen, UploadCloud, FileText, Video, Presentation, CheckCircle2, Trash2 } from 'lucide-react';

export default function ResourceLibraryPage() {
  const { courses, addResource } = useStore();

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState<'video' | 'pdf' | 'presentation' | 'document' | 'study_material'>('pdf');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle) return;

    setUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            addResource(selectedCourseId, {
              courseId: selectedCourseId,
              title: resourceTitle,
              type: resourceType,
              url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              size: '12.4 MB',
              status: 'published'
            });
            setUploading(false);
            setUploadProgress(0);
            setResourceTitle('');
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Resource Library</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload and manage scientific lectures, presentations, manuals, and study materials.
          </p>
        </div>

        {/* Upload Simulation Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <UploadCloud className="w-5 h-5 text-teal-600" />
            <span>Upload Scientific Resource to Course Repository</span>
          </h2>

          <form onSubmit={handleSimulateUpload} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.code}] {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">Resource Title</label>
              <input
                type="text"
                required
                value={resourceTitle}
                onChange={(e) => setResourceTitle(e.target.value)}
                placeholder="e.g. DWR Velocity De-aliasing Technical Manual"
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Resource Type</label>
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as any)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              >
                <option value="pdf">PDF Document</option>
                <option value="video">Recorded Video</option>
                <option value="presentation">Slide Deck</option>
                <option value="study_material">Study Material</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </form>

          {/* Animated Progress Bar */}
          {uploading && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Simulating Upload & Encryption...</span>
                <span className="text-teal-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Existing Resources List */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900">
            Resources for [{currentCourse?.code}] {currentCourse?.title} ({currentCourse?.resources.length})
          </h3>

          <div className="divide-y divide-slate-100">
            {currentCourse?.resources.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4">No resources uploaded yet for this course.</p>
            ) : (
              currentCourse?.resources.map((res) => (
                <div key={res.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-700">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{res.title}</div>
                      <div className="text-[10px] text-slate-500">
                        Uploaded: {res.uploadedAt} • Size: {res.size || '10 MB'}
                      </div>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {res.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
