import React, { useState } from 'react'
import { AddNewSong } from './addNewSong'
import { AddNewArtist } from './addNewArtist'
import { AddNewFollowers } from './addNewFollowers'
export const NavBar = (): JSX.Element => {
  const [component, setComponent] = useState<JSX.Element>()
  const [selected, setSelected] = useState<number>()

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
          Añador Seguimiento de Canción
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
      </ul>
      <div className='mx-auto'>{component}</div>
    </div>
  )
}
