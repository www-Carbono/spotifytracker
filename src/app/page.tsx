'use client'
import React, { useEffect } from 'react'
import { SearchSong } from './components/SearchSong'
import saveToDatabase from './server/services/saveToDatabase'

const Home = (): JSX.Element => {
  useEffect(() => {
    saveToDatabase()
  }, [])
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SearchSong />
    </main>
  )
}

export default Home
