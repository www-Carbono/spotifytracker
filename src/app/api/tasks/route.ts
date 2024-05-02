/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'
import { NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'

export async function GET(): Promise<any> {
  noStore()

  const { songViews, artistFollowers, artistMonthlyListeners } =
    await isSpotifyUpdated()

  console.log(songViews, artistFollowers, artistMonthlyListeners)

  return NextResponse.json({
    songViews,
    artistFollowers,
    artistMonthlyListeners
  })
}
