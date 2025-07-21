import React, { useEffect, useRef, useState } from 'react'
import { StockContainer } from '../components/Stock/StockContainer'
import { Search } from '../components/Search/Search'
import type { Product } from '../App'
import { useNavigate, useSearchParams } from 'react-router'

type ProductsProps = {
    stock: Product[],
    addToCart: (id: number) => void
}
export const Products: React.FC<ProductsProps> = ({ stock, addToCart }) => {
    const searchRef = useRef<HTMLInputElement>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const handleSearch = () => {
        console.log(searchRef.current?.value);
        navigate(`/products?search=${searchRef.current?.value}`)
    }
    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        console.log(params.search);
        // fetch your products accordingly, from whatever database you are using
        
    }, [searchParams])
    return (
        <>
            <Search ref={searchRef} onSearch={handleSearch} />
            <StockContainer stock={stock} addToCart={addToCart} />
        </>

    )
}
