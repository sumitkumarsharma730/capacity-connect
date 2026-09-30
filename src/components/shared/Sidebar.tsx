'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import {
  LayoutDashboard,
  User,
  BookOpen,
  GraduationCap,
  Award,
  FileCheck,
  MessageSquare,
  Bell,
  PlusCircle,
  FolderOpen,
  FileQuestion,
  Users,
  LineChart,
  Target,
  ShieldCheck,
  CheckSquare,
  BarChart3,
  Layers,
  Megaphone,
  FileSpreadsheet,
  Settings,
  CloudRain,
  X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onCloseMobile }) => {
  const pathname = usePathname();
  const { currentUser } = useStore();

  const role = currentUser?.role || 'trainee';

  const traineeNav = [
    { title: 'Dashboard', href: '/trainee/dashboard', icon: LayoutDashboard },
    { title: 'My Profile', href: '/trainee/profile', icon: User },
    { title: 'Course Catalog', href: '/trainee/courses', icon: BookOpen },
    { title: 'LMS Learning Player', href: '/trainee/learning', icon: GraduationCap },
    { title: 'MCQ Assessments', href: '/trainee/assessments', icon: FileCheck },
    { title: 'Certificates', href: '/trainee/certificates', icon: Award },
    { title: 'Course Feedback', href: '/trainee/feedback', icon: MessageSquare },
    { title: 'Notifications', href: '/trainee/notifications', icon: Bell }
  ];

  const trainerNav = [
    { title: 'Dashboard', href: '/trainer/dashboard', icon: LayoutDashboard },
    { title: 'Trainer Profile', href: '/trainer/profile', icon: User },
    { title: 'Course Management', href: '/trainer/courses', icon: BookOpen },
    { title: 'Create New Course', href: '/trainer/courses/create', icon: PlusCircle },
    { title: 'Resource Library', href: '/trainer/resources', icon: FolderOpen },
    { title: 'Questionnaire Builder', href: '/trainer/questionnaires/create', icon: FileQuestion },
    { title: 'Trainees Directory', href: '/trainer/trainees', icon: Users },
    { title: 'Trainee Performance', href: '/trainer/performance', icon: LineChart },
    { title: 'Competency Profile', href: '/trainer/competency', icon: Target }
  ];

  const adminNav = [
    { title: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'User Management', href: '/admin/users', icon: Users },
    { title: 'Pending Approvals', href: '/admin/users/pending', icon: CheckSquare },
    { title: 'Course Monitoring', href: '/admin/courses', icon: BookOpen },
    { title: 'Enrollment Tracker', href: '/admin/enrollments', icon: Layers },
    { title: 'Assessment Registry', href: '/admin/assessments', icon: FileCheck },
    { title: 'Certifications Log', href: '/admin/certifications', icon: Award },
    { title: 'Participation Analytics', href: '/admin/participation', icon: BarChart3 },
    { title: 'Announcements & Content', href: '/admin/content', icon: Megaphone },
    { title: 'Visual Competency Mapping', href: '/admin/competency', icon: Target },
    { title: 'Reports & Audits', href: '/admin/reports', icon: FileSpreadsheet },
    { title: 'Settings', href: '/admin/settings', icon: Settings }
  ];

  const activeNav = role === 'admin' ? adminNav : role === 'trainer' ? trainerNav : traineeNav;

  const content = (
    <div className="flex flex-col h-full bg-[#0b192c] text-slate-200 border-r border-slate-800 w-64">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-wide leading-tight">CAPACITY CONNECT</h1>
            <p className="text-[10px] text-slate-400 font-medium">MoES / IMD Portal</p>
          </div>
        </Link>
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="lg:hidden text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/80">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Current Role Mode</div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-semibold text-sky-400 capitalize">{role} Portal</span>
          <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">
            {role === 'admin' ? 'SEC-LEVEL-3' : role === 'trainer' ? 'INST-LEVEL-2' : 'TRN-LEVEL-1'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {activeNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== `/trainee/courses` && item.href !== `/trainer/courses`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Branding */}
      <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 text-center bg-slate-950/40">
        <div>India Meteorological Department</div>
        <div className="text-slate-500 font-mono mt-0.5">v2.4.0-PROTOTYPE</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0">{content}</aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};
