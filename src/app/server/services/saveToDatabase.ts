'use server'
// Guardar Nuevas Canciones en la Base de Datos
import { createClient } from '@supabase/supabase-js'
import { getViews } from './scraping'
import { type Track } from '@/app/types'

const saveToDatabase = async (data2: Track): Promise<void> => {
  const supabaseUrl = process.env.SUPABASE_URL ?? ''
  const supabaseKey = process.env.SUPABASE_KEY ?? ''
  const supabase = createClient(supabaseUrl, supabaseKey)

  const currentViews = await getViews(data2.id)
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const currentDate = `${month}/${day}`

  const dataToUpload = {
    [currentDate]: currentViews
  }

  const { error } = await supabase.from('spotifytracker').insert({
    songName: data2.album.name,
    artistName: data2.album.artists[0].name,
    coverLink: data2.album.images[0].url,
    songLink: data2.id,
    viewsTest: dataToUpload
  })

  console.log(error)
}

export default saveToDatabase
