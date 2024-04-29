'use client'
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
  // const router = useRouter()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username
      }
    }
  })
  if (error !== null) {
    console.log(error)
    return false
  } else {
    // router.push('/dashboard')
    return true
  }
}

export default registerUser
