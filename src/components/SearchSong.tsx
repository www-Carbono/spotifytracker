import React from 'react'

import { useSearch } from '../hooks/useSearch'
import { Loader } from './Loader'

interface Props {
  type: string
}

export const SearchSong = ({ type }: Props): JSX.Element => {
  const {
    handleOnChange,
    handleOnClick,
    listOfSongs,
    // link,
    songName,
    isLoading
  } = useSearch({ type })

  return (
    <form className='flex flex-col'>
      <label
        htmlFor='songName'
        className='m-5'
      >
        Introduce el Nombre de la Canción
      </label>
      <input
        ref={songName}
        type='text'
        id='songName'
        onChange={handleOnChange}
        className='text-black'
      />
      <div className='songs text-white flex flex-col gap-5 p-5'>
        {listOfSongs !== undefined ? (
          listOfSongs?.map((song: any) =>
            type === 'track' ? (
              <div
                className='song flex flex-row items-center border border-red-500 gap-5 p-2  cursor-pointer'
                key={song.id}
                onClick={() => {
                  handleOnClick(song.external_urls.spotify as string, song)
                }}
              >
                <img
                  src={song.album.images[2].url}
                  alt=''
                  srcSet=''
                />
                <p>
                  {song.name} - {song.artists[0].name}
                </p>
              </div>
            ) : (
              <div
                className='song flex flex-row items-center border border-red-500 gap-5 p-2  cursor-pointer'
                key={song.id}
                onClick={() => {
                  handleOnClick(song.external_urls.spotify as string, song)
                }}
              >
                <img
                  src={song?.images[2].url}
                  height={100}
                  width={100}
                  alt=''
                  srcSet=''
                />
                <p>{song.name}</p>
              </div>
            )
          )
        ) : isLoading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          ''
        )}
      </div>
    </form>
  )
}
