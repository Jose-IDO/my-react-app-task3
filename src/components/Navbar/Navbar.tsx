import React from 'react'
import styles from './Navbar.module.css'
import { Text } from '../Text/Text'
import { NavLink } from 'react-router-dom'
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
    return (
        <nav>
            <div className={styles.content}>
                <div className={styles['logo-container']}> 
                    <Text variant={'h2'} style={{ margin: 0, padding: 0, fontSize: 40, color: 'white' }}>
                        Jobseek.com
                    </Text>
                </div>

                <Searchbar />

                <div className={styles['navbar-links']}> 
                    <NavLink to="/" className={styles.link}>Home</NavLink>
                    <NavLink to="/contact-us" className={styles.link}>Contact Us</NavLink>         
                    {currentUser ? (
                        <>
                            <NavLink to="/dashboard" className={styles.link}>Dashboard</NavLink>
                            <button 
                                className={styles.link}
                                onClick={onLogout}
                                style={{ background: 'none', border: 'none' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={styles.link}>Login</NavLink>
                            <NavLink to="/register" className={styles.link}>Register</NavLink>
                        </>
                    )}

                    <div className={styles['profile-icon']}>
                        <Text variant={'span'}>User</Text>
                    </div>
                </div>
            </div>
        </nav>
    )
}