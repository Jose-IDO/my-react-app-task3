import React from 'react'
import { Text } from '../Text/Text'
import styles from './NotFound.module.css'
import { Whitebox } from '../Whitebox/Whitebox'
import { Buttons } from '../button/Button'
import { useNavigate } from 'react-router-dom' 

export const NotFoundComponent = () => {
  const navigate = useNavigate(); 

  return (
    <div style={{ paddingTop: '120px' }}> 
      <Whitebox modcolor='modcolorone'>
        <div className={styles['not-found-cont']}>
          <Text variant={'h1'}>Page not found</Text>
          <Text variant={'h2'}>Let's go home!</Text>
          


        </div>
                  <Buttons onClick={() => navigate('/')}>
            Home
          </Buttons>
      </Whitebox>
    </div>
  )
}