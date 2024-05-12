'use client'
import React from 'react'
import { Libre_Franklin } from 'next/font/google'
import Image from 'next/image'
const pageFont = Libre_Franklin({ subsets: ['latin'], display: 'swap' })

const Home = (): JSX.Element => {
  return (
    <main className={`min-h-screen p-24 ${pageFont.className} bg-gray-950`}>
      <div className='header flex justify-center items items-center text-gray-50 gap-10'>
        <div>
          <h1 className='text-5xl font-extrabold'>
            Unlock the Power of the Web
          </h1>
          <h2 className='text-gray-400'>
            Unleash your creativity and build stunning web experiences with our
            comprehensive platform.
          </h2>
          <button className='text-gray-400'>Get Started</button>
          <button className='text-gray-400'>Learn More</button>
        </div>
        <div className='border rounded-md'>
          <Image
            src='https://picsum.photos/600/400'
            width={600}
            height={400}
            alt='placeholderimage'
          ></Image>
        </div>
      </div>
    </main>
  )
}

export default Home
