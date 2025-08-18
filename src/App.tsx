
import { useState, useEffect } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Routes, Route } from 'react-router'
import { User } from './types/Job'
import { userAPI } from './services/api'

import { LandingPage } from './LandingPage'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ContactUs } from './pages/ContactUs'

export type Product = {
  name: string,
  imgLink: string,
  description: string,
  id: number
}

function App() {
  // Authentication states
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  

  const [isLoginFormVisible, setShowLoginForm] = useState(false)
  const [isRegFormVisible, setShowRegForm] = useState(false)
  

  const [cart, setCart] = useState<Product[]>([])


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
          <Route index element={
            <Home 
              showLoginForm={() => setShowLoginForm(true)} 
              showRegisterForm={() => setShowRegForm(true)}
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
            />
          } />
          <Route path="*" element={<NotFound />} />
          <Route path="contact-us" element={<ContactUs/>} />
          <Route path="Login" element={<Login close={() => close()} isVisible onLogin={handleLogin} />} />
          <Route path="Register" element={<Register close={() => close()} isVisible onRegister={handleRegister} />} />
          <Route path="Landing-Page" element={<LandingPage/>} />
          

          {isAuthenticated && (
            <>
              <Route path="dashboard" element={<div>Dashboard - User Jobs Here</div>} />
              <Route path="jobs/:jobId" element={<div>Job Detail Page</div>} />
              <Route path="add-job" element={<div>Add Job Form</div>} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App