import React, { useState } from 'react'
import styles from './Auth.module.css'
import { Overlay } from '../Overlay/Overlay'
import { Text } from '../Text/Text'
import { TextInput } from '../Inputs/TextInput'
import { Button } from '../Inputs/Button'

type RegisterProps = {
    close: () => void,
    isVisible: boolean,
    onRegister: (userData: any) => Promise<{ success: boolean; error?: string }>
}

export const Register: React.FC<RegisterProps> = ({ close, isVisible, onRegister }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        setError('')

        if (!username || !email || !password) {
            setError('Please fill in all required fields')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email')
            return
        }

        const userData = {
            username,
            email,
            password,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            phoneNumber: phoneNumber || undefined
        }

        const result = await onRegister(userData)
        if (!result.success) {
            setError(result.error || 'Registration failed')
        }
    }

    if (!isVisible) return null

    return (
        <Overlay close={close}>
            <div className={styles['auth-container']}>
                <Text variant={'h2'} style={{ color: 'rgb(20, 20, 20)', fontSize: '24px', fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>Register</Text>
                
                {error && (
                    <Text variant={'span'} style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>
                        {error}
                    </Text>
                )}
                
                <TextInput 
                    label='Username *' 
                    name="username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
                
                <TextInput 
                    label='Email *' 
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                
                <TextInput 
                    label='Password *' 
                    type="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                
                <TextInput 
                    label='Confirm Password *' 
                    type="password"
                    value={confirmPassword}
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                />
                
                <TextInput 
                    label='First Name' 
                    name="firstName"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                />
                
                <TextInput 
                    label='Last Name' 
                    name="lastName"
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                />
                
                <TextInput 
                    label='Phone Number' 
                    type="tel"
                    value={phoneNumber}
                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                />

                <Button 
                    value="Register" 
                    style={{ marginTop: 20 }} 
                    onClick={handleSubmit}
                />
            </div>
        </Overlay>
    )
}