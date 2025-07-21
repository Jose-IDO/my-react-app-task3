import React from 'react'

import styles from './Overlay.module.css'
import CloseIcon from '../../assets/close.png'
type OverlayProps = {
    children: React.ReactNode,
    close: () => void
}
export const Overlay: React.FC<OverlayProps> = ({ children, close }) => {
    const stopProgation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    return (
        <div className={styles['overlay']} onClick={close}>
            <div className={styles['overlay-child']} onClick={stopProgation}>
                <img className={styles['close-icon']} src={CloseIcon} onClick={close}/>
                {children}
            </div>
        </div>
    )
}
