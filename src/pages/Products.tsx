import React, { useEffect, useRef, useState } from 'react'
import { StockContainer } from '../components/Stock/StockContainer'
import { Search } from '../components/Search/Search'
import type { Product } from '../App'

type ProductsProps = {
    stock: Product[],
    addToCart: (id: number) => void
}
export const Products: React.FC<ProductsProps> = ({ stock, addToCart }) => {
    return (
        <>
            <Search />
            <StockContainer stock={stock} addToCart={addToCart} />
        </>

    )
}
