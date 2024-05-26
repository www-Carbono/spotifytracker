'use client'
import React, { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Features } from '@/components/features'
import { GraphicsFeatures } from '@/components/graphicFeatures'
import { Faqs } from '@/components/faqs'
import { HowTo } from '@/components/howTo'
import { Loader } from '@/components/Loader'

const Home = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  return (
    <div className={`flex flex-col min-h-[100dvh]`}>
      {isLoaded ? (
        <main className='flex-1'>
          <Header />
          <Features />
          <GraphicsFeatures />
          <HowTo />
          <Faqs />
        </main>
      ) : (
        <div className='loaderMainPage flex justify-center items-center'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Home
