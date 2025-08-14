import React from 'react'
import styles from './Navbar.module.css'
import ShoppingIcon from '../../assets/shopping-cart.png'
import { Text } from '../Text/Text'
import { NavLink } from 'react-router'

type NavbarProps = {
    showLoginForm: () => void,
    showRegisterForm: () => void
}
export const Navbar: React.FC<NavbarProps> = ({ showLoginForm, showRegisterForm}) => {
    return (
        <nav>
            <div className={styles.content}>
                <Text variant={'h2'} style={{ margin: 0, padding: 0 }}>CT Shop</Text>
                <div className={styles.links}>

                    <NavLink to="/" className={styles.link}>Home</NavLink>
                    <NavLink to="/contact-us" className={styles.link}>Contact Us</NavLink>
                    {/* <NavLink to="/Landing-Page" className={styles.link}>Landing Page</NavLink> */}
                    <NavLink to="/Login" className={styles.link}>Login</NavLink>
                    <NavLink to="/Register" className={styles.link}>Register</NavLink>
                    <span className={styles.link} onClick={showLoginForm}>Login</span>
                    <span className={styles.link} onClick={showRegisterForm}>Register</span>
                    <img
                        src={ShoppingIcon}
                        className={styles['shopping-cart-icon']}
                        alt='Image of a shopping cart, navigating to shopping cart page'
                    />
                    <div className={styles['profile-icon']}>
                        <Text variant={'span'}>U</Text>
                    </div>
                </div>
            </div>
        </nav>
    )
}
