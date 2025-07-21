import React from 'react'

import styles from './Stock.module.css'
import { Text } from '../Text/Text'
import { Button } from '../Inputs/Button'

export type ItemCardProps = {
  name: string,
  description: string,
  imgLink: string,
  price: number,
  rating?: 0,
  id: number,
  addToCart: (id: number) => void
}
export const ItemCard: React.FC<ItemCardProps> = ({ name, imgLink, description, price, rating, addToCart, id }) => {
  return (
    <article className={styles['item-card']}>
      <img className={styles['item-image']} src={imgLink} alt={`image of product: ${description}`} />
      <Text variant={'span'} style={{ fontWeight: 600 }}>{name}</Text>
      <Text variant={'span'}>{description}</Text>
      <Text variant={'span'} style={{ fontWeight: 700 }}>R{price}</Text>
      <Text variant={'span'}>{rating}</Text>
      <Button value={'Add to Cart'} onClick={() => addToCart(id)} style={{ marginTop: 'auto'}}/>

    </article>
  )
}