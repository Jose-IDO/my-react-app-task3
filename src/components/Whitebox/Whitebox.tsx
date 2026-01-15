import React from 'react'
import styles from './Whitebox.module.css'


type Whiteboxprops = {
  children: React.ReactNode;
  modcolor: string;
}

export const Whitebox: React.FC<Whiteboxprops> = ({ children, modcolor }) => {
  return (
    <div className={styles[modcolor]}>
      {children}
    </div>
  )
}
