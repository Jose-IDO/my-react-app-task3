import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Search.module.css'
import { Text } from '../Text/Text'

export const Searchbar: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/dashboard')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={styles['search-bar']}>
      <Text variant={'span'} style={{ color: 'rgb(20, 20, 20)', padding: '0 10px' }}>
        Search:
      </Text>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search by company or role..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        className={styles['search-icon']} 
        onClick={handleSearch}
        type="button"
      >
        Search
      </button>
    </div>
  )
}