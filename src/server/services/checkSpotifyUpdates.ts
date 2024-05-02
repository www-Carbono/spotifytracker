import { CompareData } from './scraping'
import { getDataForCheckUpdates } from './saveToDatabase'

export const isSpotifyUpdated = async (): Promise<any> => {
  const data = await getDataForCheckUpdates()
  const songId: string = data[0].songname
  const artistId: string = data[0].artist

  const { songViews, artistFollowers, artistMonthlyListeners } =
    await CompareData(songId, artistId)

  return { songViews, artistFollowers, artistMonthlyListeners }
}
