import React, { useState } from 'react'
import { AddNewSong } from './addNewSong'
import { AddNewArtist } from './addNewArtist'
export const NavBar = (): JSX.Element => {
  const [component, setComponent] = useState<JSX.Element>()

  const changeComponent = (component: JSX.Element): void => {
    setComponent(component)
  }

  return (
    <div className='flex flex-row mt-10 gap-28 justify-center'>
      <ul className='flex  flex-col gap-5 mx-10'>
        <li
          onClick={() => {
            changeComponent(<AddNewSong />)
          }}
        >
          Añador Seguimiento de Canción
        </li>
        <li
          onClick={() => {
            changeComponent(<AddNewArtist />)
          }}
        >
          Añadir Seguimiento de Oyentes Mensuales
        </li>
        <li
          onClick={() => {
            changeComponent(<AddNewSong />)
          }}
        >
          {' '}
          Añadir Seguimiento de Seguidores en Spotify
        </li>
      </ul>
      <div className='mx-auto'>{component}</div>
    </div>
  )
}
