import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import {Whitebox} from '../components/Whitebox/Whitebox'
import styles from '../components/Page styling/home.module.css'
import { Text } from '../components/Text/Text'
import { Buttons } from '../components/button/Button'


type HomeProps = {
    showLoginForm: () => void,
    showRegisterForm: () => void
}

export const Home: React.FC<HomeProps> = ({ showLoginForm, showRegisterForm }) => {
    return (
        <>
            <Navbar showLoginForm={showLoginForm} showRegisterForm={showRegisterForm}/>
            
            <div style={{ marginTop: '120px' }}> 
                <Whitebox modcolor='modcolorone'>
                    <div>
                        <h1 className = {styles.h1}>WELCOME TO JOBSEEK!</h1> 
                        <h1 className = {styles.h1}> SOUTH AFRICA'S PREMIERE, ALL INLCUSIVE SOLUTION </h1> 
                        <h1 className = {styles.h1}>TO YOUR JOB APPLICATION MANAGEMENT NEEDS!</h1> 
                        <p className = {styles.p}> 
                            Jobseek is a platform designed to streamline the job application process for both job seekers. 
                            Our goal is to make job searching and tracking as efficient and effective as possible.
                        </p>
                    </div>


                    <div className = {styles['interactive-elements']}>



                        <div className = {styles.hometextbox}>

                        <Text variant={'h1'}>first time here? Register below</Text>
                        <Buttons onClick={showRegisterForm}> Register  </Buttons>
                            

                        </div>

                        

                        <div className = {styles.hometextbox}>

                        <Text variant={'h1'}>Have an account? Login below</Text>
                        <Buttons onClick={showLoginForm} > Login </Buttons>

                            
                        </div>


                    </div>
                </Whitebox>
            </div>
        </>
        )
}