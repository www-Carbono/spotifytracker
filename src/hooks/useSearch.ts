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
  handleOnChange: () => void
  handleOnClick: (id: string, song: any) => void
  songName: any
  isLoading: boolean
} => {
  const userData = useIsLogged()
  const [searchSong, setSearchSong] = useState<any>('')
  const songName = useRef<any>('')
  const [songNameSearch] = useDebounce(searchSong, 800)
  const [listOfSongs, setListsOfSongs] = useState<any>()
  const [link, setLink] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  const handleOnChange = (): void => {
    setSearchSong(songName.current.value)
  }

  const handleOnClick = (id: string, song: Track): void => {
    if (type === 'track') {
      saveToDatabase(song, userData, 'track').catch((err) => {
        console.log(err)
      })
      setLink(id)
    } else {
      const artistId = id.substring(32)
      saveToDatabase(song, userData, 'artist').catch((err) => {
        console.log(err)
      })
      setLink(artistId)
    }
  }

  return {
    listOfSongs,
    link,
    handleOnChange,
    handleOnClick,
    songName,
    isLoading
  }
}
