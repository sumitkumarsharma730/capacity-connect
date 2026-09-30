'use me';
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  Course,
  Enrollment,
  Assessment,
  AssessmentResult,
  Certificate,
  Feedback,
  Notification,
  Announcement,
  Competency,
  TrainerMatch,
  Resource,
  Question
} from '@/types';
import { INITIAL_USERS } from '@/data/users';
import { INITIAL_COURSES } from '@/data/courses';
import { INITIAL_ASSESSMENTS, INITIAL_ASSESSMENT_RESULTS } from '@/data/assessments';
import { INITIAL_CERTIFICATES } from '@/data/certificates';
import { INITIAL_ANNOUNCEMENTS } from '@/data/announcements';
import { INITIAL_NOTIFICATIONS, INITIAL_ENROLLMENTS } from '@/data/notifications';
import { INITIAL_COMPETENCIES } from '@/data/competencies';

interface StoreContextType {
  currentUser: User | null;
  users: User[];
  courses: Course[];
  enrollments: Enrollment[];
  assessments: Assessment[];
  assessmentResults: AssessmentResult[];
  certificates: Certificate[];
  notifications: Notification[];
  announcements: Announcement[];
  competencies: Competency[];
  feedbacks: Feedback[];

  // Auth actions
  login: (email: string, password?: string) => { success: boolean; role?: Role; error?: string };
  loginAsDemo: (role: Role) => void;
  logout: () => void;

  // Trainee actions
  enrollCourse: (courseId: string) => boolean;
  updateCourseProgress: (courseId: string, progress: number) => void;
  submitAssessment: (resultData: Omit<AssessmentResult, 'id' | 'submittedAt'>) => AssessmentResult;
  submitFeedback: (feedbackData: Omit<Feedback, 'id' | 'createdAt'>) => void;

  // Trainer actions
  createCourse: (courseData: Omit<Course, 'id' | 'createdAt' | 'enrolledCount' | 'rating'>) => Course;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  addResource: (courseId: string, resourceData: Omit<Resource, 'id' | 'uploadedAt'>) => void;
  createAssessment: (assessmentData: Omit<Assessment, 'id'>) => Assessment;

  // Admin actions
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  deactivateUser: (userId: string) => void;
  changeUserRole: (userId: string, newRole: Role) => void;
  publishAnnouncement: (announcementData: Omit<Announcement, 'id' | 'publishedAt'>) => void;

