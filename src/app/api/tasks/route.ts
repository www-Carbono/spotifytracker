/* eslint-disable @typescript-eslint/space-before-function-paren */
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'
import { type NextRequest, NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { type SpotifyUpdaterData } from '@/app/types'
import { updateAll, updateChecker } from '@/server/services/saveToDatabase'

const SpotifyUpdateChecker = {
  SongViews: false,
  MonthlyListeners: false,
  ArtistFollowers: false,
  LastUpdated: ''
}
export async function POST(req: NextRequest): Promise<any> {
  noStore()

  const data = await req.formData()
  const update = data.get('update')
  const updateBoolean = update === 'true'

  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  if (updateBoolean) {
    console.log('[+] Ejecución de la Cron')
    const DatabaseAndCurrentData: SpotifyUpdaterData = await isSpotifyUpdated()

    if (
      SpotifyUpdateChecker.ArtistFollowers &&
      SpotifyUpdateChecker.MonthlyListeners &&
      SpotifyUpdateChecker.SongViews
    ) {
      console.log('[+] Ejecución del if de los tres en true')
      if (
        DatabaseAndCurrentData.CurrentDate !==
        DatabaseAndCurrentData.DatabaseCurrentDate
      ) {
        console.log('[+] Ejecución del if de la fecha y setea todo en false')
        SpotifyUpdateChecker.ArtistFollowers = false
        SpotifyUpdateChecker.MonthlyListeners = false
        SpotifyUpdateChecker.SongViews = false
      }
    }

    if (
      DatabaseAndCurrentData.DatabaseSongViews !==
      DatabaseAndCurrentData.CurrentSongViews
    ) {
      console.log('[+] ACTUALIZACION : Se han actualizado las views.')
      SpotifyUpdateChecker.SongViews = true
      SpotifyUpdateChecker.LastUpdated = DatabaseAndCurrentData.CurrentDate
      await updateChecker(
        'songviews',
        DatabaseAndCurrentData.CurrentSongViews,
        1,
        'checkupdated'
      )
        .then(async () => {
          console.log('Song Views Updated!')
          updateAll('spotifytracker', 'viewsTest', `${month}/${day}`, 'track')
            .then(async (data) => {
              console.log(data)
              await updateChecker(
                'DateUpdated',
                `${day}/${month}/${year}`,
                1,
                'checkupdated'
              ).catch((error) => {
                console.log(error)
              })
            })
            .catch((error: any) => {
              console.log(error)
            })
        })
        .catch(() => {
          console.log('Error Updating Song Views')
        })
    }

    if (
      DatabaseAndCurrentData.DatabaseMonthlyListeners !==
      DatabaseAndCurrentData.CurrentMonthlyListeners
    ) {
      SpotifyUpdateChecker.MonthlyListeners = true

      console.log(
        '[+] ACTUALIZACION : Se han actualizado los oyentes mensuales.'
      )
      await updateChecker(
        'monthlylisteners',
        DatabaseAndCurrentData.CurrentMonthlyListeners,
        1,
        'checkupdated'
      )
        .then(async () => {
          console.log('Monthly Listeners Updated!')
          updateAll(
            'monthlylistenerstracker',
            'monthlylisteners',
            `${month}/${day}`,
            'listeners'
          )
            .then((data) => {
              console.log(data)
            })
            .catch((error: any) => {
              console.log(error)
            })
        })
        .catch(() => {
          console.log('Error Updating Monthly Listeners')
        })
    }

    if (
      DatabaseAndCurrentData.DatabaseArtistFollowers !==
      DatabaseAndCurrentData.CurrentArtistFollowers
    ) {
      SpotifyUpdateChecker.ArtistFollowers = true
      console.log(
        '[+] ACTUALIZACION : Se han actualizado lod follows del artista.'
      )
      await updateChecker(
        'artistfollowers',
        DatabaseAndCurrentData.CurrentArtistFollowers,
        1,
        'checkupdated'
      )
        .then(async () => {
          console.log('Artist Followers Updated!!!')
          updateAll(
            'followerstracker',
            'monthlylisteners',
            `${month}/${day}`,
            'artist'
          )
            .then((data) => {
              console.log(data)
            })
            .catch((error: any) => {
              console.log(error)
            })
        })
        .catch(() => {
          console.log('Error Updating Artist Followers')
        })
    }

    console.log('[+] ACTUALIZACION', DatabaseAndCurrentData)
    console.log('[+] ACTUALIZACION', SpotifyUpdateChecker)

    // Return después de completar todas las operaciones dentro del if
    return NextResponse.json({ SpotifyUpdateChecker })
  }

  // Return fuera del if si el update no es true
  return NextResponse.json({ SpotifyUpdateChecker })
}
