import React from 'react'
import styles from './Search.module.css'
import { Text } from '../Text/Text'
import searchIcon from '../../assets/search.png'

export type SearchbarProps = {
  ref: React.RefObject<HTMLInputElement | null>,
  onSearch: React.MouseEventHandler<HTMLImageElement>
}
export const Searchbar: React.FC<SearchbarProps> = ({ ref, onSearch}) => {
  return (
    <div className={styles['search-bar']}>
        <Text variant={'span'} style={{ color: 'rgb(20, 20, 20)', padding: 10 }}>Search</Text>
        <input ref={ref} type='text' className={styles['search-input']} />
        <img src={searchIcon} alt='search icon on search bar' className={styles['search-icon']} onClick={onSearch}/>
    </div>
  )
}
