'use client'
import React, { useEffect, useState } from 'react'
import { useIsLogged } from '@/hooks/useIsLogged'
import { Loader } from '@/components/Loader'
import { NavBar } from '@/components/navBar'
import { apiCall } from '@/server/services/apiCall'
const Dashboard = (): JSX.Element => {
  const [updateInformation, setUpdateInformation] = useState<any>()
  useEffect(() => {
    apiCall()
      .then((data) => {
        setUpdateInformation(data)
        console.log(data)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])
  const userData = useIsLogged()

  return (
    <div>
      {userData === undefined ? (
        <div className='flex items-center justify-center '>
          <Loader />
        </div>
      ) : userData === null ? (
        window && (window.location.href = '/login')
      ) : (
        <div>
          {updateInformation && (
            <div className='flex items-center justify-center mt-10'>
              {updateInformation.SpotifyUpdateChecker.SongViews.toString() ===
              'true' ? (
                <div
                  role='alert'
                  className='bg-green-100  border-l-4 border-green-500  text-green-900  p-4 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200  transform hover:scale-105'
                >
                  <svg
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='h-5 w-5 flex-shrink-0 mr-2 text-green-600'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      strokeWidth='2'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    ></path>
                  </svg>
                  <p className='text-sm font-semibold'>
                    Datos de Spotify Actualizados a dia{' '}
                    {updateInformation.SpotifyUpdateChecker.LastUpdated}
                  </p>
                </div>
              ) : (
                <div
                  role='alert'
                  className='bg-red-100  border-l-4 border-red-500  text-red-900  p-4 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200  transform hover:scale-105'
                >
                  <svg
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='h-5 w-5 flex-shrink-0 mr-2 text-red-600'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      strokeWidth='2'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    ></path>
                  </svg>
                  <p className='text-sm font-semibold'>
                    Los Datos de Spotify aun no han sido actualizados durante el
                    dia de hoy
                  </p>
                </div>
              )}
            </div>
          )}
          <NavBar userData={userData} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
