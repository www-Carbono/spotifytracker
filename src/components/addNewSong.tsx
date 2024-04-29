import React from 'react'
import { SearchSong } from './SearchSong'
export const AddNewSong = (): JSX.Element => {
  return (
    <div>
      <h1>Añadir nueva Cancion</h1>
      <SearchSong type={'track'} />
    </div>
  )
}
