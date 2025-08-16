import React from 'react'
import styles from './Button.module.css' 

type ButtonProps = {
  children: string;
  // bgColor: string;
  onClick?: () => void
 

}

export const Buttons: React.FC<ButtonProps> = ({children, onClick }) => {
  return (
    <button className={styles.button} onClick = {onClick}>
      {children}
   
    </button>
  )
}
