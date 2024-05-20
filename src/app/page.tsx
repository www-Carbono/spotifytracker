'use client'
import React from 'react'
import { Header } from '@/components/header'
import { Features } from '@/components/features'
import { GraphicsFeatures } from '@/components/graphicFeatures'
import { Faqs } from '@/components/faqs'
import { HowTo } from '@/components/howTo'

const Home = (): JSX.Element => {
  return (
    <div className={`flex flex-col min-h-[100dvh]`}>
      <main className='flex-1'>
        <Header />
        <Features />
        <GraphicsFeatures />
        <HowTo />
        <Faqs />
      </main>
    </div>
  )
}

export default Home
