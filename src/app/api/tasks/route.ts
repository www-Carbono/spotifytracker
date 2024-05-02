/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'

export async function GET(): Promise<any> {
  noStore()

  console.log('update')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
  const supabase = createClient(supabaseUrl, supabaseKey)
  console.log('Funciona Correctamente')
  const { data, error } = await supabase.rpc('testing')
  console.log(data, error)

  const { songViews, artistFollowers, artistMonthlyListeners } =
    await isSpotifyUpdated()

  console.log(songViews, artistFollowers, artistMonthlyListeners)

  return NextResponse.json({
    songViews,
    artistFollowers,
    artistMonthlyListeners
  })
}
