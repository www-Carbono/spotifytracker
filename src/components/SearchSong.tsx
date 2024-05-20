import React from 'react'

import { useSearch } from '../hooks/useSearch'
import { Loader } from './Loader'
import { PopUp } from './popup'

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
    isLoading,
    error,
    done
  } = useSearch({ type })

  return (
    <form
      className='flex flex-col'
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <label
        htmlFor='songName'
        className='m-5'
      >
        {type === 'track' ? (
          <div
            role='alert'
            className=' bg-blue-100  border-l-4 border-blue-500  text-blue-900  p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-blue-200  transform hover:scale-105'
          >
            <svg
              stroke='currentColor'
              viewBox='0 0 24 24'
              fill='none'
              className='h-5 w-5 flex-shrink-0 mr-2 text-blue-600'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                strokeWidth='2'
                strokeLinejoin='round'
                strokeLinecap='round'
              ></path>
            </svg>
            <p className='text-xs font-semibold'>
              Introduce el Nombre de la Canción y haz click en la que quieras
              hacer un seguimiento
            </p>
          </div>
        ) : (
          <div
            role='alert'
            className='bg-blue-100  border-l-4 border-blue-500  text-blue-900  p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-blue-200  transform hover:scale-105'
          >
            <svg
              stroke='currentColor'
              viewBox='0 0 24 24'
              fill='none'
              className='h-5 w-5 flex-shrink-0 mr-2 text-blue-600'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                strokeWidth='2'
                strokeLinejoin='round'
                strokeLinecap='round'
              ></path>
            </svg>
            <p className='text-xs font-semibold'>
              Introduce el Nombre del Artista y haz click en el artista que
              quieras hacer un seguimiento
            </p>
          </div>
        )}
      </label>
      <input
        ref={songName}
        type='text'
        id='songName'
        className='flex h-10 w-full border ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border-gray-200  rounded-md px-3 py-2 text-sm'
        placeholder={`${type === 'track' ? 'Shakira - Waka Waka' : 'Shakira'}`}
        onChange={(event) => {
          handleOnChange(event)
        }}
      />
      {isLoading && (
        <div className='flex justify-center items-center mt-10'>
          <Loader />
        </div>
      )}
      {error ? (
        <div className='mt-10'>
          <PopUp type='error'>
            {'Error al añadir la canción o el artista, vuelve a Intentarlo'}
          </PopUp>
        </div>
      ) : (
        ''
      )}
      {done ? (
        <div className='mt-10'>
          <PopUp type='done'>
            {'Cancion o Artista añadido correctamente.'}
          </PopUp>
        </div>
      ) : (
        ''
      )}
      <div className='bg-white text-black rounded-lg shadow-lg p-6 mt-10'>
        <h2 className='text-2xl font-bold mb-4'>
          Lista de Canciones o Artistas
        </h2>
        <div className='relative overflow-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='border-b'>
                <th className='p-4'>Portada</th>
                <th className='p-4'>Artista</th>
                {type === 'track' ? <th className='p-4'>Canción</th> : ''}
              </tr>
            </thead>
            <tbody>
              {listOfSongs !== undefined ? (
                listOfSongs.map((song: any) => (
                  <tr
                    key={song.id}
                    className='border-b hover:bg-gray-200 cursor-pointer'
                    onClick={() => {
                      handleOnClick(song.external_urls.spotify as string, song)
                    }}
                  >
                    <td className='p-4'>
                      <img
                        src={
                          type === 'track'
                            ? song.album.images[2]?.url
                            : song?.images &&
                              song.images.length >= 3 &&
                              song.images[2]?.url
                            ? song.images[2].url
                            : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                        }
                        alt={song.name}
                        height={50}
                        width={50}
                        className='rounded-md'
                      />
                    </td>
                    <td className='p-4'>
                      {type === 'track' ? song.artists[0].name : song.name}
                    </td>
                    <td className='p-4'>{type === 'track' ? song.name : ''}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className='text-center p-4'
                  >
                    No hay Canciones Disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  )
}
