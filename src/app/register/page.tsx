'use client'
import React, { useState } from 'react'
import registerUser from '@/server/services/registerUser'
import { useIsLogged } from '@/hooks/useIsLogged'
import { Loader } from '@/components/Loader'
import { PopUp } from '@/components/popup'

const Register = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false)
  const userData = useIsLogged()
  const [loading, setLoading] = useState<boolean>(false)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    setLoading(true)
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
            if (!data) {
              setError(true)
              setLoading(false)
            } else if (data) {
              setError(false)
              setLoading(false)
              window.location.href = '/dashboard'
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
      {userData ? (
        window && (window.location.href = '/dashboard')
      ) : (
        <div className='flex flex-col min-h-[100dvh]'>
          <div className='flex-1 flex items-center justify-center'>
            <div className='w-full max-w-md px-4 md:px-0'>
              <div
                className='rounded-lg border bg-card text-card-foreground shadow-lg'
                data-v0-t='card'
              >
                {userData !== null ? (
                  <div className='flex items-center justify-center'>
                    <Loader />
                  </div>
                ) : (
                  <form
                    action=''
                    className='flex flex-col space-y-1.5 p-6'
                    onSubmit={(event) => {
                      onSubmit(event)
                    }}
                  >
                    <h3 className='whitespace-nowrap font-semibold tracking-tight text-2xl'>
                      Registrarse
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      Create una cuenta en Spoti Insights account para acceder
                      al Dashboard.
                    </p>
                    {error ? (
                      <div className='text-center mt-10 pt-5 -mb-4'>
                        <PopUp type='error'>
                          El Correo introducido ya está siendo utilizado o has
                          introducido algún dato erróneo.{' '}
                        </PopUp>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className='p-6 space-y-4'>
                      <div className='space-y-2'>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
                          htmlFor='username'
                        >
                          Usuario
                        </label>
                        <input
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                          id='username'
                          name='username'
                          placeholder='Camila Cabello Updates'
                          required
                          type='text'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
                          htmlFor='email'
                        >
                          Email
                        </label>
                        <input
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                          id='email'
                          name='email'
                          placeholder='m@example.com'
                          required
                          type='email'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
                          htmlFor='password'
                        >
                          Contraseña
                        </label>
                        <input
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                          id='password'
                          name='password'
                          required
                          type='password'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
                          htmlFor='confirmPassword'
                        >
                          Confirmar Contraseña
                        </label>
                        <input
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                          id='confirmPassword'
                          name='passwordRepeat'
                          required
                          type='password'
                        />
                      </div>
                    </div>
                    <div className='flex items-center p-6'>
                      <button className='bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'>
                        Registrarse
                      </button>
                      {loading && <Loader />}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
  // return (
  //   <div className='flex flex-col min-h-[100dvh]'>
  //     <div className='flex-1 flex items-center justify-center'>
  //       <div className='w-full max-w-md px-4 md:px-0'>
  //         <div
  //           className='rounded-lg border bg-card text-card-foreground shadow-sm'
  //           data-v0-t='card'
  //         >
  //           <div className='flex flex-col space-y-1.5 p-6'>
  //             <h3 className='whitespace-nowrap font-semibold tracking-tight text-2xl'>
  //               Register
  //             </h3>
  //             <p className='text-sm text-muted-foreground'>
  //               Create a new Spotify Insights account to access your data
  //               insights.
  //             </p>
  //           </div>
  //           <div className='p-6 space-y-4'>
  //             <div className='space-y-2'>
  //               <label
  //                 className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
  //                 htmlFor='name'
  //               >
  //                 Usuario
  //               </label>
  //               <input
  //                 className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  //                 id='username'
  //                 placeholder='Camila Cabello Updates'
  //                 required
  //                 type='text'
  //               />
  //             </div>
  //             <div className='space-y-2'>
  //               <label
  //                 className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
  //                 htmlFor='email'
  //               >
  //                 Email
  //               </label>
  //               <input
  //                 className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  //                 id='email'
  //                 placeholder='m@example.com'
  //                 required
  //                 type='email'
  //               />
  //             </div>
  //             <div className='space-y-2'>
  //               <label
  //                 className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
  //                 htmlFor='password'
  //               >
  //                 Password
  //               </label>
  //               <input
  //                 className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  //                 id='password'
  //                 required
  //                 type='password'
  //               />
  //             </div>
  //             <div className='space-y-2'>
  //               <label
  //                 className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
  //                 htmlFor='confirmPassword'
  //               >
  //                 Confirm Password
  //               </label>
  //               <input
  //                 className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  //                 id='confirmPassword'
  //                 required
  //                 type='password'
  //               />
  //             </div>
  //           </div>
  //           <div className='flex items-center p-6'>
  //             <button className='bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'>
  //               Register
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

  // return (
  //   <div>
  //     {error ? (
  //       <p className='text-center m-10'>
  //         El Correo introducido ya está siendo utilizado o has introducido algun
  //         dato erroneo.
  //       </p>
  //     ) : (
  //       ''
  //     )}
  //     {userData ? (
  //       window && (window.location.href = '/dashboard')
  //     ) : (
  //       <div>
  //         {userData !== null ? (
  //           <div className='flex items-center justify-center'>
  //             <Loader />
  //           </div>
  //         ) : (
  //           <form
  //             action=''
  //             className='flex flex-col justify-center items-center mt-10 text-black'
  //             onSubmit={(event) => {
  //               onSubmit(event)
  //             }}
  //           >
  //             <label htmlFor='username'>Nombre de Usuario</label>
  //             <input
  //               type='text'
  //               name='username'
  //               id='username'
  //               placeholder='John Doe'
  //             />
  //             <label htmlFor='email'>Correo Electronico</label>
  //             <input
  //               type='email'
  //               name='email'
  //               id='email'
  //               placeholder='Johndoe@gmail.com'
  //             />
  //             <label htmlFor='password'>Contraseña:</label>
  //             <input
  //               type='password'
  //               name='password'
  //               id='password'
  //               placeholder='***************'
  //             />
  //             <label htmlFor='passwordRepeat'>
  //               Vuelve a Introducir la contraseña:
  //             </label>
  //             <input
  //               type='password'
  //               name='passwordRepeat'
  //               id='passwordRepeat'
  //               placeholder='***************'
  //             />
  //             <button>Registrar</button>
  //           </form>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // )
}

export default Register
