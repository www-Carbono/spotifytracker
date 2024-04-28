'use client'
import { createClient } from '@supabase/supabase-js'
const isUserLogged = async (): Promise<any> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''

  const supabase = createClient(supabaseUrl, supabaseKey)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return user
}

export default isUserLogged
