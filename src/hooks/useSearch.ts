/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import searchSongSpotify from '../server/services/scraping'
import saveToDatabase from '../server/services/saveToDatabase'
import { useIsLogged } from './useIsLogged'
import { type Track } from '@/app/types'

export const useSearch = ({
  type
}: {
  type: string
}): {
  listOfSongs: any
  link: string
  handleOnChange: (event: React.ChangeEvent<HTMLDivElement>) => void
  handleOnClick: (id: string, song: any) => void
  songName: any
  isLoading: boolean
  error: boolean
  done: boolean
} => {
  const userData = useIsLogged()
  const [searchSong, setSearchSong] = useState<any>('')
  const songName = useRef<any>('')
  const [songNameSearch] = useDebounce(searchSong, 800)
  const [listOfSongs, setListsOfSongs] = useState<any>()
  const [link, setLink] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [done, setDone] = useState<boolean>(false)
  useEffect(() => {
    if (songNameSearch.length > 0) {
      searchSongSpotify(songNameSearch, type)
        .then((data: any) => {
          if (type === 'track') {
            setListsOfSongs(data.tracks.items)
          } else {
            setListsOfSongs(data.artists.items)
          }
          setIsLoading(false)
        })
        .catch((err: any) => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }, [songNameSearch])

  useEffect(() => {
    if (songName.current.value) {
      setIsLoading(true)
    }
    setListsOfSongs(undefined)
  }, [songName.current.value])

  const handleOnChange = (event: React.ChangeEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setSearchSong(songName.current.value)
    setError(false)
    setDone(false)
  }

  const handleOnClick = (id: string, song: Track): void => {
    console.log('click')
    setListsOfSongs(undefined)
    setIsLoading(true)
    setError(false)
    setDone(false)

    if (type === 'track') {
      saveToDatabase(song, userData, 'track')
        .then((data) => {
          console.log(data)
          setError(false)
          setDone(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setError(true)
          setDone(false)
          setIsLoading(false)
        })
      setLink(id)
    } else {
      const artistId = id.substring(32)
      saveToDatabase(song, userData, type)
        .then((data) => {
          console.log(data)
          setError(false)
          setDone(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setError(true)
          setDone(false)
          setIsLoading(false)
        })
      setLink(artistId)
    }
    // songName.current.value = ''
  }

  return {
    listOfSongs,
    link,
    handleOnChange,
    handleOnClick,
    songName,
    isLoading,
    error,
    done
  }
}
