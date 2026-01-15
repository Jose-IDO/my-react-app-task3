import React, { useState } from 'react'
import { Text } from '../Text/Text'
import { TextInput } from '../Inputs/TextInput'
import { Button } from '../Inputs/Button'
import { Whitebox } from '../Whitebox/Whitebox'
import styles from './ContactUsForm.module.css'

type Props = {
    handleSubmit: React.MouseEventHandler<HTMLInputElement>
}

export const ContactUsForm: React.FC<Props> = ({ handleSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        phoneNumber: '',
        emailAddress: '',
        message: ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <Whitebox modcolor="modcolorone">
            <form className={styles['contact-us']} onSubmit={(e) => e.preventDefault()}>
                <Text variant={'h2'} style={{ color: 'rgb(20, 20, 20)', marginBottom: '10px', textAlign: 'center' }}>
                    Have a query to report or question to ask?
                </Text>
                <Text variant={'h1'} style={{ color: 'rgb(20, 20, 20)', marginBottom: '30px', textAlign: 'center', fontSize: '24px' }}>
                    Send us an email
                </Text>
                
                <TextInput 
                    label='Name' 
                    name="firstName" 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)} 
                />
                
                <TextInput 
                    label='Surname' 
                    name="surname" 
                    type="text" 
                    value={formData.surname}
                    onChange={(e) => handleInputChange('surname', e.target.value)} 
                />
                
                <TextInput 
                    label='Phone Number' 
                    name="phoneNumber" 
                    type="tel" 
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)} 
                />
                
                <TextInput 
                    label='Email Address' 
                    name="emailAddress" 
                    type="email" 
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)} 
                />
                
                <TextInput 
                    label='Message' 
                    type='textarea' 
                    name="message" 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)} 
                />
                
                <Button 
                    value={'Send Email'} 
                    style={{ marginTop: 20 }} 
                    type='submit' 
                    onClick={handleSubmit} 
                />
            </form>
        </Whitebox>
    )
}
