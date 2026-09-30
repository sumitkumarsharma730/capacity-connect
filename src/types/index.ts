export type Role = 'trainee' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  designation: string;
  avatar: string;
  phone: string;
  joinedDate: string;
  status: 'approved' | 'pending' | 'deactivated';
  qualifications: string[];
  experienceYears: number;
  skills: string[];
  bio: string;
  competencies: Record<string, number>; // Competency name -> Score (0-100)
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  resourcesCount: number;
  completed?: boolean;
}

export interface Resource {
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'pdf' | 'presentation' | 'document' | 'study_material';
  url: string;
  duration?: string;
  size?: string;
  status: 'published' | 'draft';
  uploadedAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  marks: number;
  explanation?: string;
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  courseId: string;
  trainerId: string;
  description: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  deadline: string;
  status: 'active' | 'draft' | 'closed';
  questions: Question[];
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  traineeId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeTakenMinutes: number;
  submittedAt: string;
  subjectWisePerformance: { subject: string; score: number }[];
  recommendations: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  trainerId: string;
  trainerName: string;
  trainerDesignation: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  rating: number;
  enrolledCount: number;
  modules: CourseModule[];
  resources: Resource[];
  assessmentId?: string;
  requiredCompetencies: string[];
  thumbnailUrl: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  traineeId: string;
  enrolledAt: string;
  progressPercentage: number;
  status: 'in_progress' | 'completed';
  completedAt?: string;
}

export interface Certificate {
  id: string;
  certificateNo: string;
  traineeId: string;
  traineeName: string;
  traineeDesignation: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  issuer: string;
  verificationCode: string;
}

export interface Feedback {
  id: string;
  traineeId: string;
  courseId: string;
  overallRating: number;
  courseQuality: number;
  trainerEffectiveness: number;
  learningResources: number;
  assessmentQuality: number;
  comments: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Important' | 'New Course' | 'Achievement';
  author: string;
  publishedAt: string;
  pinned: boolean;
}

export interface CompetencyRequirement {
  name: string;
  requiredLevel: number; // 0 - 100
}

export interface Competency {
  id: string;
  subject: string;
  description: string;
  category: string;
  requiredCompetencies: CompetencyRequirement[];
}

export interface CompetencyDetail {
  name: string;
  requiredLevel: number;
  trainerLevel: number;
  matchPercentage: number;
}

export interface TrainerMatch {
  trainerId: string;
  trainerName: string;
  trainerDesignation: string;
  matchScore: number;
  experienceYears: number;
  skills: string[];
  competencyDetails: CompetencyDetail[];
}
