'use server'
// Guardar Nuevas Canciones en la Base de Datos
import { createClient } from '@supabase/supabase-js'
import { getViews } from './scraping'
import { type Track } from '@/app/types'

const saveToDatabase = async (data2: Track, userid: any): Promise<void> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
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
    songName: data2.name,
    artistName: data2.artists[0].name,
    coverLink: data2.album.images[0].url,
    songLink: data2.id,
    viewsTest: dataToUpload,
    userId: userid.id
  })

  console.log(error)
}

export default saveToDatabase
