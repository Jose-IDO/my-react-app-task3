import React from 'react'
import { ContactUsForm } from '../components/ContactUs/ContactUsForm'

export const ContactUs = () => {
    const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        // Handle form submission here
        alert('Thank you for your message! We will get back to you soon.')
    }
    
    return (
        <div style={{ marginTop: '120px' }}>
            <ContactUsForm handleSubmit={handleSubmit} />
        </div>
    )
}
