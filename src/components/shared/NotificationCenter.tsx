'use me';
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Bell, CheckCheck, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import Link from 'next/link';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, currentUser, markNotificationRead, markAllNotificationsRead } = useStore();

  if (!isOpen) return null;

  const userNotifications = notifications.filter(
    (n) => !n.userId || (currentUser && n.userId === currentUser.id)
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default:
        return <Info className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-xs tracking-wide">Notifications Center</span>
          {unreadCount > 0 && (
            <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllNotificationsRead()}
              className="text-[11px] text-sky-300 hover:text-white flex items-center space-x-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
          )}
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {userNotifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">No notifications available.</div>
        ) : (
          userNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 flex items-start space-x-3 ${
                !notif.read ? 'bg-sky-50/40 font-medium' : 'bg-white'
              }`}
            >
              <div className="mt-0.5">{getIcon(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 truncate">{notif.title}</span>
                  <span className="text-[10px] text-slate-400">{notif.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{notif.message}</p>
                {notif.link && (
                  <Link
                    href={notif.link}
                    onClick={onClose}
                    className="inline-block text-[10px] text-sky-600 hover:underline mt-1.5 font-semibold"
                  >
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-[11px] text-slate-500 text-center">
        Real-time Capacity Building Alerts
      </div>
    </div>
  );
};
