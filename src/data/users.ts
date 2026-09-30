import { User } from '@/types';

export const INITIAL_USERS: User[] = [
  {
    id: 'U001',
    name: 'Rahul Kumar',
    email: 'trainee@capacityconnect.gov.in',
    role: 'trainee',
    department: 'India Meteorological Department (IMD)',
    designation: 'Scientific Assistant',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98765 43210',
    joinedDate: '2025-01-15',
    status: 'approved',
    qualifications: ['B.Sc. Atmospheric Science', 'M.Sc. Physics (Delhi University)', 'PG Diploma in Data Science'],
    experienceYears: 4,
    skills: ['Numerical Weather Prediction', 'Python for Geospatial Data', 'Doppler Radar Diagnostics', 'GIS Mapping'],
    bio: 'Scientific Assistant at IMD Central Observatory. Specializing in numerical weather prediction models and automated weather station telemetry.',
    competencies: {
      'Atmospheric Dynamics': 82,
      'Numerical Weather Prediction': 88,
      'Python Data Analytics': 75,
      'Doppler Weather Radar': 90,
      'Satellite Remote Sensing': 70,
      'Cyclone Hazard Analysis': 85
    }
  },
  {
    id: 'U002',
    name: 'Dr. Ananya Sharma',
    email: 'trainer@capacityconnect.gov.in',
    role: 'trainer',
    department: 'Training & Capacity Development Division, MoES',
    designation: 'Senior Scientist & Lead Instructor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98123 45678',
    joinedDate: '2023-06-10',
    status: 'approved',
    qualifications: ['Ph.D. Atmospheric Physics (IIT Delhi)', 'Post-doc (NCAR USA)', 'M.Tech Remote Sensing'],
    experienceYears: 14,
    skills: ['Numerical Weather Prediction', 'WRF Modeling', 'Atmospheric Thermodynamics', 'Climate Change Projections', 'Python', 'High Performance Computing'],
    bio: 'Senior Scientist leading meteorological capacity building programs for MoES & IMD officers. Published 40+ peer-reviewed papers in atmospheric modeling.',
    competencies: {
      'Atmospheric Dynamics': 98,
      'Numerical Weather Prediction': 95,
      'WRF & Regional Modeling': 96,
      'Python Data Analytics': 92,
      'High Performance Computing': 90,
      'Doppler Weather Radar': 88
    }
  },
  {
    id: 'U003',
    name: 'Rajiv Mehta',
    email: 'admin@capacityconnect.gov.in',
    role: 'admin',
    department: 'Administration & IT Division, MoES',
    designation: 'System Administrator & Capacity Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 99988 77665',
    joinedDate: '2022-04-01',
    status: 'approved',
    qualifications: ['M.Tech Computer Science', 'PMP Certified', 'Government E-Governance Architect'],
    experienceYears: 18,
    skills: ['Enterprise LMS Management', 'Competency Mapping Systems', 'Role-Based Access Governance', 'Data Analytics'],
    bio: 'Administrator overseeing institutional learning portals, staff competency alignment, and MoES national training programs.',
    competencies: {
      'Enterprise LMS Governance': 96,
      'Staff Competency Mapping': 94,
      'Training Quality Assurance': 90
    }
  },
  {
    id: 'U004',
    name: 'Dr. Vikram Dev',
    email: 'v.dev@moes.gov.in',
    role: 'trainer',
    department: 'Ocean & Climate Observation Division',
    designation: 'Chief Meteorologist & Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+91 97654 32109',
    joinedDate: '2023-09-15',
    status: 'approved',
    qualifications: ['Ph.D. Oceanography', 'M.Sc. Geophysics'],
    experienceYears: 20,
    skills: ['Ocean Data Assimilation', 'Tsunami Early Warning Systems', 'Satellite Altimetry', 'Python'],
    bio: 'Chief Meteorologist specializing in coupled ocean-atmosphere modeling and coastal hazard early warning systems.',
    competencies: {
      'Ocean Data Assimilation': 96,
      'Tsunami Warning Systems': 95,
      'Satellite Remote Sensing': 92,
      'Python Data Analytics': 88
    }
  },
  {
    id: 'U005',
    name: 'Priya Sundaram',
    email: 'p.sundaram@imd.gov.in',
    role: 'trainee',
    department: 'Cyclone Warning Division, IMD Chennai',
    designation: 'Meteorological Officer Grade-I',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98456 12345',
    joinedDate: '2024-03-20',
    status: 'approved',
    qualifications: ['M.Sc. Meteorology', 'B.Sc. Physics'],
    experienceYears: 6,
    skills: ['Tropical Cyclone Forecasting', 'Doppler Radar', 'GIS'],
    bio: 'Officer at Regional Meteorological Centre Chennai dedicated to extreme weather track forecasting.',
    competencies: {
      'Cyclone Hazard Analysis': 92,
      'Doppler Weather Radar': 85,
      'Atmospheric Dynamics': 80
    }
  },
  {
    id: 'U006',
    name: 'Amit Patel',
    email: 'a.patel@imd.gov.in',
    role: 'trainee',
    department: 'Radar Meteorology Division, IMD Ahmedabad',
    designation: 'Technical Assistant',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    phone: '+91 99112 23344',
    joinedDate: '2026-09-01',
    status: 'pending',
    qualifications: ['B.Tech Instrumentation', 'Diploma in Radar Maintenance'],
    experienceYears: 2,
    skills: ['Radar Hardware Maintenance', 'Calibration'],
    bio: 'Newly recruited technical assistant awaiting officer role approval.',
    competencies: {
      'Doppler Weather Radar': 70
    }
  },
  {
    id: 'U007',
    name: 'Dr. Sunita Rao',
    email: 's.rao@moes.gov.in',
    role: 'trainer',
    department: 'Climate Research & Services Division',
    designation: 'Principal Scientist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    phone: '+91 98711 22334',
    joinedDate: '2023-01-10',
    status: 'approved',
    qualifications: ['Ph.D. Climate Science (IISc Bangalore)'],
    experienceYears: 16,
    skills: ['Monsoon Prediction', 'Climate Extremes', 'R Programming', 'Python'],
    bio: 'Principal Scientist researching Indian summer monsoon variability and extreme precipitation events.',
    competencies: {
      'Monsoon Dynamics': 97,
      'Climate Change Projections': 94,
      'Python Data Analytics': 90
    }
  },
  {
    id: 'U008',
    name: 'Rajesh Sharma',
    email: 'r.sharma@imd.gov.in',
    role: 'trainee',
    department: 'Agrometeorology Division, IMD Pune',
    designation: 'Scientific Assistant',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    phone: '+91 97112 33445',
    joinedDate: '2026-09-15',
    status: 'pending',
    qualifications: ['M.Sc. Agricultural Meteorology'],
    experienceYears: 3,
    skills: ['Crop Modeling', 'Agro-Advisory Generation'],
    bio: 'Technical specialist providing weather-based agricultural advisories for farmers.',
    competencies: {
      'Agrometeorology': 85
    }
  }
];
