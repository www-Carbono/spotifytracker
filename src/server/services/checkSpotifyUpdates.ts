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

  const DatabaseAndCurrentData = {
    DatabaseSongViews: data[0].songviews,
    DatabaseMonthlyListeners: data[0].monthlylisteners,
    DatabaseArtistFollowers: data[0].artistfollowers,
    CurrentSongViews: songViews,
    CurrentMonthlyListeners: artistMonthlyListeners,
    CurrentArtistFollowers: artistFollowers
  }

  return DatabaseAndCurrentData
}
