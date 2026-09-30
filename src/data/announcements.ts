import { Announcement } from '@/types';

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANC-001',
    title: 'National Workshop on AI/ML Applications in Extreme Weather Nowcasting',
    content: 'Ministry of Earth Sciences announces a 3-day specialized workshop on integrating Deep Learning for Radar & Satellite precip imagery. Nominations open for IMD & NCMRWF scientific officers.',
    category: 'Important',
    author: 'Admin Office, MoES',
    publishedAt: '2026-09-28',
    pinned: true
  },
  {
    id: 'ANC-002',
    title: 'New Specialized Course Launched: INSAT-3DR Satellite Meteorology',
    content: 'Enrollment is now active for INSAT-3DR Multispectral Data Assimilation course led by Dr. Vikram Dev. Target audience: Radar & Satellite division personnel.',
    category: 'New Course',
    author: 'Dr. Ananya Sharma',
    publishedAt: '2026-09-25',
    pinned: true
  },
  {
    id: 'ANC-003',
    title: 'MoES Officer Competency Matrix Update 2026',
    content: 'All scientific assistants and meteorologists are requested to update their skill profiles and complete assigned quarterly assessments before October 31.',
    category: 'General',
    author: 'Rajiv Mehta (Admin)',
    publishedAt: '2026-09-20',
    pinned: false
  },
  {
    id: 'ANC-004',
    title: 'IMD Achieves 98% Nowcasting Accuracy During Monsoon 2026',
    content: 'Congratulations to all officers trained in Dual-Pol Radar & NWF diagnostics for exemplary storm early warnings.',
    category: 'Achievement',
    author: 'Directorate General',
    publishedAt: '2026-09-15',
    pinned: false
  }
];
