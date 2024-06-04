'use server'
// Guardar Nuevas Canciones en la Base de Datos
import { type PostgrestResponse, createClient } from '@supabase/supabase-js'
import { getViews } from './scraping'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

const saveToDatabase = async (
  data2: any,
  userid: any,
  type: string
): Promise<void> => {
  const currentDataJson = await getDataForCheckUpdates()

  if (type === 'track') {
    const currentDate = currentDataJson[0].ViewsDateUpdate.slice(0, -5) // Obtenemos la fecha actual
    const currentViews = await getViews(data2.id as string, 'track')
    const dataToUpload = {
      [currentDate]: Number(currentViews)
    }
    const { error } = await supabase.from('spotifytracker').insert({
      songName: data2.name,
      artistName: data2.artists[0].name,
      coverlink: data2.album.images[0].url,
      songlink: data2.id,
      viewsTest: dataToUpload,
      userId: userid.id
    })
    console.log(error)
  } else if (type === 'artistFollowers') {
    const currentDate = currentDataJson[0].FollowersDateUpdate.slice(0, -5) // Obtenemos la fecha actual
    const MonthlyListeners = await getViews(data2.id as string, 'artist')
    const dataToUpload = {
      [currentDate]: MonthlyListeners.followers
    }
    const { error } = await supabase.from('followerstracker').insert({
      artistname: data2.name,
      coverlink: data2.images[0].url,
      songlink: data2.id,
      monthlylisteners: dataToUpload,
      userId: userid.id
    })
    console.log(error)
  } else {
    const currentDate = currentDataJson[0].ListenersDateUpdate.slice(0, -5) // Obtenemos la fecha actual
    const MonthlyListeners = await getViews(data2.id as string, 'artist')
    const dataToUpload = {
      [currentDate]: MonthlyListeners.monthlyListeners
    }
    const { error } = await supabase.from('monthlylistenerstracker').insert({
      artistname: data2.name,
      coverlink: data2.images[0].url,
      songlink: data2.id,
      monthlylisteners: dataToUpload,
      userId: userid.id
    })
    console.log(error)
  }
}
export const getData = async (
  databaseName: string,
  userId: string
): Promise<any> => {
  const { data, error } = await supabase
    .from(databaseName)
    .select('*')
    .eq('userId', userId)

  if (error) {
    console.log(error)
    return error
  }
  return data
}

export const getDataForCheckUpdates = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('checkupdated')
    .select('*')
    .eq('id', 1)

  if (error) {
    return error
  }
  return data
}

export const updateChecker = async (
  row: string,
  dataToUpdate: any,
  id: any,
  database: string
): Promise<any> => {
  const { data, error } = await supabase
    .from(database)
    .update({ [row]: dataToUpdate })
    .eq('id', id)
    .select()
  if (error) {
    return error
  }
  return data
}

interface dataInterface {
  artistname: string | null
  coverlink: string | null
  id: string
  monthlylisteners: any[]
  viewsTest: any[]
  songlink: string | null
  userId: string | null
}
type DataInterfaceProperty = keyof dataInterface

export const updateAll = async (
  database: string,
  row: DataInterfaceProperty,
  date: string,
  type: string
): Promise<any> => {
  const { data, error }: PostgrestResponse<dataInterface> = await supabase
    .from(database)
    .select('*')
  if (error) {
    return error
  }

  const notUpdated: any[] = []
  console.log(type)

  for (const element of data) {
    const dataView = await getViews(element.songlink, type)

    if (type === 'artist') {
      // Tengo que comparar oyentes/views/followers del element(elemento de la base de datos) y el dataView (data actual de escuchas oyentes etc)
      const lastSavedData = Object.values(element.monthlylisteners).pop()
      console.log(dataView)
      if (lastSavedData === dataView.followers) {
        notUpdated.push(element.id)
        continue
      }
    } else if (type === 'track') {
      const lastSavedData = Object.values(element.viewsTest).pop()
      if (lastSavedData === Number(dataView)) {
        notUpdated.push(element.id)
        continue
      }
    } else if (type === 'listeners') {
      const lastSavedData = Object.values(element.monthlylisteners).pop()
      if (lastSavedData === dataView.monthlyListeners) {
        notUpdated.push(element.id)
        continue
      }
    }
    const rowData =
      element[row] && typeof element[row] === 'object' ? element[row] : {}

    const finalData = [
      {
        ...rowData,
        [date]:
          type === 'track'
            ? Number(dataView)
            : type === 'listeners'
            ? Number(dataView.monthlyListeners)
            : Number(dataView.followers)
      }
    ]

    await updateChecker(row, finalData[0], element.id, database)

    await new Promise((resolve) => setTimeout(resolve, 15000))
  }
  console.log('los datos que no se han actualizado aun son =>', notUpdated)

  await tryUpdateAgain(database, row, date, type, notUpdated)

  return `La base de datos ${database} ha sido actualizada correctamente`
}

