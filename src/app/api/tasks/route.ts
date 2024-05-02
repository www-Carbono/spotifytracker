/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'

// api > hello > route.ts
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const data = await isSpotifyUpdated()
  const greeting = 'Hello World!!'
  const json = {
    greeting
  }

  return NextResponse.json(json)
}
