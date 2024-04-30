'use client'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)
const isUserLogged = async (): Promise<any> => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return user
}

export const logout = async (): Promise<void> => {
  const { data, error } = await supabase.auth.signOut()
  return data
}

export default isUserLogged
