// src/hooks/useAuth.ts - Custom hook for authentication logic
import { useState, useEffect } from 'react';
import type { User } from '../types/Job';
import { userAPI } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const foundUser = await userAPI.getUserByEmail(email);
      
      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }
      
      if (foundUser.password !== password) {
        return { success: false, error: 'Invalid password' };
      }

      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      const existingUser = await userAPI.getUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }

      const newUser = await userAPI.createUser(userData);
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };
};