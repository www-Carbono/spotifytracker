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
    <button
      onClick={logoutUser}
      className={userData === undefined || userData === null ? 'hidden' : ''}
    >
      Logout
    </button>
  )
}
