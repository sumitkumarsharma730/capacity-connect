import { Course } from '@/types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'CRS-NWP-101',
    code: 'NWP-101',
    title: 'Numerical Weather Prediction & WRF Model Diagnostics',
    category: 'Atmospheric Modeling',
    description: 'Comprehensive operational training on Weather Research and Forecasting (WRF) model configuration, parameterization schemes, initial condition boundary setups, data assimilation techniques, and ensemble weather prediction for IMD scientific staff.',
    trainerId: 'U002',
    trainerName: 'Dr. Ananya Sharma',
    trainerDesignation: 'Senior Scientist & Lead Instructor',
    duration: '6 Weeks (36 Hours)',
    difficulty: 'Advanced',
    rating: 4.9,
    enrolledCount: 142,
    requiredCompetencies: ['Numerical Weather Prediction', 'Atmospheric Dynamics', 'Python Data Analytics', 'High Performance Computing'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    status: 'published',
    createdAt: '2025-01-10',
    assessmentId: 'ASM-NWP-101',
    modules: [
      {
        id: 'MOD-101-1',
        title: 'Module 1: Principles of Atmospheric Governing Equations',
        description: 'Derivation of primitive equations, hydrostatic vs non-hydrostatic dynamics, spatial grid discretization.',
        duration: '6 Hours',
        resourcesCount: 4,
        completed: true
      },
      {
        id: 'MOD-101-2',
        title: 'Module 2: WRF Preprocessing System (WPS) & WPS Grid Domains',
        description: 'Geogrid, Ungrib, and Metgrid execution for Indian subcontinent domains.',
        duration: '8 Hours',
        resourcesCount: 5,
        completed: true
      },
      {
        id: 'MOD-101-3',
        title: 'Module 3: Physical Parameterizations & Cumulus Schemes',
        description: 'Microphysics options, boundary layer physics (YSU/MYJ), and convective cumulus schemes.',
        duration: '8 Hours',
        resourcesCount: 3,
        completed: false
      },
      {
        id: 'MOD-101-4',
        title: 'Module 4: GFS / NCUM Data Assimilation using WRF-DA',
        description: '3DVAR and 4DVAR assimilation of satellite radiometer and Doppler radar observations.',
        duration: '8 Hours',
        resourcesCount: 4,
        completed: false
      },
      {
        id: 'MOD-101-5',
        title: 'Module 5: Model Verification & Python Diagnostics (wrf-python)',
        description: 'Calculating CAPE, CIN, helicity, rain rate contours, and Taylor diagram evaluations.',
        duration: '6 Hours',
        resourcesCount: 3,
        completed: false
      }
    ],
    resources: [
      {
        id: 'RES-101-1',
        courseId: 'CRS-NWP-101',
        title: 'WRF V4.5 Architecture & Equation Derivations',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        size: '14.2 MB',
        status: 'published',
        uploadedAt: '2025-01-12'
      },
      {
        id: 'RES-101-2',
        courseId: 'CRS-NWP-101',
        title: 'Video Lecture: WPS Domain Setup & Geogrid Execution',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '42 Min',
        status: 'published',
        uploadedAt: '2025-01-15'
      },
      {
        id: 'RES-101-3',
        courseId: 'CRS-NWP-101',
        title: 'Presentation Slide Deck: Microphysics Parameterization in Tropical Monsoons',
        type: 'presentation',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        size: '8.5 MB',
        status: 'published',
        uploadedAt: '2025-01-18'
      },
      {
        id: 'RES-101-4',
        courseId: 'CRS-NWP-101',
        title: 'Python Notebook: wrf-python Contour & Wind Vector Script',
        type: 'study_material',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        size: '2.1 MB',
        status: 'published',
        uploadedAt: '2025-01-20'
      }
    ]
  },
  {
    id: 'CRS-DWR-202',
    code: 'DWR-202',
    title: 'Dual-Polarization Doppler Weather Radar Operation & Interpretation',
    category: 'Radar Meteorology',
    description: 'Operational training on S-band and C-band dual-polarimetric Doppler Weather Radar (DWR) operations, velocity de-aliasing, hydrometeor classification (HCA), quantitative precipitation estimation (QPE), and severe storm warnings.',
    trainerId: 'U002',
    trainerName: 'Dr. Ananya Sharma',
    trainerDesignation: 'Senior Scientist & Lead Instructor',
    duration: '4 Weeks (24 Hours)',
    difficulty: 'Intermediate',
    rating: 4.8,
    enrolledCount: 98,
    requiredCompetencies: ['Doppler Weather Radar', 'Atmospheric Dynamics', 'Cyclone Hazard Analysis'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80&w=600',
    status: 'published',
    createdAt: '2025-02-01',
    assessmentId: 'ASM-DWR-202',
    modules: [
      {
        id: 'MOD-202-1',
        title: 'Module 1: Fundamentals of Dual-Pol Radar Variables (Z, ZDR, KDP, RhoHV)',
        description: 'Reflectivity, differential reflectivity, specific differential phase, and copolar correlation coefficient.',
        duration: '6 Hours',
        resourcesCount: 3,
        completed: true
      },
      {
        id: 'MOD-202-2',
        title: 'Module 2: Doppler Velocity & De-aliasing Algorithms',
        description: 'Radial velocity interpretation, mesocyclone detection, VAD wind profiles.',
        duration: '6 Hours',
        resourcesCount: 4,
        completed: true
      },
      {
        id: 'MOD-202-3',
        title: 'Module 3: Hydrometeor Classification & QPE Algorithms',
        description: 'Differentiating hail, graupel, heavy rain, biological clutter, and melting layers.',
        duration: '6 Hours',
        resourcesCount: 3,
        completed: true
      },
      {
        id: 'MOD-202-4',
        title: 'Module 4: Severe Local Storm (SLS) Warning Protocols',
        description: 'Issuing nowcasts for thunderstorms, squall lines, microbursts, and urban flash floods.',
        duration: '6 Hours',
        resourcesCount: 2,
        completed: true
      }
    ],
    resources: [
      {
        id: 'RES-202-1',
        courseId: 'CRS-DWR-202',
        title: 'IMD Operational DWR Manual & Scanning Strategies',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        size: '18.4 MB',
        status: 'published',
        uploadedAt: '2025-02-03'
      },
      {
        id: 'RES-202-2',
        courseId: 'CRS-DWR-202',
        title: 'Video Lecture: Hydrometeor Identification in Dual-Pol Radar Scans',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '38 Min',
        status: 'published',
        uploadedAt: '2025-02-06'
      }
    ]
  },
  {
    id: 'CRS-SAT-303',
    code: 'SAT-303',
    title: 'INSAT-3DR Satellite Meteorology & Data Assimilation',
    category: 'Satellite Remote Sensing',
    description: 'Advanced curriculum on processing geostationary INSAT-3D/3DR Imager and Sounder imagery, atmospheric motion vectors (AMVs), sea surface temperature (SST), total ozone, and infrared temperature brightness counts.',
    trainerId: 'U004',
    trainerName: 'Dr. Vikram Dev',
    trainerDesignation: 'Chief Meteorologist & Director',
    duration: '5 Weeks (30 Hours)',
    difficulty: 'Advanced',
    rating: 4.7,
    enrolledCount: 76,
    requiredCompetencies: ['Satellite Remote Sensing', 'Atmospheric Dynamics', 'Python Data Analytics'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    status: 'published',
    createdAt: '2025-02-15',
    assessmentId: 'ASM-SAT-303',
    modules: [
      {
        id: 'MOD-303-1',
        title: 'Module 1: INSAT-3DR Multispectral Imager Channels',
        description: 'Visible, Shortwave IR, Middle IR, Water Vapor, and Thermal IR channel physics.',
        duration: '6 Hours',
        resourcesCount: 3,
        completed: false
      },
      {
        id: 'MOD-303-2',
        title: 'Module 2: Sounder Retrievals & Vertical Temperature Humidity Profiles',
        description: 'Retrieving 18-channel sounder profiles over North Indian Ocean.',
        duration: '8 Hours',
        resourcesCount: 3,
        completed: false
      }
    ],
    resources: [
      {
        id: 'RES-303-1',
        courseId: 'CRS-SAT-303',
        title: 'ISRO MOSDAC INSAT-3DR Data Processing Guide',
        type: 'document',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        size: '11.5 MB',
        status: 'published',
        uploadedAt: '2025-02-18'
      }
    ]
  },
  {
    id: 'CRS-CYC-404',
    code: 'CYC-404',
    title: 'Tropical Cyclone Intensity Estimation & Track Prediction',
    category: 'Extreme Weather Hazard',
    description: 'Specialized protocol for Dvorak enhanced infrared cyclone intensity estimation, ocean heat content (OHC) evaluation, track forecasting using ensemble models, and coastal storm surge modeling.',
    trainerId: 'U002',
    trainerName: 'Dr. Ananya Sharma',
    trainerDesignation: 'Senior Scientist & Lead Instructor',
    duration: '3 Weeks (18 Hours)',
    difficulty: 'Expert',
    rating: 4.95,
    enrolledCount: 110,
    requiredCompetencies: ['Cyclone Hazard Analysis', 'Atmospheric Dynamics', 'Numerical Weather Prediction'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&q=80&w=600',
    status: 'published',
    createdAt: '2025-03-01',
    assessmentId: 'ASM-CYC-404',
    modules: [
      {
        id: 'MOD-404-1',
        title: 'Module 1: Dvorak Technique & Eye Pattern Recognition',
        description: 'T-number calculation, Curved Band, Shear, Eye, and Central Dense Overcast (CDO) patterns.',
        duration: '6 Hours',
        resourcesCount: 3,
        completed: false
      },
      {
        id: 'MOD-404-2',
        title: 'Module 2: Ocean Heat Content & Rapid Intensification (RI)',
        description: 'Upper ocean thermal structure, SST anomalies, and eddy kinetic energy in cyclone amplification.',
        duration: '6 Hours',
        resourcesCount: 2,
        completed: false
      }
    ],
    resources: []
  },
  {
    id: 'CRS-CLM-505',
    code: 'CLM-505',
    title: 'Climate Change Projections & High-Performance Computing',
    category: 'Climate Science',
    description: 'Training on CORDEX South Asia regional climate projections, CMIP6 scenario analysis, NetCDF4 data wrangling with CDO/NCO, and parallel job submission on MoES Mihir & Pratyush supercomputers.',
    trainerId: 'U007',
    trainerName: 'Dr. Sunita Rao',
    trainerDesignation: 'Principal Scientist',
    duration: '4 Weeks (24 Hours)',
    difficulty: 'Intermediate',
    rating: 4.65,
    enrolledCount: 64,
    requiredCompetencies: ['Climate Change Projections', 'Python Data Analytics', 'High Performance Computing'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600',
    status: 'published',
    createdAt: '2025-03-10',
    modules: [],
    resources: []
  },
  {
    id: 'CRS-AGRO-606',
    code: 'AGRO-606',
    title: 'Agrometeorological Advisories & Crop Yield Prediction',
    category: 'Agrometeorology',
    description: 'Techniques for generating Gramin Krishi Mausam Sewa (GKMS) district-level agro-advisories, crop weather calendars, soil moisture indices, and heat wave warnings for agricultural planning.',
    trainerId: 'U007',
    trainerName: 'Dr. Sunita Rao',
    trainerDesignation: 'Principal Scientist',
    duration: '2 Weeks (12 Hours)',
    difficulty: 'Beginner',
    rating: 4.75,
    enrolledCount: 53,
    requiredCompetencies: ['Monsoon Dynamics', 'Python Data Analytics'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
    status: 'published',
    createdAt: '2025-03-15',
    modules: [],
    resources: []
  }
];
