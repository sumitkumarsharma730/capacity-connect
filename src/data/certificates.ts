import { Certificate } from '@/types';

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'CERT-2025-0891',
    certificateNo: 'MOES-IMD-NWP-2025-0891',
    traineeId: 'U001',
    traineeName: 'Rahul Kumar',
    traineeDesignation: 'Scientific Assistant',
    courseId: 'CRS-NWP-101',
    courseTitle: 'Numerical Weather Prediction & WRF Model Diagnostics',
    issueDate: '2025-02-22',
    grade: 'Grade A (80%)',
    issuer: 'Director General of Meteorology, India Meteorological Department',
    verificationCode: 'VER-IMD-9988231'
  },
  {
    id: 'CERT-2025-0412',
    certificateNo: 'MOES-IMD-DWR-2025-0412',
    traineeId: 'U001',
    traineeName: 'Rahul Kumar',
    traineeDesignation: 'Scientific Assistant',
    courseId: 'CRS-DWR-202',
    courseTitle: 'Dual-Polarization Doppler Weather Radar Operation & Interpretation',
    issueDate: '2025-03-05',
    grade: 'Grade A+ (95%)',
    issuer: 'Head of Capacity Building Division, Ministry of Earth Sciences',
    verificationCode: 'VER-IMD-4411092'
  }
];
