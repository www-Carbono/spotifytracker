'use server'
import { createClient } from '@supabase/supabase-js'

interface props {
  email: string
  password: string
  username: string
}
const registerUser = async ({
  email,
  password,
  username
}: props): Promise<boolean> => {
  console.log(email, password)
  const supabaseUrl = process.env.SUPABASE_URL ?? ''
  const supabaseKey = process.env.SUPABASE_KEY ?? ''

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username
      }
    }
  })
  console.log(data)
  if (error !== null) {
    return false
  } else {
    return true
  }
}

export default registerUser
