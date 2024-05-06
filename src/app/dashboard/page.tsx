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
        console.log(data)
        setUpdateInformation(data)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])
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
        <div>
          {updateInformation && (
            <p
              className={
                updateInformation.SpotifyUpdateChecker.SongViews.toString() ===
                'true'
                  ? 'text-center bg-green-600'
                  : 'text-center bg-red-600'
              }
            >
              {updateInformation.SpotifyUpdateChecker.SongViews.toString() ===
              'true'
                ? `Datos de Spotify Actualizados a dia ${updateInformation.SpotifyUpdateChecker.LastUpdated}`
                : `Los Datos de Spotify aun no han sido actualizados durante el dia de hoy`}
            </p>
          )}
          <NavBar userData={userData} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
