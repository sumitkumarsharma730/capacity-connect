'use me';
'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { useStore } from '@/context/StoreContext';
import { Award, Printer, Download, ShieldCheck, CloudRain, CheckCircle2 } from 'lucide-react';

export default function TraineeCertificatesPage() {
  const { certificates, currentUser } = useStore();

  const userCerts = certificates.filter((c) => c.traineeId === currentUser?.id);
  const [selectedCert, setSelectedCert] = useState(userCerts[0] || certificates[0]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Official Certifications Registry</h1>
            <p className="text-xs text-slate-500 mt-1">
              Verified digital certificates issued by Ministry of Earth Sciences & India Meteorological Department.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Certificate</span>
            </button>
          </div>
        </div>

        {/* Certificate List Selector */}
        {userCerts.length > 1 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {userCerts.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedCert?.id === cert.id
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cert.courseTitle}
              </button>
            ))}
          </div>
        )}

        {/* Certificate Preview Frame */}
        {selectedCert && (
          <div className="bg-slate-800 p-4 sm:p-8 rounded-2xl border border-slate-700 shadow-2xl flex justify-center">
            <div
              id="printable-certificate"
              className="bg-[#faf8f5] text-slate-900 p-8 sm:p-12 rounded-xl border-8 border-double border-[#0b192c] max-w-3xl w-full shadow-2xl relative overflow-hidden font-serif"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#0b192c]"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#0b192c]"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#0b192c]"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#0b192c]"></div>

              {/* Watermark Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <CloudRain className="w-96 h-96 text-slate-900" />
              </div>

              {/* Certificate Content Header */}
              <div className="text-center space-y-2 relative z-10 border-b border-slate-300 pb-6">
                <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-slate-800 uppercase font-sans">
                  <span>Government of India</span> • <span>Ministry of Earth Sciences</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0b192c] uppercase tracking-wide">
                  INDIA METEOROLOGICAL DEPARTMENT
                </h2>
                <div className="text-xs font-semibold text-slate-600 tracking-wider uppercase font-sans">
                  National Digital Capacity Building Framework
                </div>
              </div>

              {/* Body */}
              <div className="text-center py-8 space-y-4 relative z-10">
                <p className="text-xs italic text-slate-600 font-sans uppercase tracking-widest">
                  This is to certify that
                </p>

                <div className="text-2xl sm:text-3xl font-bold text-[#0b192c] border-b-2 border-slate-400 inline-block px-8 py-1">
                  {selectedCert.traineeName}
                </div>

                <p className="text-xs text-slate-700 font-sans max-w-md mx-auto leading-relaxed">
                  Designation: <span className="font-semibold text-slate-900">{selectedCert.traineeDesignation}</span>
                  <br />
                  has successfully completed the advanced operational capacity training program on:
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-sky-900 max-w-lg mx-auto font-sans leading-snug">
                  {selectedCert.courseTitle}
                </h3>

                <p className="text-xs text-slate-600 font-sans">
                  Performance Evaluation Grade: <span className="font-bold text-slate-900">{selectedCert.grade}</span>
                </p>
              </div>

              {/* Signatures & Seal Footer */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-300 relative z-10 font-sans text-xs">
                <div className="text-left space-y-1">
                  <div className="font-mono text-[10px] text-slate-500">Cert No: {selectedCert.certificateNo}</div>
                  <div className="font-mono text-[10px] text-slate-500">Issue Date: {selectedCert.issueDate}</div>
                  <div className="font-mono text-[10px] text-emerald-700 font-bold flex items-center space-x-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified: {selectedCert.verificationCode}</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-bold text-slate-900 border-b border-slate-400 pb-1 inline-block">
                    Dr. Mrutyunjay Mohapatra
                  </div>
                  <div className="text-[10px] text-slate-600">Director General of Meteorology</div>
                  <div className="text-[10px] text-slate-500">India Meteorological Department</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
