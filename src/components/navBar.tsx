import React, { useState } from 'react'
import { AddNewSong } from './addNewSong'
import { AddNewArtist } from './addNewArtist'
import { AddNewFollowers } from './addNewFollowers'
import { Stats } from './stats'
export const NavBar = (userData: any): JSX.Element => {
  const [component, setComponent] = useState<JSX.Element>()
  const [selected, setSelected] = useState<number>()

  const infoData = {
    canciones: 'canciones',
    oyentes: 'oyentes',
    seguidores: 'seguidores'
  }

  const changeComponent = (component: JSX.Element): void => {
    setComponent(component)
  }

  return (
    <div className='flex flex-row mt-10 gap-28 justify-center'>
      <ul className='flex  flex-col gap-5 mx-10'>
        <li
          onClick={() => {
            changeComponent(<AddNewSong />)
            setSelected(1)
          }}
          className={selected === 1 ? 'text-red-700' : ''}
        >
          Añadir Seguimiento de Canción
        </li>
        <li
          onClick={() => {
            changeComponent(<AddNewArtist />)
            setSelected(2)
          }}
          className={selected === 2 ? 'text-red-700' : ''}
        >
          Añadir Seguimiento de Oyentes Mensuales
        </li>
        <li
          onClick={() => {
            changeComponent(<AddNewFollowers />)
            setSelected(3)
          }}
          className={selected === 3 ? 'text-red-700' : ''}
        >
          {' '}
          Añadir Seguimiento de Seguidores en Spotify
        </li>
        <li
          onClick={() => {
            changeComponent(
              <Stats
                type={infoData.canciones}
                database='spotifytracker'
                userData={userData}
              />
            )
            setSelected(4)
          }}
          className={selected === 4 ? 'text-red-700' : ''}
        >
          {' '}
          Seguimiento Oyentes Mensuales
        </li>
        <li
          onClick={() => {
            changeComponent(
              <Stats
                type={infoData.oyentes}
                database='monthlylistenerstracker'
                userData={userData}
              />
            )
            setSelected(5)
          }}
          className={selected === 5 ? 'text-red-700' : ''}
        >
          {' '}
          Seguimiento de Oyentes Mensuales
        </li>
        <li
          onClick={() => {
            changeComponent(
              <Stats
                type={infoData.seguidores}
                database='followerstracker'
                userData={userData}
              />
            )
            setSelected(6)
          }}
          className={selected === 6 ? 'text-red-700' : ''}
        >
          {' '}
          Seguidmiento Followers
        </li>
      </ul>
      <div className='mx-auto'>{component}</div>
    </div>
  )
}
