// src/components/Navbar/Navbar.tsx
import React from 'react'
import styles from './Navbar.module.css'
import { Text } from '../Text/Text'
import { NavLink, useNavigate } from 'react-router-dom'
import { Searchbar } from '../Search/Searchbar'
import type { User } from '../../types/Job'

type NavbarProps = {
    showLoginForm?: () => void,
    showRegisterForm?: () => void,
    currentUser?: User | null,
    onLogout?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ 
    showLoginForm, 
    showRegisterForm, 
    currentUser,
    onLogout 
}) => {
    const navigate = useNavigate()
    
    const handleProfileClick = () => {
        if (currentUser) {
            navigate('/dashboard')
        } else if (showLoginForm) {
            showLoginForm()
        }
    }

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
        navigate('/')
    }
    
    return (
        <nav>
            <div className={styles.content}>
                <div className={styles['logo-container']}> 
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <Text variant={'h2'} style={{ margin: 0, padding: 0, fontSize: 40, color: 'white' }}>
                            Jobseek.com
                        </Text>
                    </NavLink>
                </div>

                {currentUser && <Searchbar />}

                <div className={styles['navbar-links']}> 
                    {currentUser ? (

                        <>
                            <NavLink to="/dashboard" className={styles.link}>Dashboard</NavLink>
                            <NavLink to="/add-job" className={styles.link}>Add Job</NavLink>
                            <NavLink to="/contact-us" className={styles.link}>Contact Us</NavLink>
                            <button 
                                className={styles.link}
                                onClick={handleLogout}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (

                        <>
                            <NavLink to="/" className={styles.link}>Home</NavLink>
                            <NavLink to="/contact-us" className={styles.link}>Contact Us</NavLink>
                            <NavLink to="/login" className={styles.link}>Login</NavLink>
                            <NavLink to="/register" className={styles.link}>Register</NavLink>
                        </>
                    )}

                    <div className={styles['profile-icon']} onClick={handleProfileClick}>
                        <Text variant={'span'}>
                            {currentUser ? currentUser.username.charAt(0).toUpperCase() : 'Guest'}
                        </Text>
                    </div>
                </div>
            </div>
        </nav>
    )
}