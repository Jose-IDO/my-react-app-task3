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
      <Text variant={'span'} style={{ color: 'rgb(20, 20, 20)', padding