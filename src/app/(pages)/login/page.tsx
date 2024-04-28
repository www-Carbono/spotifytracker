'use client'
import React, { useState, useContext } from 'react'
import loginUser from '@/app/server/services/loginUser'
import { UserContext } from '@/app/context/isUserLogged'

const Login = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false)
  const userData = useContext(UserContext)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const { email, password } = Object.fromEntries(
      new window.FormData(event.currentTarget)
    )

    if (typeof email === 'string' && typeof password === 'string') {
      const data = { email, password }
      loginUser(data)
        .then((data) => {
          if (!data) {
            setError(true)
          } else if (data) {
            setError(false)
            window.location.href = '/dashboard'
          }
        })
        .catch((_error) => {
          setError(false)
        })
    }
  }
  return (
    <div>
      {error ? (
        <p className='text-center m-10'>Usuario o Contraseña Incorrectos</p>
      ) : (
        ''
      )}
      {userData ? (
        window && (window.location.href = '/dashboard')
      ) : (
        <div>
          {userData !== null ? (
            'Cargando...'
          ) : (
            <form
              action=''
              className='flex flex-col justify-center items-center mt-10 text-black'
              onSubmit={(event) => {
                onSubmit(event)
              }}
            >
              <label htmlFor='email'>Correo Electronico</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Johndoe@gmail.com'
              />
              <label htmlFor='password'>Contraseña:</label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='***************'
              />
              <button>Iniciar Sesion</button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default Login