  // Shared actions
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  findTrainerMatches: (subjectId: string) => TrainerMatch[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'CAPACITY_CONNECT_STATE_V1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>(INITIAL_ASSESSMENT_RESULTS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [competencies, setCompetencies] = useState<Competency[]>(INITIAL_COMPETENCIES);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.enrollments) setEnrollments(parsed.enrollments);
        if (parsed.assessments) setAssessments(parsed.assessments);
        if (parsed.assessmentResults) setAssessmentResults(parsed.assessmentResults);
        if (parsed.certificates) setCertificates(parsed.certificates);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.feedbacks) setFeedbacks(parsed.feedbacks);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      } else {
        // Default demo login as Rahul Kumar (Trainee) for easy initial viewing if no session
        setCurrentUser(INITIAL_USERS[0]);
      }
    } catch (e) {
      console.error('Failed to parse localStorage state:', e);
      setCurrentUser(INITIAL_USERS[0]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save state to localStorage on state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const payload = {
        currentUser,
        users,
        courses,
        enrollments,
        assessments,
        assessmentResults,
        certificates,
        notifications,
        announcements,
        feedbacks
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [currentUser, users, courses, enrollments, assessments, assessmentResults, certificates, notifications, announcements, feedbacks, isInitialized]);

  // Auth functions
  const login = (email: string, password?: string) => {
    const targetEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === targetEmail);

    if (!found) {
      return { success: false, error: 'User with this email does not exist.' };
    }

    if (found.status === 'pending') {
      return { success: false, error: 'Account pending administrative approval.' };
    }

    if (found.status === 'deactivated') {
      return { success: false, error: 'Account has been deactivated.' };
    }

    // Check credentials match spec rules
    if (targetEmail === 'trainee@capacityconnect.gov.in' && password && password !== 'Trainee@123') {
      return { success: false, error: 'Invalid password for Trainee demo account.' };
    }
    if (targetEmail === 'trainer@capacityconnect.gov.in' && password && password !== 'Trainer@123') {
      return { success: false, error: 'Invalid password for Trainer demo account.' };
    }
    if (targetEmail === 'admin@capacityconnect.gov.in' && password && password !== 'Admin@123') {
      return { success: false, error: 'Invalid password for Admin demo account.' };
    }

    setCurrentUser(found);
    return { success: true, role: found.role };
  };

  const loginAsDemo = (role: Role) => {
    let demoUser: User | undefined;
    if (role === 'trainee') demoUser = users.find((u) => u.email === 'trainee@capacityconnect.gov.in');
    else if (role === 'trainer') demoUser = users.find((u) => u.email === 'trainer@capacityconnect.gov.in');
    else if (role === 'admin') demoUser = users.find((u) => u.email === 'admin@capacityconnect.gov.in');

    if (demoUser) {
      setCurrentUser(demoUser);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Trainee actions
  const enrollCourse = (courseId: string): boolean => {
    if (!currentUser) return false;
    const existing = enrollments.find((e) => e.courseId === courseId && e.traineeId === currentUser.id);
    if (existing) return false;

    const newEnrollment: Enrollment = {
      id: `ENR-${Date.now()}`,
      courseId,
      traineeId: currentUser.id,
      enrolledAt: new Date().toISOString().split('T')[0],
      progressPercentage: 0,
      status: 'in_progress'
    };

    setEnrollments((prev) => [...prev, newEnrollment]);
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c))
    );
    return true;
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    if (!currentUser) return;
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId === courseId && e.traineeId === currentUser.id) {
          const isCompleted = progress >= 100;
          return {
            ...e,
            progressPercentage: Math.min(100, Math.max(0, progress)),
            status: isCompleted ? 'completed' : 'in_progress',
            completedAt: isCompleted ? (e.completedAt || new Date().toISOString().split('T')[0]) : undefined
          };
        }
        return e;
      })
    );
  };

  const submitAssessment = (resultData: Omit<AssessmentResult, 'id' | 'submittedAt'>): AssessmentResult => {
    const newResult: AssessmentResult = {
      ...resultData,
      id: `RES-${Date.now()}`,
      submittedAt: new Date().toLocaleString()
    };

    setAssessmentResults((prev) => [newResult, ...prev]);

    // If passed, auto-generate official certificate if course exists
    if (newResult.passed && currentUser) {
      const assessmentObj = assessments.find((a) => a.id === resultData.assessmentId);
      if (assessmentObj) {
        const courseObj = courses.find((c) => c.id === assessmentObj.courseId);
        if (courseObj) {
          const certNo = `MOES-IMD-${courseObj.code}-${Date.now().toString().slice(-4)}`;
          const newCert: Certificate = {
            id: `CERT-${Date.now()}`,
            certificateNo: certNo,
            traineeId: currentUser.id,
            traineeName: currentUser.name,
            traineeDesignation: currentUser.designation,
            courseId: courseObj.id,
            courseTitle: courseObj.title,
            issueDate: new Date().toISOString().split('T')[0],
            grade: `Grade A (${newResult.percentage}%)`,
            issuer: 'Director General of Meteorology, India Meteorological Department',
            verificationCode: `VER-IMD-${Math.floor(100000 + Math.random() * 900000)}`
          };
          setCertificates((prev) => [newCert, ...prev]);
        }
      }
    }

    return newResult;
  };

  const submitFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt'>) => {
    const newFb: Feedback = {
      ...feedbackData,
      id: `FB-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setFeedbacks((prev) => [newFb, ...prev]);
  };

  // Trainer actions
  const createCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'enrolledCount' | 'rating'>): Course => {
    const newCourse: Course = {
      ...courseData,
      id: `CRS-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      enrolledCount: 0,
      rating: 4.8
    };
    setCourses((prev) => [newCourse, ...prev]);
    return newCourse;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, ...updates } : c)));
  };

  const addResource = (courseId: string, resourceData: Omit<Resource, 'id' | 'uploadedAt'>) => {
    const newRes: Resource = {
      ...resourceData,
      id: `RES-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            resources: [...c.resources, newRes]
          };
        }
        return c;
      })
    );
  };

  const createAssessment = (assessmentData: Omit<Assessment, 'id'>): Assessment => {
    const newAssessment: Assessment = {
      ...assessmentData,
      id: `ASM-${Date.now().toString().slice(-4)}`
    };
    setAssessments((prev) => [newAssessment, ...prev]);
    if (assessmentData.courseId) {
      updateCourse(assessmentData.courseId, { assessmentId: newAssessment.id });
    }
    return newAssessment;
  };

  // Admin actions
  const approveUser = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: 'approved' } : u)));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, status: 'approved' } : null));
    }
  };

  const rejectUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const deactivateUser = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: 'deactivated' } : u)));
  };

  const changeUserRole = (userId: string, newRole: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
  };

  const publishAnnouncement = (announcementData: Omit<Announcement, 'id' | 'publishedAt'>) => {
    const newAnn: Announcement = {
      ...announcementData,
      id: `ANC-${Date.now().toString().slice(-4)}`,
      publishedAt: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  // Shared actions
  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Trainer Matching Algorithm for Competency Mapping
  const findTrainerMatches = (subjectId: string): TrainerMatch[] => {
    const compObj = competencies.find((c) => c.id === subjectId);
    if (!compObj) return [];

    const trainers = users.filter((u) => u.role === 'trainer' && u.status === 'approved');

    return trainers.map((t) => {
      let totalMatch = 0;
      let count = 0;

      const details = compObj.requiredCompetencies.map((req) => {
        const trainerLevel = t.competencies[req.name] || (t.skills.some((s) => s.toLowerCase().includes(req.name.toLowerCase())) ? 85 : 45);
        const matchPercentage = Math.min(100, Math.round((trainerLevel / req.requiredLevel) * 100));
        totalMatch += matchPercentage;
        count++;
        return {
          name: req.name,
          requiredLevel: req.requiredLevel,
          trainerLevel,
          matchPercentage
        };
      });

      const avgMatchScore = count > 0 ? Math.round(totalMatch / count) : 70;

      return {
        trainerId: t.id,
        trainerName: t.name,
        trainerDesignation: t.designation,
        matchScore: avgMatchScore,
        experienceYears: t.experienceYears,
        skills: t.skills,
        competencyDetails: details
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        users,
        courses,
        enrollments,
        assessments,
        assessmentResults,
        certificates,
        notifications,
        announcements,
        competencies,
        feedbacks,
        login,
        loginAsDemo,
        logout,
        enrollCourse,
        updateCourseProgress,
        submitAssessment,
        submitFeedback,
        createCourse,
        updateCourse,
        addResource,
        createAssessment,
        approveUser,
        rejectUser,
        deactivateUser,
        changeUserRole,
        publishAnnouncement,
        markNotificationRead,
        markAllNotificationsRead,
        findTrainerMatches
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
