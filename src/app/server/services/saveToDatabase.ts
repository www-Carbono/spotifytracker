'use server'
// Guardar Nuevas Canciones en la Base de Datos
import { createClient } from '@supabase/supabase-js'

const saveToDatabase = (): void => {
  console.log(process.env.SUPABASE_KEY)
  //   const supabaseUrl = process.env.SUPABASE_URL
  //   const supabaseKey = process.env.SUPABASE_KEY
  //   const supabase = createClient(supabaseUrl, supabaseKey)
}

export default saveToDatabase
