'use client'
import React from 'react'
import { SearchSong } from './../components/SearchSong'

const Home = (): JSX.Element => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SearchSong />
    </main>
  )
}

export default Home
