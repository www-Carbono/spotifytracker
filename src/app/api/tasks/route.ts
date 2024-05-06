/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'
import { type NextRequest, NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { type SpotifyUpdaterData } from '@/app/types'

const SpotifyUpdateChecker = {
  SongViews: false,
  MonthlyListeners: false,
  ArtistFollowers: false
}
export async function POST(req: NextRequest): Promise<any> {
  noStore()

  const data = await req.formData()
  const update = data.get('update')
  const updateBoolean = update === 'true'

  if (updateBoolean) {
    const DatabaseAndCurrentData: SpotifyUpdaterData = await isSpotifyUpdated()
    if (
      DatabaseAndCurrentData.DatabaseSongViews !==
      DatabaseAndCurrentData.CurrentSongViews
    ) {
      SpotifyUpdateChecker.SongViews = true
    } else {
      SpotifyUpdateChecker.SongViews = false
    }
    if (
      DatabaseAndCurrentData.DatabaseMonthlyListeners !==
      DatabaseAndCurrentData.CurrentMonthlyListeners
    ) {
      SpotifyUpdateChecker.MonthlyListeners = true
    } else {
      SpotifyUpdateChecker.MonthlyListeners = false
    }
    if (
      DatabaseAndCurrentData.DatabaseArtistFollowers !==
      DatabaseAndCurrentData.CurrentArtistFollowers
    ) {
      SpotifyUpdateChecker.MonthlyListeners = true
    } else {
      SpotifyUpdateChecker.MonthlyListeners = false
    }
    console.log(DatabaseAndCurrentData)
  }

  return NextResponse.json({ SpotifyUpdateChecker })
}
