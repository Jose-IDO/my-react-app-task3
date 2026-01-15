import React from 'react'
import { Text } from '../Text/Text'
import { TextInput } from '../Inputs/TextInput'
import { Button } from '../Inputs/Button'
import styles from './ContactUsForm.module.css'

type Props = {
    handleSubmit: React.MouseEventHandler<HTMLInputElement>
}
export const ContactUsForm: React.FC<Props> = ({ handleSubmit }) => {
    return (
        <div className={styles.page}>
            <form className={styles['contact-us']}>
                <Text variant={'h2'} style={{ color: 'rgb(20, 20, 20)', margin: 0 }}>Have a query to report or question to ask?</Text>
                <Text variant={'h1'} style={{ color: 'rgb(20, 20, 20)', margin: 0 }}>Send us an email</Text>
                <TextInput label='Name' name="firstName" type="text" onChange={() => { }} />
                <TextInput label='Surname' name="surname" type="text" onChange={() => { }} />
                <TextInput label='Phone Number' name="phoneNumber" type="tel" onChange={() => { }} />
                <TextInput label='Email Address' name="emailAddress" type="email" onChange={() => { }} />
                <TextInput label='Message' type='textarea' name="message" onChange={() => { }} />
                <Button value={'Send Email'} style={{ marginTop: 20 }} type='submit' onClick={handleSubmit} />
            </form>
        </div>

    )
}
