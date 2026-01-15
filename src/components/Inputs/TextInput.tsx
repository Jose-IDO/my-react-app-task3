import React from 'react'
import styles from './Input.module.css'

export type TextInputProps = {
    id?: string,
    value?: string | number,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    style?: React.CSSProperties,
    label: string,
    error?: string,
    name?: string,
    ref?: React.Ref<HTMLInputElement | null>,
    type?: string,
    inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal' | 'search' | 'url'
}

export const TextInput: React.FC<TextInputProps> = ({ label, style, value, name, onChange, id, error, ref, type, inputMode }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let processedValue = e.target.value
        
        // Phone number validation - only numbers, +, -, spaces, parentheses
        if (type === 'tel' || name?.toLowerCase().includes('phone')) {
            processedValue = processedValue.replace(/[^0-9+\-\s()]/g, '')
        }
        // Numeric input - only numbers (for inputMode numeric)
        else if (inputMode === 'numeric' || type === 'number') {
            processedValue = processedValue.replace(/[^0-9]/g, '')
        }
        // Decimal input - numbers and decimal point
        else if (inputMode === 'decimal') {
            processedValue = processedValue.replace(/[^0-9.]/g, '')
            // Ensure only one decimal point
            const parts = processedValue.split('.')
            if (parts.length > 2) {
                processedValue = parts[0] + '.' + parts.slice(1).join('')
            }
        }
        // Email validation - basic character filtering
        else if (type === 'email' || name?.toLowerCase().includes('email')) {
            // Allow email-valid characters
            processedValue = processedValue.replace(/[^a-zA-Z0-9@._+-]/g, '')
        }
        // Text fields - allow letters, numbers, spaces, and common punctuation
        else if (type === 'text' || !type) {
            // Allow letters, numbers, spaces, and common punctuation for names/text
            if (name?.toLowerCase().includes('name') || name?.toLowerCase().includes('username')) {
                // For names, allow letters, spaces, hyphens, apostrophes
                processedValue = processedValue.replace(/[^a-zA-Z\s'-]/g, '')
            }
        }
        
        // Create synthetic event with processed value
        const syntheticEvent = {
            ...e,
            target: { ...e.target, value: processedValue }
        } as React.ChangeEvent<HTMLInputElement>
        
        onChange(syntheticEvent)
    }

    const getInputType = () => {
        if (type) return type
        if (name?.toLowerCase().includes('phone')) return 'tel'
        if (name?.toLowerCase().includes('email')) return 'email'
        if (name?.toLowerCase().includes('number') && !name?.toLowerCase().includes('phone')) return 'number'
        return 'text'
    }

    const getInputMode = () => {
        if (inputMode) return inputMode
        if (name?.toLowerCase().includes('phone')) return 'tel'
        if (name?.toLowerCase().includes('email')) return 'email'
        if (name?.toLowerCase().includes('number') && !name?.toLowerCase().includes('phone')) return 'numeric'
        return undefined
    }

    return (
        <div className={styles['input-container']}>
            <label className={styles['input-label']}>{label}</label>
            {
                type === 'textarea' ? (
                    <textarea 
                        style={style} 
                        id={id} 
                        name={name} 
                        value={value} 
                        onChange={onChange} 
                        className={styles.input}
                        rows={4}
                    />
                ) : (
                    <input 
                        ref={ref} 
                        style={style} 
                        id={id} 
                        type={getInputType()} 
                        inputMode={getInputMode()}
                        name={name} 
                        value={value} 
                        onChange={handleInputChange} 
                        className={styles.input}
                        pattern={type === 'email' ? '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' : undefined}
                    />
                )
            }
            {error && <span className={styles['input-error']}>{error}</span>}
        </div>

    )
}