import { useEffect, useState, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import searchSongSpotify from '../server/services/scraping'
import saveToDatabase from '../server/services/saveToDatabase'
import { useIsLogged } from './useIsLogged'
import { type Track } from '@/app/types'

export const useSearch = (): {
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
      searchSongSpotify(songNameSearch)
        .then((data: any) => {
          setListsOfSongs(data)
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
    saveToDatabase(song, userData).catch((err) => {
      console.log(err)
    })
    setLink(id)
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
