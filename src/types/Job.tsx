

export type JobStatus = 'Applied' | 'Interviewed' | 'Rejected';

export type Job = {
  id: string;
  companyName: string;
  role: string;
  status: JobStatus;
  dateApplied: string; 
  jobDuties?: string;
  requirements?: string;
  companyAddress?: string;
  contactDetails?: string;
  notes?: string;
  userId: string;
}

export type User = {
  id: string;
  username: string;
  email: string;
  password: string; 
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}


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