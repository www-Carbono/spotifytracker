'use client'
import { createClient } from '@supabase/supabase-js'

interface props {
  email: string
  password: string
}
const loginUser = async ({ email, password }: props): Promise<boolean> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error !== null) {
    return false
  } else {
    return true
  }
}

export default loginUser
