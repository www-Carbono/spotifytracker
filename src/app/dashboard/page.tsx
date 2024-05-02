'use client'
import React from 'react'
import { useIsLogged } from '@/hooks/useIsLogged'
import { Loader } from '@/components/Loader'
import { NavBar } from '@/components/navBar'
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
        <NavBar userData={userData} />
      )}
    </div>
  )
}

export default Dashboard
