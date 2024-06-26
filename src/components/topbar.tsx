'use client'
import React, { useEffect, useState } from 'react'
import { logout } from '@/server/services/isUserLogged'
import { useIsLogged } from '@/hooks/useIsLogged'
import Link from 'next/link'
import Image from 'next/image'

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
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
    if (userData === undefined) {
      setLoaded(false)
    } else {
      setLoaded(true)
    }
  }, [userData])

  useEffect(() => {
    isOnMainpage()
  }, [])

  return (
    <nav>
      {loaded && (
        <div className='bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center justify-between'>
          <Link
            className='flex items-center justify-center'
            href='/'
            onClick={() => {
              setHidden(false)
              setValueSelected(values.home)
            }}
          >
            <Image
              src={'/favicon.svg'}
              alt='Favicon'
              width={30}
              height={30}
            />
            <span className='text-lg font-bold ml-2'>Spoti Tracker</span>
          </Link>
          <div className='ml-auto flex lg:hidden'>
            <button
              className='text-white'
              onClick={() => {
                setMenuOpen(!menuOpen)
              }}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`gap-4 sm:gap-6 ${
              menuOpen
                ? 'absolute top-14 left-0 w-full bg-gray-900 p-4 z-10'
                : 'hidden'
            }`}
          >
            <Link
              className={`block text-sm font-medium hover:underline underline-offset-4 ${
                hidden ? 'hidden' : ''
              }`}
              href='#features'
              onClick={() => {
                setValueSelected(values.home)
                setMenuOpen(false)
              }}
            >
              Caracteristicas
            </Link>
            <Link
              className={`block text-sm font-medium hover:underline underline-offset-4 ${
                hidden ? 'hidden' : ''
              }`}
              href='#faq'
              onClick={() => {
                setValueSelected(values.home)
                setMenuOpen(false)
              }}
            >
              Preguntas Frecuentes
            </Link>
            <Link
              className={`block text-sm font-medium hover:underline underline-offset-4 ${
                userData === undefined || userData === null ? '' : 'hidden'
              }`}
              href='/login'
              onClick={() => {
                setValueSelected(values.login)
                setMenuOpen(false)
              }}
            >
              Iniciar Sesion
            </Link>
            <Link
              className={`block text-sm font-medium hover:underline underline-offset-4 ${
                userData === undefined || userData === null ? '' : 'hidden'
              }`}
              href='/register'
              onClick={() => {
                setValueSelected(values.register)
                setMenuOpen(false)
              }}
            >
              Registrarse
            </Link>
            <Link
              className={`block text-sm font-medium hover:underline underline-offset-4 ${
                userData === undefined || userData === null ? 'hidden' : ''
              }`}
              href='/dashboard'
              onClick={() => {
                setValueSelected(values.dashboard)
                setMenuOpen(false)
              }}
            >
              Dashboard
            </Link>
            <Link
              className={`block text-sm font-medium hover:underline underline-offset-4 ${
                userData === undefined || userData === null ? 'hidden' : ''
              }`}
              href='#'
              onClick={() => {
                setValueSelected(values.home)
                setMenuOpen(false)
              }}
            >
              <button onClick={logoutUser}>Desconectar</button>
            </Link>
            <a
              className='block text-sm font-medium hover:underline underline-offset-4'
              href='https://x.com/SpotiTracker'
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
          </div>
          <div className='hidden lg:flex ml-auto gap-4 sm:gap-6'>
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
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                userData === undefined || userData === null ? '' : 'hidden'
              }`}
              href='/login'
              onClick={() => {
                setValueSelected(values.login)
              }}
            >
              Iniciar Sesion
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
              Registrarse
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
              href='https://x.com/SpotiTracker'
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
          </div>
        </div>
      )}
    </nav>
  )
}
