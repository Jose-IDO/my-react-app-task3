import { useState, useEffect } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Routes, Route, Navigate } from 'react-router'
import type { User } from './types/Job'
import { userAPI } from './services/Api'
import { LandingPage } from './pages/LandingPage'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { ContactUs } from './pages/ContactUs'
import { JobDetails } from './pages/JobDetails'
import { AddJob } from './pages/AddJob'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  // Authentication states
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  
  const [isLoginFormVisible, setShowLoginForm] = useState(false)
  const [isRegFormVisible, setShowRegForm] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('currentUser')
      }
    }
    setIsAuthLoading(false)
  }, [])

  const handleLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsAuthLoading(true)
      const foundUser = await userAPI.getUserByEmail(email)
      
      if (!foundUser) {
        return { success: false, error: 'User not found' }
      }
      
      if (foundUser.password !== password) {
        return { success: false, error: 'Invalid password' }
      }

      setCurrentUser(foundUser)
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      setShowLoginForm(false) 
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleRegister = async (userData: Omit<User, 'id'>): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsAuthLoading(true)
      
      const existingUser = await userAPI.getUserByEmail(userData.email)
      if (existingUser) {
        return { success: false, error: 'Email already registered' }
      }

      const newUser = await userAPI.createUser(userData)
      setCurrentUser(newUser)
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      setShowRegForm(false)
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  const isAuthenticated = !!currentUser

  if (isAuthLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div id='app-container'>
      <Login 
        isVisible={isLoginFormVisible} 
        close={() => setShowLoginForm(false)} 
        onLogin={handleLogin}
      />
      <Register 
        close={() => setShowRegForm(false)} 
        isVisible={isRegFormVisible} 
        onRegister={handleRegister}
      />

      <div id='scrollable'>
        <Navbar 
          showLoginForm={() => setShowLoginForm(true)} 
          showRegisterForm={() => setShowRegForm(true)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <Routes>
          {/* Landing page - what visitors see first */}
          <Route path="/" element={
            <LandingPage 
              showLoginForm={() => setShowLoginForm(true)} 
              showRegisterForm={() => setShowRegForm(true)}
              isAuthenticated={isAuthenticated}
            />
          } />
          
          {/* Auth routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : 
            <Login close={() => setShowLoginForm(false)} isVisible={true} onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : 
            <Register close={() => setShowRegForm(false)} isVisible={true} onRegister={handleRegister} />
          } />
          
          {/* Public routes */}
          <Route path="/contact-us" element={<ContactUs />} />
          
          {/* Protected routes - require authentication */}
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard currentUser={currentUser!} />
            </ProtectedRoute>
          } />
          <Route path="/jobs/:jobId" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <JobDetails currentUser={currentUser!} />
            </ProtectedRoute>
          } />
          <Route path="/add-job" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddJob currentUser={currentUser!} />
            </ProtectedRoute>
          } />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App