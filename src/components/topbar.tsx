'use client'
import React from 'react'
import { logout } from '@/server/services/isUserLogged'
import { useIsLogged } from '@/hooks/useIsLogged'

export const TopBar = (): JSX.Element => {
  const userData = useIsLogged()

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
  return (
    <nav className={`border-b py-3 px-5 cursor-pointer bg-gray-950`}>
      <ul className='flex flex-row gap-10 items-center text-gray-400'>
        <li className='hover:text-gray-50'>Home</li>
        <li className='hover:text-gray-50'>Features</li>
        <li className='hover:text-gray-50'>Dashboard</li>
        <div className='ml-auto flex'>
          <li
            className={
              userData === undefined || userData === null
                ? 'flex hover:text-gray-50'
                : 'hidden'
            }
          >
            Login
          </li>
          <li
            className={
              userData === undefined || userData === null
                ? 'flex hover:text-gray-50'
                : 'hidden'
            }
          >
            Register
          </li>
          <li>
            <button
              onClick={logoutUser}
              className={
                userData === undefined || userData === null
                  ? 'hidden'
                  : 'flex hover:text-gray-50'
              }
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
    </nav>
  )
}
