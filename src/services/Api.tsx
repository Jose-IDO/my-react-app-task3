
import type { User, Job, JobFormData } from '../types/Job';

const API_BASE_URL = 'http://localhost:3001';


export const userAPI = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      if (!response.ok) return null;
      return response.json();
    } catch {
      return null;
    }
  },

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.email === email) || null;
    } catch {
      return null;
    }
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser = {
      ...userData,
      id: Date.now().toString() 
    };
    
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
  }
};


export const jobAPI = {
  async getAllJobs(): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  async getJobsByUserId(userId: string): Promise<Job[]> {
    try {
      const jobs = await this.getAllJobs();
      return jobs.filter(job => job.userId === userId);
    } catch {
      return [];
    }
  },

  async getJobById(id: string): Promise<Job | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
      if (!response.ok) return null;
      return response.json();
    } catch {
      return null;
    }
  },

  async createJob(jobData: JobFormData, userId: string): Promise<Job> {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      userId
    };
    
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    
    if (!response.ok) throw new Error('Failed to create job');
    
 
    const existingJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    existingJobs.push(newJob);
    localStorage.setItem('userJobs', JSON.stringify(existingJobs));
    
    return response.json();
  },

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) throw new Error('Failed to update job');
    
    // Also update localStorage
    const existingJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    const jobIndex = existingJobs.findIndex((job: Job) => job.id === id);
    if (jobIndex !== -1) {
      existingJobs[jobIndex] = { ...existingJobs[jobIndex], ...jobData };
      localStorage.setItem('userJobs', JSON.stringify(existingJobs));
    }
    
    return response.json();
  },

  async deleteJob(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete job');
    
    // Also remove from localStorage
    const existingJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    const filteredJobs = existingJobs.filter((job: Job) => job.id !== id);
    localStorage.setItem('userJobs', JSON.stringify(filteredJobs));
  },

  // Search and filter functions
  searchJobs(jobs: Job[], query: string): Job[] {
    if (!query.trim()) return jobs;
    
    const lowercaseQuery = query.toLowerCase();
    return jobs.filter(job => 
      job.companyName.toLowerCase().includes(lowercaseQuery) ||
      job.role.toLowerCase().includes(lowercaseQuery)
    );
  },

  filterJobsByStatus(jobs: Job[], status: string): Job[] {
    if (status === 'all') return jobs;
    return jobs.filter(job => job.status === status);
  },

  sortJobsByDate(jobs: Job[], order: 'asc' | 'desc'): Job[] {
    return [...jobs].sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
};