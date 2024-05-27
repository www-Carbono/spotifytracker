import React from 'react'
const Footer = (): JSX.Element => {
  return (
    <footer className='bg-gray-900 text-white flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
      <p className='text-xs text-gray-400'>
        © 2024 Spoti Tracker. All rights reserved.
      </p>
      <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
        <a
          className='text-xs hover:underline underline-offset-4 text-gray-400'
          href='#'
        >
          Terms of Service
        </a>
        <a
          className='text-xs hover:underline underline-offset-4 text-gray-400'
          href='#'
        >
          Privacy Policy
        </a>
        <a
          className='text-xs hover:underline underline-offset-4 text-gray-400'
          href='#'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            height='24'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
          </svg>
        </a>
      </nav>
    </footer>
  )
}

export default Footer
