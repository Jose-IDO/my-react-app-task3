import { useState, useEffect } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Routes, Route } from 'react-router'
import type { User } from './types/Job'
import { userAPI } from './services/api'

import { LandingPage } from './pages/LandingPage'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { ContactUs } from './pages/ContactUs'
import { JobDetails } from './pages/JobDetails'
import { AddJob } from './pages/AddJob'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoginFormVisible, setShowLoginForm] = useState(false)
  const [isRegFormVisible, setShowRegForm] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const foundUser = await userAPI.getUserByEmail(email)
    
    if (!foundUser || foundUser.password !== password) {
      return { success: false, error: 'Invalid credentials' }
    }

    setCurrentUser(foundUser)
    localStorage.setItem('currentUser', JSON.stringify(foundUser))
    setShowLoginForm(false)
    return { success: true }
  }

  const handleRegister = async (userData: Omit<User, 'id'>): Promise<{ success: boolean; error?: string }> => {
    const existingUser = await userAPI.getUserByEmail(userData.email)
    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }

    const newUser = await userAPI.createUser(userData)
    setCurrentUser(newUser)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    setShowRegForm(false)
    return { success: true }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
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
          <Route path="/" element={
            <LandingPage 
              showLoginForm={() => setShowLoginForm(true)} 
              showRegisterForm={() => setShowRegForm(true)}
            />
          } />
          
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login close={() => setShowLoginForm(false)} isVisible={true} onLogin={handleLogin} />} />
          <Route path="/register" element={<Register close={() => setShowRegForm(false)} isVisible={true} onRegister={handleRegister} />} />
          
          {currentUser && (
            <>
              <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route path="/add-job" element={<AddJob currentUser={currentUser} />} />
            </>
          )}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App