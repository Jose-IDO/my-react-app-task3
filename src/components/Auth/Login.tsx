import React, { useEffect, useState } from 'react'
import styles from './Auth.module.css'
import { Overlay } from '../Overlay/Overlay'
import { TextInput } from '../Inputs/TextInput'
import { Button } from '../Inputs/Button'
import { Text } from '../Text/Text'

type LoginProps = {
    close: () => void,
    isVisible: boolean
}
// container component, it fetches data, sends data, managages state, as well as sending it to representation components
export const Login: React.FC<LoginProps> = ({ close, isVisible }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = () => {
        console.log({ email, password });
        if(email.trim() && password.trim()) {
            // continue with login
        } else {
            // issue out errors and such
        }
    }
    if (!isVisible) return null
    return (
        <Overlay close={close}>
            <div className={styles['auth-container']}>
                {/* components, representational components: look and feel of the app. They control no state, all data is passed as props */}
                <Text variant={'h2'} style={{ color: 'rgb(20, 20, 20)' }}>Login</Text> 
                <TextInput label="Email" onChange={(ev) => { setEmail(ev.target.value)}} />
                <TextInput label="Password" onChange={(ev) => { setPassword(ev.target.value) }} />
                <Button value={'Login'} style={{ marginTop: 20 }} onClick={handleSubmit}/>
            </div>
        </Overlay>
    )
}
