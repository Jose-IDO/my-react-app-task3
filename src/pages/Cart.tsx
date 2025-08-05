import React, { useRef, useState } from 'react'
import { Search } from '../components/Search/Search'
import { StockContainer } from '../components/Stock/StockContainer'

export const Cart = ({  }) => {
    return (
        <>
            <Search/>
            <StockContainer addToCart={() => {}} />
        </>
    )
}
