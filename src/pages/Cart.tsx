import React, { useRef, useState } from 'react'
import { Search } from '../components/Search/Search'
import { StockContainer } from '../components/Stock/StockContainer'
import type { Product } from '../App'

type CartProps = {
    // cart: Product[],
    // removeFromCart: (id: number) => void
}

export const Cart: React.FC<CartProps> = ({  }) => {
    const searchRef = useRef<HTMLInputElement>(null)
    const handleSearch = () => {
        console.log(searchRef.current?.value);

    }
    return (
        <>
            <Search onSearch={handleSearch} ref={searchRef} />
            {/* <StockContainer stock={cart} removeFromCart={removeFromCart} /> */}
        </>
    )
}
