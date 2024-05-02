import { CompareData } from './scraping'
import { getDataForCheckUpdates } from './saveToDatabase'

export const isSpotifyUpdated = async (): Promise<void> => {
  const data = await getDataForCheckUpdates()
  const songId: string = data.songname
  const artistId: string = data.artist

  const { songViews, artistFollowers, artistMonthlyListeners } =
    await CompareData(songId, artistId)

  console.log(songViews, artistFollowers, artistMonthlyListeners)
}