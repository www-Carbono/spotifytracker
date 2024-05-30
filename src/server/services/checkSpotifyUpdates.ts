import { CompareData } from './scraping'
import { getDataForCheckUpdates } from './saveToDatabase'
import { type SpotifyUpdaterData } from '@/app/types'

export const isSpotifyUpdated = async (): Promise<SpotifyUpdaterData> => {
  const data = await getDataForCheckUpdates()
  const songId: string = data[0].songname
  const artistId: string = data[0].artist

  const { songViews, artistFollowers, artistMonthlyListeners } =
    await CompareData(songId, artistId)

  // CompareData => Datos en directo
  // getDataForCheckUpdates => Datos guardados en base de datos
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  if (songViews <= data[0].songviews) {
    const DatabaseAndCurrentData = {
      DatabaseSongViews: data[0].songviews,
      DatabaseMonthlyListeners: data[0].monthlylisteners,
      DatabaseArtistFollowers: data[0].artistfollowers,
      DatabaseViewsCurrentDate: data[0].ViewsDateUpdate,
      DatabaseListenersCurrentDate: data[0].ListenersDateUpdate,
      DatabaseFollowersCurrentDate: data[0].FollowersDateUpdate,
      CurrentSongViews: data[0].songviews,
      CurrentMonthlyListeners: artistMonthlyListeners,
      CurrentArtistFollowers: artistFollowers,
      CurrentDate: `${day}/${month}/${year}`
    }
    return DatabaseAndCurrentData
  } else {
    const DatabaseAndCurrentData = {
      DatabaseSongViews: data[0].songviews,
      DatabaseMonthlyListeners: data[0].monthlylisteners,
      DatabaseArtistFollowers: data[0].artistfollowers,
      DatabaseViewsCurrentDate: data[0].ViewsDateUpdate,
      DatabaseListenersCurrentDate: data[0].ListenersDateUpdate,
      DatabaseFollowersCurrentDate: data[0].FollowersDateUpdate,
      CurrentSongViews: songViews,
      CurrentMonthlyListeners: artistMonthlyListeners,
      CurrentArtistFollowers: artistFollowers,
      CurrentDate: `${day}/${month}/${year}`
    }

    return DatabaseAndCurrentData
  }
}
