import Link from 'next/link'
import React from 'react'
export const HowTo = (): JSX.Element => {
  return (
    <section
      className='bg-gray-100  py-12 md:py-24 lg:py-32 flex justify-center'
      id='howTo'
    >
      <div className='container px-4 md:px-6'>
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Como empezar a trackear los datos de mi artista favorito
          </h2>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <div
              className='rounded-lg border bg-card text-card-foreground shadow-sm'
              data-v0-t='card'
            >
              <div className='flex flex-col space-y-1.5 p-6'>
                <svg
                  className='h-8 w-8 text-green-500'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
                  <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
                </svg>
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold'>
                  1. Registrate o Inicia sesión con tu cuenta
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Lo Primero que debes hacer es crearte una cuenta para obtener
                  el acceso a la aplicación y, en caso de que ya estés
                  registrado debes iniciar sesión
                </p>
                <div className='mt-4 flex justify-center'>
                  <Link
                    href='/register'
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
                  >
                    Crear Cuenta
                  </Link>
                  <Link
                    href='/login'
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
                  >
                    Iniciar Sesion
                  </Link>
                </div>
              </div>
            </div>
            <div
              className='rounded-lg border bg-card text-card-foreground shadow-sm'
              data-v0-t='card'
            >
              <div className='flex flex-col space-y-1.5 p-6'>
                <svg
                  className='h-8 w-8 text-green-500'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M21.21 15.89A10 10 0 1 1 8 2.83' />
                  <path d='M22 12A10 10 0 0 0 12 2v10z' />
                </svg>
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold'>
                  2. Registra la canción o el Artista a trackear
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Una vez en el dashboard, utiliza el panel de la izquierda para
                  seleccionar lo que quieres trackear, una vez seleccionado,
                  busca la cancion o el artista a trackear haciendo click arriba
                  a la derecha
                </p>
                <div className='mt-4'>
                  <Link
                    className='text-green-500 hover:underline'
                    href='/dashboard'
                  >
                    Ir al Dashboard
                  </Link>
                </div>
              </div>
            </div>
            <div
              className='rounded-lg border bg-card text-card-foreground shadow-sm'
              data-v0-t='card'
            >
              <div className='flex flex-col space-y-1.5 p-6'>
                <svg
                  className='h-8 w-8 text-green-500'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 20h.01' />
                  <path d='M7 20v-4' />
                  <path d='M12 20v-8' />
                  <path d='M17 20V8' />
                  <path d='M22 4v16' />
                </svg>
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold'>
                  3. ¡Ya estás trackeando los datos de tu Artista Favorito!
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  Una vez has buscado y seleccionado la canción o el artista a
                  trackear, ya solo queda esperar a que cada dia Spotify se
                  actualice y podrás ver todas las estadisticas de tu artista
                  favorito en Spotify sin hacer nada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
