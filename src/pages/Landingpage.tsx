import React from 'react'
import { Whitebox } from '../components/Whitebox/Whitebox'
import styles from '../components/Page styling/home.module.css'
import { Text } from '../components/Text/Text'
import { Buttons } from '../components/button/Button'
import { Navigate } from 'react-router-dom'

type LandingPageProps = {
    showLoginForm: () => void,
    showRegisterForm: () => void,
    isAuthenticated: boolean
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
    showLoginForm, 
    showRegisterForm, 
    isAuthenticated 
}) => {
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div style={{ marginTop: '120px' }}> 
                <Whitebox modcolor='modcolorone'>
                    <div>
                        <h1 className={styles.h1}>WELCOME TO JOBSEEK!</h1> 
                        <h1 className={styles.h1}>SOUTH AFRICA'S PREMIERE, ALL INCLUSIVE SOLUTION</h1> 
                        <h1 className={styles.h1}>TO YOUR JOB APPLICATION MANAGEMENT NEEDS!</h1> 
                        <p className={styles.p}> 
                            Jobseek is a platform designed to streamline the job application process for job seekers. 
                            Our goal is to make job searching and tracking as efficient and effective as possible.
                        </p>
                        <p className={styles.p}>
                            Track your applications, manage your job search, and stay organized with our comprehensive 
                            job application tracker. Monitor which applications are pending, which companies have 
                            interviewed you, and keep track of rejections to improve your approach.
                        </p>
                    </div>

                    <div className={styles['interactive-elements']}>
                        <div className={styles.hometextbox}>
                            <Text variant={'h2'} style={{ marginBottom: '15px', fontSize: '20px' }}>First time here? Register below</Text>
                            <Buttons onClick={showRegisterForm}>Register</Buttons>
                        </div>

                        <div className={styles.hometextbox}>
                            <Text variant={'h2'} style={{ marginBottom: '15px', fontSize: '20px' }}>Have an account? Login below</Text>
                            <Buttons onClick={showLoginForm}>Login</Buttons>
                        </div>
                    </div>
                </Whitebox>
        </div>
    )
}