import React from 'react'
import { ContentContainer } from '../ContentContainer'
import { ItemCard, type ItemCardProps } from './ItemCard'
import styles from './Stock.module.css'
import type { Product } from '../../App'
type StockProps = {
    stock?: Product[],
    addToCart: (id: number) => void
}
export const StockContainer: React.FC<StockProps> = ({ stock, addToCart }) => {
    return (
        <ContentContainer>
            <div id={styles['item-container']}>
                {
                    stock && stock.length > 0 && stock.map(product => {
                        return <ItemCard
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            imgLink={product.imgLink}
                            id={product.id}
                            addToCart={addToCart}
                        />
                    })
                }
            </div>

        </ContentContainer>
    )
}
