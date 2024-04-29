'use server'
// Guardar Nuevas Canciones en la Base de Datos
import { createClient } from '@supabase/supabase-js'
import { getViews } from './scraping'
const saveToDatabase = async (
  data2: any,
  userid: any,
  type: string
): Promise<void> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
  const supabase = createClient(supabaseUrl, supabaseKey)

  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const currentDate = `${month}/${day}`

  if (type === 'track') {
    const currentViews = await getViews(data2.id as string, 'track')
    const dataToUpload = {
      [currentDate]: currentViews
    }
    const { error } = await supabase.from('spotifytracker').insert({
      songName: data2.name,
      artistName: data2.artists[0].name,
      coverLink: data2.album.images[0].url,
      songLink: data2.id,
      viewsTest: dataToUpload,
      userId: userid.id
    })
    console.log(error)
  } else {
    // const { data, error } = await supabase.rpc('testing')

    const MonthlyListeners = await getViews(data2.id as string, 'artist')
    const dataToUpload = {
      [currentDate]: MonthlyListeners.monthlyListeners
    }
    const { error } = await supabase.from('monthlylistenerstracker').insert({
      artistname: data2.name,
      coverlink: data2.images[0].url,
      songlink: data2.id,
      monthlylisteners: dataToUpload,
      userid: userid.id
    })
    console.log(error)
  }
}

export default saveToDatabase
