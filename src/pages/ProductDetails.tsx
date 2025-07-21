import React, { useEffect, useRef, useState } from 'react'
import { StockContainer } from '../components/Stock/StockContainer'
import { Search } from '../components/Search/Search'
import type { Product } from '../App'
import { useNavigate, useParams } from 'react-router'
import { Text } from '../components/Text/Text'

type ProductDetailsProps = {
    stock: Product[],
    addToCart: (id: number) => void
}
export const ProductDetails: React.FC<ProductDetailsProps> = ({ stock, addToCart }) => {
    const searchRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const params = useParams()
    const handleSearch = () => {
        console.log(searchRef.current?.value);
        navigate(`/products?search=${searchRef.current?.value}`)  
    }
    useEffect(() => {
        console.log({ params });
        console.log(params.id);
        // logic to fetch data assigned to the resource. Meeting id, user id, product id
    }, [params])
    return (
        <>
            <Search ref={searchRef} onSearch={handleSearch}/>
            <Text>Product Details</Text>
            <StockContainer stock={stock} addToCart={addToCart} />
        </>

    )
}
