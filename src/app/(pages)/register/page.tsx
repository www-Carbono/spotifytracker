'use client'
import React, { useState } from 'react'
import registerUser from '@/app/server/services/registerUser'

const Register = (): JSX.Element => {
  const [error, setError] = useState<boolean>()
  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const { username, email, password, passwordRepeat } = Object.fromEntries(
      new window.FormData(event.currentTarget)
    )
    if (password === passwordRepeat) {
      if (
        typeof email === 'string' &&
        typeof password === 'string' &&
        typeof username === 'string'
      ) {
        const data = { email, password, username }
        registerUser(data)
          .then((data) => {
            console.log(data)
            if (!data) {
              setError(true)
            } else if (data) {
              setError(false)
            }
          })
          .catch((_error) => {
            setError(false)
          })
      }
    }
  }
  return (
    <div>
      {error ? (
        <p className='text-center m-10'>
          El Correo introducido ya está siendo utilizado o has introducido algun
          dato erroneo.
        </p>
      ) : (
        ''
      )}
      <form
        action=''
        className='flex flex-col justify-center items-center mt-10 text-black'
        onSubmit={(event) => {
          onSubmit(event)
        }}
      >
        <label htmlFor='username'>Nombre de Usuario</label>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='John Doe'
        />
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
        <label htmlFor='passwordRepeat'>
          Vuelve a Introducir la contraseña:
        </label>
        <input
          type='password'
          name='passwordRepeat'
          id='passwordRepeat'
          placeholder='***************'
        />
        <button>Registrar</button>
      </form>
    </div>
  )
}

export default Register
