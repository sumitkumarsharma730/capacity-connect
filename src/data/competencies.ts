import { Competency } from '@/types';

export const INITIAL_COMPETENCIES: Competency[] = [
  {
    id: 'CMP-NWP',
    subject: 'Numerical Weather Prediction',
    category: 'Atmospheric Modeling',
    description: 'Advanced dynamic modeling of atmospheric flow equations, numerical discretization, parameterization schemes, and ensemble forecasting.',
    requiredCompetencies: [
      { name: 'Atmospheric Dynamics', requiredLevel: 90 },
      { name: 'Numerical Weather Prediction', requiredLevel: 95 },
      { name: 'Python Data Analytics', requiredLevel: 80 },
      { name: 'High Performance Computing', requiredLevel: 85 }
    ]
  },
  {
    id: 'CMP-DWR',
    subject: 'Doppler Weather Radar Diagnostics',
    category: 'Radar Meteorology',
    description: 'Operation and signal interpretation of dual-polarimetric S-band and C-band radar systems for severe storm nowcasting.',
    requiredCompetencies: [
      { name: 'Doppler Weather Radar', requiredLevel: 90 },
      { name: 'Atmospheric Dynamics', requiredLevel: 85 },
      { name: 'Cyclone Hazard Analysis', requiredLevel: 80 },
      { name: 'Python Data Analytics', requiredLevel: 75 }
    ]
  },
  {
    id: 'CMP-SAT',
    subject: 'Satellite Meteorology & INSAT-3DR',
    category: 'Satellite Remote Sensing',
    description: 'Retrieval of atmospheric soundings, radiometer calibration, cloud top temperatures, and geostationary vector processing.',
    requiredCompetencies: [
      { name: 'Satellite Remote Sensing', requiredLevel: 90 },
      { name: 'Atmospheric Dynamics', requiredLevel: 85 },
      { name: 'Python Data Analytics', requiredLevel: 80 }
    ]
  },
  {
    id: 'CMP-CYC',
    subject: 'Tropical Cyclone Early Warning Systems',
    category: 'Hazard Management',
    description: 'Multi-model storm track prediction, Dvorak satellite intensity estimation, ocean heat content evaluation, and storm surge warnings.',
    requiredCompetencies: [
      { name: 'Cyclone Hazard Analysis', requiredLevel: 95 },
      { name: 'Atmospheric Dynamics', requiredLevel: 90 },
      { name: 'Doppler Weather Radar', requiredLevel: 85 },
      { name: 'Numerical Weather Prediction', requiredLevel: 85 }
    ]
  },
  {
    id: 'CMP-CLM',
    subject: 'Climate Dynamics & CORDEX Projections',
    category: 'Climate Science',
    description: 'Decadal monsoon variability, regional climate downscaling, CMIP6 multi-model ensembles, and climate hazard vulnerability mapping.',
    requiredCompetencies: [
      { name: 'Climate Change Projections', requiredLevel: 95 },
      { name: 'Monsoon Dynamics', requiredLevel: 90 },
      { name: 'Python Data Analytics', requiredLevel: 85 },
      { name: 'High Performance Computing', requiredLevel: 80 }
    ]
  }
];
