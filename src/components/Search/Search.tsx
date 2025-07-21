import React from 'react'
import { ContentContainer } from '../ContentContainer'
import styles from './Search.module.css'
import { Searchbar, type SearchbarProps } from './Searchbar'

export const Search: React.FC<SearchbarProps> = ({ ref, onSearch}) => {
  return (
    <div className={styles['search-container']}>
        <ContentContainer className={styles['searchbar-container']}>
            <Searchbar ref={ref} onSearch={onSearch}/>
        </ContentContainer>
    </div>
  )
}
