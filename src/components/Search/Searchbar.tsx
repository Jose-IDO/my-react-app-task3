import React from 'react'
import styles from './Search.module.css'
import { Text } from '../Text/Text'
import searchIcon from '../../assets/search.png'

export const Searchbar = () => {
  return (
    <div className={styles['search-bar']}>
        <Text variant={'span'} style={{ color: 'rgb(20, 20, 20)', padding: 10 }}>Search</Text>
        <input type='text' className={styles['search-input']} />
        <img src={searchIcon} alt='search icon on search bar' className={styles['search-icon']}/>
    </div>
  )
}
