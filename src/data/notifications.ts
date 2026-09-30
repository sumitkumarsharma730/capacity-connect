import { Notification, Enrollment } from '@/types';

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'NOT-001',
    userId: 'U001',
    title: 'Assessment Deadline Reminder',
    message: 'Your assessment for "Numerical Weather Prediction & WRF Model Diagnostics" is due in 3 days.',
    type: 'warning',
    read: false,
    timestamp: '2026-09-30 09:15',
    link: '/trainee/assessments/ASM-NWP-101'
  },
  {
    id: 'NOT-002',
    userId: 'U001',
    title: 'Certificate Issued',
    message: 'Your official certificate for Dual-Polarization Doppler Weather Radar has been generated.',
    type: 'success',
    read: false,
    timestamp: '2026-09-29 16:40',
    link: '/trainee/certificates'
  },
  {
    id: 'NOT-003',
    userId: 'U001',
    title: 'New Resource Uploaded',
    message: 'Dr. Ananya Sharma added a new video lecture: "WPS Domain Setup & Geogrid Execution".',
    type: 'info',
    read: true,
    timestamp: '2026-09-28 11:20',
    link: '/trainee/learning'
  },
  {
    id: 'NOT-004',
    userId: 'U002',
    title: 'New Trainee Enrolled',
    message: 'Rahul Kumar enrolled in your course "Numerical Weather Prediction & WRF Model Diagnostics".',
    type: 'info',
    read: false,
    timestamp: '2026-09-30 08:00',
    link: '/trainer/trainees'
  },
  {
    id: 'NOT-005',
    userId: 'U003',
    title: 'Pending User Approvals',
    message: '2 new scientific assistants have registered and require administrative clearance.',
    type: 'alert',
    read: false,
    timestamp: '2026-09-30 10:30',
    link: '/admin/users/pending'
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'ENR-001',
    courseId: 'CRS-NWP-101',
    traineeId: 'U001',
    enrolledAt: '2025-01-15',
    progressPercentage: 40,
    status: 'in_progress'
  },
  {
    id: 'ENR-002',
    courseId: 'CRS-DWR-202',
    traineeId: 'U001',
    enrolledAt: '2025-02-05',
    progressPercentage: 100,
    status: 'completed',
    completedAt: '2025-03-05'
  },
  {
    id: 'ENR-003',
    courseId: 'CRS-SAT-303',
    traineeId: 'U005',
    enrolledAt: '2025-02-20',
    progressPercentage: 25,
    status: 'in_progress'
  },
  {
    id: 'ENR-004',
    courseId: 'CRS-CYC-404',
    traineeId: 'U005',
    enrolledAt: '2025-03-02',
    progressPercentage: 60,
    status: 'in_progress'
  }
];
