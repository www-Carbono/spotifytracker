/* eslint-disable @typescript-eslint/space-before-function-paren */
// import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'

// api > hello > route.ts

import { NextResponse } from 'next/server'

export async function GET(): Promise<any> {
  console.log('Funciona Correctamente')
  return NextResponse.json({ ok: true })
}