const tryUpdateAgain = async (
  database: string,
  row: DataInterfaceProperty,
  date: string,
  type: string,
  notUpdated: any[]
): Promise<any> => {
  const CONTADOR_VALUE = 25
  while (notUpdated.length > 0) {
    console.log('INICIO BUCLE')
    for (const elementId of notUpdated) {
      let contador = 0
      while (contador < CONTADOR_VALUE) {
        console.log(contador)
        const { data }: PostgrestResponse<dataInterface> = await supabase
          .from(database)
          .select('*')
          .eq('id', elementId)

        if (data !== null) {
          const dataView = await getViews(data[0].songlink, type)

          if (type === 'artist') {
            // Tengo que comparar oyentes/views/followers del element(elemento de la base de datos) y el dataView (data actual de escuchas oyentes etc)
            const lastSavedData = Object.values(data[0].monthlylisteners).pop()
            if (lastSavedData === dataView.followers) {
              await new Promise((resolve) => setTimeout(resolve, 15000))
              contador++
              if (contador === CONTADOR_VALUE - 1) {
                const nuevoArray = notUpdated.filter(
                  (item) => item !== elementId
                )
                notUpdated = nuevoArray
                const rowData =
                  data[0][row] && typeof data[0][row] === 'object'
                    ? data[0][row]
                    : {}

                const finalData = [
                  {
                    ...rowData,
                    [date]: Number(dataView.followers)
                  }
                ]

                await updateChecker(row, finalData[0], elementId, database)
                console.log(notUpdated, '<== Array Despues de actualizar')
                break
              }
            } else {
              const nuevoArray = notUpdated.filter((item) => item !== elementId)
              notUpdated = nuevoArray
              const rowData =
                data[0][row] && typeof data[0][row] === 'object'
                  ? data[0][row]
                  : {}
              const finalData = [
                {
                  ...rowData,
                  [date]: Number(dataView.followers)
                }
              ]

              await updateChecker(row, finalData[0], elementId, database)
              console.log(notUpdated, '<== Array Despues de actualizar')
              break
            }
          } else if (type === 'track') {
            // Tengo que comparar oyentes/views/followers del element(elemento de la base de datos) y el dataView (data actual de escuchas oyentes etc)
            const lastSavedData = Object.values(data[0].viewsTest).pop()
            if (lastSavedData === Number(dataView)) {
              await new Promise((resolve) => setTimeout(resolve, 15000))
              contador++
              if (contador === CONTADOR_VALUE - 1) {
                const nuevoArray = notUpdated.filter(
                  (item) => item !== elementId
                )
                notUpdated = nuevoArray
                const rowData =
                  data[0][row] && typeof data[0][row] === 'object'
                    ? data[0][row]
                    : {}
                const finalData = [
                  {
                    ...rowData,
                    [date]: Number(dataView)
                  }
                ]

                await updateChecker(row, finalData[0], elementId, database)
                console.log(notUpdated, '<== Array Despues de actualizar')
                break
              }
            } else {
              const nuevoArray = notUpdated.filter((item) => item !== elementId)
              notUpdated = nuevoArray
              const rowData =
                data[0][row] && typeof data[0][row] === 'object'
                  ? data[0][row]
                  : {}
              const finalData = [
                {
                  ...rowData,
                  [date]: Number(dataView)
                }
              ]

              await updateChecker(row, finalData[0], elementId, database)
              console.log(notUpdated, '<== Array Despues de actualizar')
              break
            }
          } else if (type === 'listeners') {
            const lastSavedData = Object.values(data[0].monthlylisteners).pop()
            if (lastSavedData === dataView.monthlyListeners) {
              await new Promise((resolve) => setTimeout(resolve, 15000))
              contador++
              if (contador === CONTADOR_VALUE - 1) {
                const nuevoArray = notUpdated.filter(
                  (item) => item !== elementId
                )
                notUpdated = nuevoArray
                const rowData =
                  data[0][row] && typeof data[0][row] === 'object'
                    ? data[0][row]
                    : {}
                const finalData = [
                  {
                    ...rowData,
                    [date]: Number(dataView.monthlyListeners)
                  }
                ]

                await updateChecker(row, finalData[0], elementId, database)
                console.log(notUpdated, '<== Array Despues de actualizar')
                break
              }
            } else {
              const nuevoArray = notUpdated.filter((item) => item !== elementId)
              notUpdated = nuevoArray
              const rowData =
                data[0][row] && typeof data[0][row] === 'object'
                  ? data[0][row]
                  : {}
              const finalData = [
                {
                  ...rowData,
                  [date]: Number(dataView.monthlyListeners)
                }
              ]

              await updateChecker(row, finalData[0], elementId, database)
              console.log(notUpdated, '<== Array Despues de actualizar')
              break
            }
          }
        }
      }

      // const finalData = [
      //   {
      //     ...data[row],
      //     [date]:
      //       type === 'track'
      //         ? Number(dataView)
      //         : type === 'listeners'
      //         ? Number(dataView.monthlyListeners)
      //         : Number(dataView.followers)
      //   }
      // ]

      // await updateChecker(row, finalData[0], elementId, database)
    }
  }

  // while (notUpdated.length > 0) {}
}

export const getDetails = async (
  database: string,
  id: string
): Promise<any> => {
  const { data, error } = await supabase.from(database).select('*').eq('id', id)

  console.log(data, error)
  if (error) {
    return error
  }
  return data
}

export const dateToSave = async (): Promise<void> => {}

export default saveToDatabase
