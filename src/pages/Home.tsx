import React, { useEffect, useRef, useState } from 'react'
import { StockContainer } from '../components/Stock/StockContainer'
import { Search } from '../components/Search/Search'
import type { Product } from '../App'
import { useNavigate, useSearchParams } from 'react-router'

type HomeProps = {
    stock: Product[],
    addToCart: (id: number) => void,
    showLogin: () => void
}
export const Home: React.FC<HomeProps> = ({ stock, addToCart, showLogin }) => {
    const searchRef = useRef<HTMLInputElement>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = Object.fromEntries(searchParams)
    // console.log({ query });
    const checkRedirect = () => {
        if(query.redirectTo === '/profile') {
            showLogin()
        }
    }
    // useEffect(() => {
        checkRedirect()
    // }, [query])
    const handleSearch = () => {
        console.log(searchRef.current?.value);
        navigate(`/products?search=${searchRef.current?.value}`)  
    }
    return (
        <>
            <Search ref={searchRef} onSearch={handleSearch}/>
            <StockContainer stock={stock} addToCart={addToCart}/>
        </>

    )
}
