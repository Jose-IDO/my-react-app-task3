import React, { useRef } from 'react'
import { NotFoundComponent } from '../components/NotFoundComponent/NotFoundComponent'
import { Search } from '../components/Search/Search'

export const NotFound = () => {
  return (
    <>
      <Search />
      <NotFoundComponent />
    </>

  )
}
