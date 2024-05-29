export interface Assignment {
  _id?: string;
  courseId: string;
  title: string;
  points: number;
  due: Date;
}

export interface Course {
  _id?: string;
  subject: string;
  number: string;
  title: string;
  term: string;
  instructorId: string;
}

export interface Submission {
  _id?: string;
  assignmentId: string;
  studentId: string;
  timestamp: Date;
  grade: number;
  file: string;
}

export interface Enrolled {
  studentId: string;
  courseId: string;
}

export type UserRole = 'student'
| 'admin'
| 'instructor';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}