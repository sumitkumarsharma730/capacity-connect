'use me';
'use client';

import React from 'react';
import { Shield, CloudRain, Award } from 'lucide-react';

export const GovHeader: React.FC = () => {
  return (
    <div className="bg-[#0b192c] text-white border-b border-slate-800 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-semibold tracking-wide text-slate-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GOVERNMENT OF INDIA</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 hidden sm:inline">MINISTRY OF EARTH SCIENCES (MoES)</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-sky-300 font-medium">INDIA METEOROLOGICAL DEPARTMENT (IMD)</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300 text-[11px]">
          <div className="flex items-center space-x-1">
            <CloudRain className="w-3.5 h-3.5 text-sky-400" />
            <span>Problem Statement ID: 26075</span>
          </div>
          <div className="flex items-center space-x-1 hidden md:flex">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Theme: Smart Education</span>
          </div>
        </div>
      </div>
    </div>
  );
};
