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
    type?: string
}
export const TextInput: React.FC<TextInputProps> = ({ label, style, value, name, onChange, id, error, ref, type }) => {
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
                        type={type || 'text'} 
                        name={name} 
                        value={value} 
                        onChange={onChange} 
                        className={styles.input} 
                    />
                )
            }
            {error && <span className={styles['input-error']}>{error}</span>}
        </div>

    )
}