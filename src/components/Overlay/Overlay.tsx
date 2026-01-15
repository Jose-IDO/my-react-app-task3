import React from 'react'
import styles from './Overlay.module.css'

type OverlayProps = {
    children: React.ReactNode,
    close: () => void
}
export const Overlay: React.FC<OverlayProps> = ({ children, close }) => {
    const stopProgation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        close()
    }
    
    return (
        <div className={styles['overlay']} onClick={close}>
            <div className={styles['overlay-child']} onClick={stopProgation}>
                <button 
                    type="button"
                    className={styles['close-icon']} 
                    onClick={handleCloseClick}
                    aria-label="Close"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}