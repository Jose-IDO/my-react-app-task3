import React from 'react'
import styles from './Input.module.css'

export const Button: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return (
    <input className={styles.button} type='button' {...rest} />
  )
}
