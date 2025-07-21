import React from 'react'
import { ContentContainer } from '../ContentContainer'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer>
        <ContentContainer className={styles['footer-cont']}>
            footer
        </ContentContainer>
    </footer>
  )
}
