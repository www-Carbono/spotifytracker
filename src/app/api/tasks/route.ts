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

  if (updateBoolean) {
    console.log('[+] Ejecución de la Cron')
    const DatabaseAndCurrentData: SpotifyUpdaterData = await isSpotifyUpdated()

    // // Este if comprueba si ya se han actualizado los datos de spotify y setea el json todo en false cuando cambia de dia. (Esto principalmente es para el aviso en la parte superior)
    if (
      SpotifyUpdateChecker.ArtistFollowers &&
      SpotifyUpdateChecker.MonthlyListeners &&
      SpotifyUpdateChecker.SongViews
    ) {
      console.log('[+] Ejecución del if de los tres en true')
      if (
        DatabaseAndCurrentData.CurrentDate !==
        DatabaseAndCurrentData.DatabaseViewsCurrentDate
      ) {
        console.log('[+] Ejecución del if de la fecha y setea todo en false')
        SpotifyUpdateChecker.ArtistFollowers = false
        SpotifyUpdateChecker.MonthlyListeners = false
        SpotifyUpdateChecker.SongViews = false
      }
    }

    // // Este if se ejecuta cuando se actualizan las views
    if (
      DatabaseAndCurrentData.DatabaseSongViews !==
      DatabaseAndCurrentData.CurrentSongViews
    ) {
      console.log('[+] ACTUALIZACION : Se han actualizado las views.')
      SpotifyUpdateChecker.SongViews = true
      SpotifyUpdateChecker.LastUpdated = DatabaseAndCurrentData.CurrentDate

      // Añadimos un dia a la fecha:
      const fechaArray =
        DatabaseAndCurrentData.DatabaseFollowersCurrentDate.split('/')
      const fecha = new Date(
        Date.UTC(
          Number(fechaArray[2]),
          Number(fechaArray[1]) - 1,
          Number(fechaArray[0])
        )
      )
      fecha.setDate(fecha.getDate() + 1)
      const day = fecha.getDate()
      const month = Number(fecha.getMonth() + 1)
      const year = fecha.getFullYear().toString().substring(-2)
      const fechaFinal = `${day}/${month}/${year}`
      const fechaFinalDB = `${day}/${month}`

      await updateChecker('ViewsDateUpdate', fechaFinal, 1, 'checkupdated')
      await updateChecker(
        'songviews',
        DatabaseAndCurrentData.CurrentSongViews,
        1,
        'checkupdated'
      )
        .then(async () => {
          updateAll('spotifytracker', 'viewsTest', fechaFinalDB, 'track')
            .then(async (data) => {
              console.log(data)
            })
            .catch((error: any) => {
              console.log(error)
            })
        })
        .catch(() => {
          console.log('Error Updating Song Views')
        })
    }
    // // Este if se ejecuta cuando se actualizan los oyentes mensuales que tiene el artista en spotify
    if (
      DatabaseAndCurrentData.DatabaseMonthlyListeners !==
      DatabaseAndCurrentData.CurrentMonthlyListeners
    ) {
      SpotifyUpdateChecker.MonthlyListeners = true

      console.log(
        '[+] ACTUALIZACION : Se han actualizado los oyentes mensuales.'
      )

      // Añadimos un dia a la fecha:
      const fechaArray =
        DatabaseAndCurrentData.DatabaseFollowersCurrentDate.split('/')
      const fecha = new Date(
        Date.UTC(
          Number(fechaArray[2]),
          Number(fechaArray[1]) - 1,
          Number(fechaArray[0])
        )
      )
      fecha.setDate(fecha.getDate() + 1)
      const day = fecha.getDate()
      const month = Number(fecha.getMonth() + 1)
      const year = fecha.getFullYear().toString().substring(-2)
      const fechaFinal = `${day}/${month}/${year}`
      const fechaFinalDB = `${day}/${month}`

      await updateChecker('ListenersDateUpdate', fechaFinal, 1, 'checkupdated')

      await updateChecker(
        'monthlylisteners',
        DatabaseAndCurrentData.CurrentMonthlyListeners,
        1,
        'checkupdated'
      )
        .then(async () => {
          updateAll(
            'monthlylistenerstracker',
            'monthlylisteners',
            fechaFinalDB,
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

    // // Este if se ejecuta cuando se actualizan los Followers que tiene el artista en spotify
    if (
      DatabaseAndCurrentData.DatabaseArtistFollowers !==
      DatabaseAndCurrentData.CurrentArtistFollowers
    ) {
      SpotifyUpdateChecker.ArtistFollowers = true
      console.log(
        '[+] ACTUALIZACION : Followers de artistas Actualizado! Comenzando Actualización'
      )

      // Añadimos un dia a la fecha:
      const fechaArray =
        DatabaseAndCurrentData.DatabaseFollowersCurrentDate.split('/')
      const fecha = new Date(
        Date.UTC(
          Number(fechaArray[2]),
          Number(fechaArray[1]) - 1,
          Number(fechaArray[0])
        )
      )
      fecha.setDate(fecha.getDate() + 1)
      const day = fecha.getDate()
      const month = Number(fecha.getMonth() + 1)
      const year = fecha.getFullYear().toString().substring(-2)
      const fechaFinal = `${day}/${month}/${year}`
      const fechaFinalDB = `${day}/${month}`

      await updateChecker('FollowersDateUpdate', fechaFinal, 1, 'checkupdated')

      // Actualizamos los seguidores  de la canción para que no vuelva a entrar en el bucle.
      await updateChecker(
        'artistfollowers',
        DatabaseAndCurrentData.CurrentArtistFollowers,
        1,
        'checkupdated'
      )
        .then(async () => {
          // Manda actualizar la base de datos correspondiente y dentro de updateAll es donde está toda la lógica.
          updateAll(
            'followerstracker',
            'monthlylisteners',
            fechaFinalDB,
            // `${month}/${day}`,
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

    // Return después de completar todas las operaciones dentro del if
    return NextResponse.json({ SpotifyUpdateChecker })
  }

  // Return fuera del if si el update no es true
  return NextResponse.json({ SpotifyUpdateChecker })
}
