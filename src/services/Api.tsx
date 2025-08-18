
import type { User, Job, JobFormData } from '../types/Job';

const API_BASE_URL = 'http://localhost:3001';

export const userAPI = {
  async getUserByEmail(email: string): Promise<User | null> {
    const response = await fetch(`${API_BASE_URL}/users`);
    const users = await response.json();
    return users.find((user: User) => user.email === email) || null;
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    
    return response.json();
  }
};

export const jobAPI = {
  async getJobsByUserId(userId: string): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    const jobs = await response.json();
    return jobs.filter((job: Job) => job.userId === userId);
  },

  async getJobById(id: string): Promise<Job | null> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    return response.json();
  },

  async createJob(jobData: JobFormData, userId: string): Promise<Job> {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      userId
    };
    
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    });
    

    const existingJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    existingJobs.push(newJob);
    localStorage.setItem('userJobs', JSON.stringify(existingJobs));
    
    return response.json();
  },

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    
    return response.json();
  },

  async deleteJob(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
  }
};