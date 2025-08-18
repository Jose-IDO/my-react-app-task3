// src/types/Job.ts

export type JobStatus = 'Applied' | 'Interviewed' | 'Rejected';

export type Job = {
  id: string;
  companyName: string;
  role: string;
  status: JobStatus;
  dateApplied: string; // ISO date string
  // Extra details about the company/job
  jobDuties?: string;
  requirements?: string;
  companyAddress?: string;
  contactDetails?: string;
  notes?: string;
  // User who created this job application
  userId: string;
}

export type User = {
  id: string;
  username: string;
  email: string;
  password: string; // In real app, this would be hashed
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// For form data when creating/editing jobs
export type JobFormData = {
  companyName: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
  jobDuties?: string;
  requirements?: string;
  companyAddress?: string;
  contactDetails?: string;
  notes?: string;
}