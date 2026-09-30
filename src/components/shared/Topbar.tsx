'use me';
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, Bell, LogOut, User as UserIcon, Menu, Shield } from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationCenter } from './NotificationCenter';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  onToggleSidebarMobile?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebarMobile }) => {
  const { currentUser, logout, notifications } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const userNotifications = notifications.filter(
    (n) => !n.userId || (currentUser && n.userId === currentUser.id)
  );
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const roleColorBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'trainer':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-sky-100 text-sky-800 border-sky-300';
    }
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left section: Mobile menu toggle + Portal branding info */}
          <div className="flex items-center space-x-3">
            {onToggleSidebarMobile && (
              <button
                onClick={onToggleSidebarMobile}
                className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Toggle Navigation Drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Global Search trigger button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 text-slate-400 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-lg px-3 py-1.5 text-xs transition-colors w-48 sm:w-64 md:w-80 justify-between"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">Search portal resources...</span>
              </div>
              <kbd className="hidden sm:inline-block bg-white text-[10px] text-slate-500 font-mono px-1.5 py-0.5 rounded border border-slate-200">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* Right section: Notifications + User Profile Badge + Logout */}
          <div className="flex items-center space-x-4">
            {/* Notification center button */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            {/* User Profile Badge */}
            {currentUser && (
              <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300 ring-2 ring-slate-100"
                />
                <div className="hidden md:block text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-900 leading-none">
                      {currentUser.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${roleColorBadge(
                        currentUser.role
                      )}`}
                    >
                      {currentUser.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5 truncate max-w-[160px]">
                    {currentUser.designation}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                  title="Logout session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
