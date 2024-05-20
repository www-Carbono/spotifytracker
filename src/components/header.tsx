import React from 'react'
import Image from 'next/image'
export const Header = (): JSX.Element => {
  return (
    <section className='bg-gray-900 text-white py-1 md:py-5 lg:py-12 xl:py-20 flex justify-center'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                Unlock Your Spotify Data
              </h1>
              <p className='max-w-[600px] text-gray-300 md:text-xl dark:text-gray-400'>
                Gain deeper insights into your Spotify listening habits with our
                powerful data tracking and visualization tools.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <a
                className='inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50'
                href='/register'
              >
                Comenzar
              </a>
              <a
                className='inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-300 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 '
                href='#howTo'
              >
                Aprender Más
              </a>
            </div>
          </div>
          <Image
            alt='Hero'
            className='mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square'
            height={550}
            src={'https://placehold.jp/550x550.png'}
            width={550}
          />
        </div>
      </div>
    </section>
  )
}
