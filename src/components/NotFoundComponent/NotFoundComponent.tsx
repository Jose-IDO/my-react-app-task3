import React from 'react'
import { Text } from '../Text/Text'
import styles from './NotFound.module.css'
export const NotFoundComponent = () => {
  return (
    <div className={styles['not-found-cont']}>
        <Text variant={'h1'}>Page not found</Text>
        <Text variant={'h2'}>Use the search bar to search for a product</Text>
    </div>
  )
}
