import { Assessment, AssessmentResult } from '@/types';

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'ASM-NWP-101',
    title: 'Numerical Weather Prediction & WRF Operational Assessment',
    subject: 'Numerical Weather Prediction',
    courseId: 'CRS-NWP-101',
    trainerId: 'U002',
    description: 'Comprehensive operational evaluation covering WRF WPS configuration, microphysics parameterizations, 3DVAR data assimilation, and model diagnostic output interpretation.',
    totalQuestions: 5,
    timeLimitMinutes: 15,
    passingScore: 70,
    deadline: '2026-10-15',
    status: 'active',
    questions: [
      {
        id: 'Q1',
        question: 'Which WRF Preprocessing System (WPS) program is responsible for processing geographic terrestrial static datasets (e.g. soil category, topography, land use)?',
        options: [
          { key: 'A', text: 'Ungrib.exe' },
          { key: 'B', text: 'Geogrid.exe' },
          { key: 'C', text: 'Metgrid.exe' },
          { key: 'D', text: 'Real.exe' }
        ],
        correctAnswer: 'B',
        marks: 20,
        explanation: 'Geogrid.exe defines the simulation domain grid specifications and interpolates static terrestrial fields onto the model grid.'
      },
      {
        id: 'Q2',
        question: 'When configuring WRF microphysics for tropical monsoon convective rainfall over the Indian region, which scheme accounts for multi-phase cloud water, ice, snow, and graupel?',
        options: [
          { key: 'A', text: 'Kessler scheme (warm rain only)' },
          { key: 'B', text: 'WRF Single-Moment 6-class (WSM6)' },
          { key: 'C', text: 'Lin et al. scheme' },
          { key: 'D', text: 'Both B and C' }
        ],
        correctAnswer: 'D',
        marks: 20,
        explanation: 'WSM6 and Lin schemes are 6-class microphysics parameterizations designed for explicit ice and graupel processes in convective tropical systems.'
      },
      {
        id: 'Q3',
        question: 'In WRF-3DVAR data assimilation, what role does the Background Error Covariance matrix (B matrix) perform?',
        options: [
          { key: 'A', text: 'It defines radar reflectivity calibration offsets.' },
          { key: 'B', text: 'It dictates the spatial spread and vertical cross-variable correlation of observation increments.' },
          { key: 'C', text: 'It removes hydrostatic balance from the initial conditions.' },
          { key: 'D', text: 'It sets the time step size for model integration.' }
        ],
        correctAnswer: 'B',
        marks: 20,
        explanation: 'The B matrix spreads observation innovation vectors spatially and projects information across unobserved variables.'
      },
      {
        id: 'Q4',
        question: 'In wrf-python diagnostics, Convective Available Potential Energy (CAPE) measures which thermodynamic property?',
        options: [
          { key: 'A', text: 'The energy required to lift a parcel from the surface to the LFC.' },
          { key: 'B', text: 'The integrated positive buoyant energy of an ascending parcel from the LFC to the EL.' },
          { key: 'C', text: 'The geostrophic wind shear between 0 km and 6 km.' },
          { key: 'D', text: 'The dewpoint depression at 500 hPa level.' }
        ],
        correctAnswer: 'B',
        marks: 20,
        explanation: 'CAPE represents buoyant energy positive area on a Skew-T log-P diagram between Level of Free Convection (LFC) and Equilibrium Level (EL).'
      },
      {
        id: 'Q5',
        question: 'What is the primary advantage of non-hydrostatic WRF core over hydrostatic primitive equation models for local convective nowcasting?',
        options: [
          { key: 'A', text: 'It eliminates the need for boundary conditions.' },
          { key: 'B', text: 'It explicitly resolves vertical accelerations when grid resolution is finer than 4 km.' },
          { key: 'C', text: 'It reduces memory requirements on supercomputers.' },
          { key: 'D', text: 'It automatically corrects satellite bias.' }
        ],
        correctAnswer: 'B',
        marks: 20,
        explanation: 'Non-hydrostatic dynamics account for strong vertical accelerations and updrafts essential for high-resolution (<4 km) mesoscale convective modeling.'
      }
    ]
  },
  {
    id: 'ASM-DWR-202',
    title: 'Dual-Polarization Doppler Radar Qualification Exam',
    subject: 'Doppler Weather Radar',
    courseId: 'CRS-DWR-202',
    trainerId: 'U002',
    description: 'Technical examination on polarimetric variables, hydrometeor classification, and mesocyclone velocity signatures.',
    totalQuestions: 4,
    timeLimitMinutes: 10,
    passingScore: 75,
    deadline: '2026-10-20',
    status: 'active',
    questions: [
      {
        id: 'DQ1',
        question: 'Which dual-polarization radar parameter is most effective at identifying large hail within a severe convective storm cell?',
        options: [
          { key: 'A', text: 'High Reflectivity (Z > 55 dBZ) combined with Low Differential Reflectivity (ZDR ~ 0 dB)' },
          { key: 'B', text: 'High ZDR (> 4 dB) with High RhoHV (> 0.99)' },
          { key: 'C', text: 'Low Reflectivity (< 20 dBZ) with High KDP' },
          { key: 'D', text: 'Velocity de-aliasing factor' }
        ],
        correctAnswer: 'A',
        marks: 25,
        explanation: 'Tumbling hailstones appear spherical on average (low ZDR near 0 dB) despite generating extremely high reflectivity (>55 dBZ).'
      },
      {
        id: 'DQ2',
        question: 'A sudden drop in Copolar Correlation Coefficient (RhoHV < 0.80) in an intense radar echo area typically indicates:',
        options: [
          { key: 'A', text: 'Pure stratiform rain drops' },
          { key: 'B', text: 'Non-meteorological targets such as tornado debris, insects, or biological clutter' },
          { key: 'C', text: 'Uniform dry snow' },
          { key: 'D', text: 'Radar transmitter power decay' }
        ],
        correctAnswer: 'B',
        marks: 25,
        explanation: 'Low RhoHV (<0.80) signals high inhomogeneity in scatterer shapes and orientations typical of tornadic debris or non-meteorological clutter.'
      },
      {
        id: 'DQ3',
        question: 'What velocity signature on a Plan Position Indicator (PPI) Radial Velocity display indicates a cyclonic mesocyclone rotation?',
        options: [
          { key: 'A', text: 'Uniform inbound velocities toward the radar antenna' },
          { key: 'B', text: 'Adjacent doublet of inbound (green) and outbound (red) radial velocity extrema parallel to the beam' },
          { key: 'C', text: 'Zero velocity line pointing North' },
          { key: 'D', text: 'Attenuated echo power' }
        ],
        correctAnswer: 'B',
        marks: 25,
        explanation: 'A close couplet of inbound and outbound radial velocities perpendicular to the radial beam indicates strong localized cyclonic circulation.'
      },
      {
        id: 'DQ4',
        question: 'What is the purpose of Velocity Azimuth Display (VAD) algorithm in operational radar meteorology?',
        options: [
          { key: 'A', text: 'To calculate sea surface temperature' },
          { key: 'B', text: 'To derive vertical profiles of horizontal wind speed and direction over the radar site' },
          { key: 'C', text: 'To estimate soil moisture content' },
          { key: 'D', text: 'To measure solar radiation flux' }
        ],
        correctAnswer: 'B',
        marks: 25,
        explanation: 'VAD analyzes radial velocity values along a 360-degree scan at fixed elevation angles to construct vertical wind profiles.'
      }
    ]
  }
];

export const INITIAL_ASSESSMENT_RESULTS: AssessmentResult[] = [
  {
    id: 'RES-001',
    assessmentId: 'ASM-NWP-101',
    assessmentTitle: 'Numerical Weather Prediction & WRF Operational Assessment',
    traineeId: 'U001',
    score: 80,
    totalMarks: 100,
    percentage: 80,
    passed: true,
    timeTakenMinutes: 11,
    submittedAt: '2025-02-20 14:30',
    subjectWisePerformance: [
      { subject: 'WPS Architecture', score: 100 },
      { subject: 'Microphysics Schemes', score: 100 },
      { subject: 'Data Assimilation', score: 50 },
      { subject: 'Diagnostics & CAPE', score: 100 },
      { subject: 'Non-hydrostatic Dynamics', score: 50 }
    ],
    recommendations: [
      'Review Module 4: 3DVAR Background Error Covariance matrix formulations.',
      'Practice non-hydrostatic vertical acceleration derivations.'
    ]
  }
];
