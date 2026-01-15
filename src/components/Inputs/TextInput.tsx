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
        
        if (type === 'tel' || name?.toLowerCase().includes('phone')) {
            processedValue = processedValue.replace(/[^0-9+\-\s()]/g, '')
        }
        else if (inputMode === 'numeric' || type === 'number') {
            processedValue = processedValue.replace(/[^0-9]/g, '')
        }
        else if (inputMode === 'decimal') {
            processedValue = processedValue.replace(/[^0-9.]/g, '')
            const parts = processedValue.split('.')
            if (parts.length > 2) {
                processedValue = parts[0] + '.' + parts.slice(1).join('')
            }
        }
        else if (type === 'email' || name?.toLowerCase().includes('email')) {
            processedValue = processedValue.replace(/[^a-zA-Z0-9@._+-]/g, '')
        }
        else if (type === 'text' || !type) {
            if (name?.toLowerCase().includes('name') || name?.toLowerCase().includes('username')) {
                processedValue = processedValue.replace(/[^a-zA-Z\s'-]/g, '')
            }
        }
        
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