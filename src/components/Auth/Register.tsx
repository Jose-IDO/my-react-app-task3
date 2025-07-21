import React, { useRef } from 'react'
import styles from './Auth.module.css'
import { Overlay } from '../Overlay/Overlay'
import { Text } from '../Text/Text'
import { TextInput } from '../Inputs/TextInput'
import { Button } from '../Inputs/Button'

type RegisterOverlayProps = {
    close: () => void,
    isVisible: boolean
}
export const Register: React.FC<RegisterOverlayProps> = ({ close, isVisible }) => {
    // use ref hook, replaces document.getElementById()
    const nameRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(nameRef.current?.value);
        // continued logic ...
    }
    if(!isVisible) return null
    return (
        <Overlay close={close}>
            <form className={styles['auth-container']}>
                <Text variant={'h2'} style={{ color: 'rgb(20, 20, 20)' }}>Register</Text>
                <TextInput ref={nameRef} label='Name' name="firstName" onChange={(ev) => { }} />
                <TextInput label='Surname' name="surname" onChange={(ev) => { }} />
                <TextInput label='Phone Number' name="phoneNumber" onChange={(ev) => { }} />

                <TextInput label='Email Address' name="emailAddress" onChange={(ev) => { }} />
                <TextInput label='Password' name="password" onChange={(ev) => { }} />
                <TextInput label='Password' name="confirmpassword" onChange={(ev) => { }} />

                <Button value={'Register'} style={{ marginTop: 20 }} type='submit' onClick={handleSubmit}/>
                <Text variant={'span'} style={{ fontSize: 14, textAlign: 'center', color: 'rgb(20, 20, 20)' }}>
                    By signing up, you accept our <Text variant={'span'} style={{ color: 'rgb(10, 130, 150)' }}>Terms and conditions</Text>
                </Text>
            </form>
        </Overlay>
    )
}
