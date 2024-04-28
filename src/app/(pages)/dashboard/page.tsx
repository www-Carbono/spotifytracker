'use client'
import React from 'react'
import { useIsLogged } from '@/app/hooks/useIsLogged'
import { Loader } from '@/app/components/Loader'
const Dashboard = (): JSX.Element => {
  const userData = useIsLogged()
  return (
    <div>
      {userData === undefined ? (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      ) : userData === null ? (
        window && (window.location.href = '/login')
      ) : (
        <p>Logeado</p>
      )}
    </div>
  )
}

export default Dashboard
