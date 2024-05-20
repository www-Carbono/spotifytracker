import React from 'react'
export const Features = (): JSX.Element => {
  return (
    <section
      className='bg-gray-100  py-12 md:py-24 lg:py-32 flex justify-center'
      id='features'
    >
      <div className='container px-4 md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl mb-10'>
          Caracteristicas
        </h2>{' '}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div
            className='rounded-lg border bg-card text-card-foreground shadow-lg'
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
                <path d='M9 18V5l12-2v13' />
                <circle
                  cx='6'
                  cy='18'
                  r='3'
                />
                <circle
                  cx='18'
                  cy='16'
                  r='3'
                />
              </svg>
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-bold'>Trackeo de Canciones</h3>
              <p className='text-gray-500 '>
                Trackea las canciones que desees y observa su aumento diario
              </p>
            </div>
          </div>
          <div
            className='rounded-lg border bg-card text-card-foreground shadow-lg'
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
                <line
                  x1='12'
                  x2='12'
                  y1='20'
                  y2='10'
                />
                <line
                  x1='18'
                  x2='18'
                  y1='20'
                  y2='4'
                />
                <line
                  x1='6'
                  x2='6'
                  y1='20'
                  y2='16'
                />
              </svg>
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-bold'>
                Trackeo de Oyentes Mensuales
              </h3>
              <p className='text-gray-500 '>
                Utiliza nuestro servicio para trackear los oyentes mensuales de
                un tu artista favorito, con tablas para observar los cambios
                diarios en sus oyentes.
              </p>
            </div>
          </div>
          <div
            className='rounded-lg border bg-card text-card-foreground shadow-lg'
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
                <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
                <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
              </svg>
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-bold'>Trackeo de Followers</h3>
              <p className='text-gray-500'>
                Busca tu artista favorito y trackea las variaciones en followers
                diarios en spotify
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
