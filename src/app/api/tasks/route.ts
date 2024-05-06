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
    SpotifyUpdateChecker.LastUpdated =
      DatabaseAndCurrentData.DatabaseCurrentDate
    // Comprobamos si los 3 son true
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
      updateChecker(
        'songviews',
        DatabaseAndCurrentData.CurrentSongViews,
        1,
        'checkupdated'
      )
        .then(() => {
          console.log('Song Views Updated!')
          updateAll('spotifytracker', 'viewsTest', `${month}/${day}`, 'track')
            .then((data) => {
              console.log(data)
              updateChecker(
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
      console.log(
        '[+] ACTUALIZACION : Se han actualizado los oyentes mensuales.'
      )
      SpotifyUpdateChecker.MonthlyListeners = true
      updateChecker(
        'monthlylisteners',
        DatabaseAndCurrentData.CurrentMonthlyListeners,
        1,
        'checkupdated'
      )
        .then(() => {
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
      console.log(
        '[+] ACTUALIZACION : Se han actualizado lod follows del artista.'
      )
      SpotifyUpdateChecker.ArtistFollowers = true
      updateChecker(
        'artistfollowers',
        DatabaseAndCurrentData.CurrentArtistFollowers,
        1,
        'checkupdated'
      )
        .then(() => {
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
  }

  return NextResponse.json({ SpotifyUpdateChecker })
}
