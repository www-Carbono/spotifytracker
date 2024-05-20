'use client'
import React, { useEffect, useState } from 'react'
import { logout } from '@/server/services/isUserLogged'
import { useIsLogged } from '@/hooks/useIsLogged'
import Link from 'next/link'

export const TopBar = (): JSX.Element => {
  const values = {
    home: 'home',
    login: 'login',
    register: 'register',
    dashboard: 'dashboard'
  }
  const userData = useIsLogged()
  const [hidden, setHidden] = useState(false)
  const [valueSelected, setValueSelected] = useState<string>(values.home)

  const logoutUser = (): void => {
    logout()
      .then((data) => {
        console.log(data)
        window.location.href = '/'
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const isOnMainpage = (): boolean => {
    const pathNameLength = window.location.pathname.length
    console.log(pathNameLength)
    if (pathNameLength > 1) {
      setHidden(true)
      return false
    } else {
      setHidden(false)
      return true
    }
  }

  useEffect(() => {
    if (valueSelected === values.home) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [valueSelected])

  useEffect(() => {
    isOnMainpage()
  }, [])

  return (
    <nav className='bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center'>
      <Link
        className='flex items-center justify-center'
        href='/'
        onClick={() => {
          setHidden(false)
          setValueSelected(values.home)
        }}
      >
        <svg
          className='h-6 w-6'
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
          <path d='M16.85 18.58a9 9 0 1 0-9.7 0' />
          <path d='M8 14a5 5 0 1 1 8 0' />
          <circle
            cx='12'
            cy='11'
            r='1'
          />
          <path d='M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z' />
        </svg>
        <span className='text-lg font-bold ml-2'>Spotify Insights</span>
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            hidden ? 'hidden' : ''
          }`}
          href='#features'
          onClick={() => {
            setValueSelected(values.home)
          }}
        >
          Caracteristicas
        </Link>

        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            hidden ? 'hidden' : ''
          }`}
          href='#faq'
          onClick={() => {
            setValueSelected(values.home)
          }}
        >
          Preguntas Frecuentes
        </Link>
        <Link
          //             userData === undefined || userData === null
          //               ? 'flex hover:text-gray-50'
          //               : 'hidden'
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            userData === undefined || userData === null ? '' : 'hidden'
          }`}
          href='/login'
          onClick={() => {
            setValueSelected(values.login)
          }}
        >
          Login
        </Link>
        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            userData === undefined || userData === null ? '' : 'hidden'
          }`}
          href='/register'
          onClick={() => {
            setValueSelected(values.register)
          }}
        >
          Register
        </Link>
        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            userData === undefined || userData === null ? 'hidden' : ''
          }`}
          href='/dashboard'
          onClick={() => {
            setValueSelected(values.dashboard)
          }}
        >
          Dashboard
        </Link>
        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            userData === undefined || userData === null ? 'hidden' : ''
          }`}
          href='#'
          onClick={() => {
            setValueSelected(values.home)
          }}
        >
          <button onClick={logoutUser}>Desconectar</button>
        </Link>
        <a
          className='text-sm font-medium hover:underline underline-offset-4'
          href='http://twitter.com'
          target='_blank'
          rel='noreferrer'
        >
          <svg
            className='h-6 w-6'
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
    </nav>
  )
}
