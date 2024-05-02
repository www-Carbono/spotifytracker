/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'

import { createClient } from '@supabase/supabase-js'

// api > hello > route.ts

import { NextResponse } from 'next/server'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(): Promise<any> {
  console.log('Funciona Correctamente')
  const { data, error } = await supabase.rpc('testing')

  const { songViews, artistFollowers, artistMonthlyListeners } =
    await isSpotifyUpdated()

  console.log(songViews, artistFollowers, artistMonthlyListeners)

  return NextResponse.json({
    songViews,
    artistFollowers,
    artistMonthlyListeners
  })
}
