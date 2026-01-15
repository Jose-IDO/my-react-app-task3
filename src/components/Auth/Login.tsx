import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { Overlay } from '../Overlay/Overlay'
import { TextInput } from '../Inputs/TextInput'
import { Button } from '../Inputs/Button'
import { Text } from '../Text/Text'

type LoginProps = {
    close: () => void,
    isVisible: boolean,
    onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>,
    isPage?: boolean
}

export const Login: React.FC<LoginProps> = ({ close, isVisible, onLogin, isPage = false }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setError('')
        
        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        const result = await onLogin(email, password)
        if (!result.success) {
            setError(result.error || 'Login failed')
        }
    }

    const handleClose = () => {
        if (isPage) {
            navigate('/')
        } else {
            close()
        }
    }

    if (!isVisible && !isPage) return null

    const content = (
        <div className={styles['auth-container']}>
            <button 
                type="button"
                className={styles['close-icon']} 
                onClick={handleClose}
                aria-label="Close"
            >
                ×
            </button>
            <Text variant={'h2'} style={{ color: 'rgb(20, 20, 20)', fontSize: '24px', fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>Login</Text> 
            
            {error && (
                <Text variant={'span'} style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>
                    {error}
                </Text>
            )}
            
            <TextInput 
                label="Email" 
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
            
            <TextInput 
                label="Password" 
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)} 
            />
            
            <Button 
                value="Login" 
                style={{ marginTop: 20 }} 
                onClick={handleSubmit}
            />
        </div>
    )

    if (isPage) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {content}
            </div>
        )
    }

    return (
        <Overlay close={close}>
            {content}
        </Overlay>
    )
}