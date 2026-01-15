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
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'tel' || name?.toLowerCase().includes('phone')) {
            const phoneValue = e.target.value.replace(/[^0-9+\-\s()]/g, '')
            const syntheticEvent = {
                ...e,
                target: { ...e.target, value: phoneValue }
            } as React.ChangeEvent<HTMLInputElement>
            onChange(syntheticEvent)
        } else {
            onChange(e)
        }
    }

    const getInputType = () => {
        if (type) return type
        if (name?.toLowerCase().includes('phone')) return 'tel'
        if (name?.toLowerCase().includes('email')) return 'email'
        return 'text'
    }

    const getInputMode = () => {
        if (inputMode) return inputMode
        if (name?.toLowerCase().includes('phone')) return 'tel'
        if (name?.toLowerCase().includes('email')) return 'email'
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
                        onChange={handlePhoneChange} 
                        className={styles.input} 
                    />
                )
            }
            {error && <span className={styles['input-error']}>{error}</span>}
        </div>

    )
}