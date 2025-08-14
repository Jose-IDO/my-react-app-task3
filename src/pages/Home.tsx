import React, { useEffect, useRef, useState } from 'react'
// import { StockContainer } from '../components/Stock/StockContainer'
// import { Search } from '../components/Search/Search'
// import type { Product } from '../App'
import { Navbar } from '../components/Navbar/Navbar'

type HomeProps = {
    showLoginForm: () => void,
    showRegisterForm: () => void
}
export const Home: React.FC<HomeProps> = ({ showLoginForm,showRegisterForm }) => {
    return (

    <Navbar showLoginForm={showLoginForm} showRegisterForm={showRegisterForm}/>

    

    )
}
