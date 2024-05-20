import React, { useState } from 'react'
export const Faqs = (): JSX.Element => {
  const [faqSelected, setFaqSelected] = useState<number>(0)
  return (
    <section
      className='bg-gray-100 py-12 md:py-24 lg:py-32 flex justify-center'
      id='faq'
    >
      <div className='container px-4 md:px-6'>
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Preguntas Frecuentes
          </h2>
          <div data-orientation='vertical'>
            <div
              className='border-b'
              data-orientation='vertical'
              data-state='closed'
            >
              <h3
                className='flex'
                data-orientation='vertical'
                data-state='closed'
              >
                <button
                  aria-controls='radix-:r4o:'
                  aria-expanded='false'
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  data-orientation='vertical'
                  data-radix-collection-item=''
                  data-state='closed'
                  id='radix-:r4n:'
                  type='button'
                  onClick={() => {
                    setFaqSelected(1)
                    if (faqSelected === 1) {
                      setFaqSelected(0)
                    }
                  }}
                >
                  ¿Que es Spoti Insights?
                  <svg
                    className='h-4 w-4 shrink-0 transition-transform duration-200'
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
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>
              </h3>
              <div
                aria-labelledby='radix-:r4n:'
                className='overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                data-orientation='vertical'
                data-state='closed'
                hidden
                id='radix-:r4o:'
                role='region'
              />
              {faqSelected === 1 && (
                <p className='p-5'>
                  Spoti Insights es una aplicación web con la que podrás
                  gestionar y trackear tanto las visualizaciones de las
                  canciones como los oyentes mensuales y los Followers en
                  Spotify de tus artistas favoritos, obteniendo gráficas
                  visuales y tablas para ver el comportamiento de sus perfiles
                  de spotify{' '}
                </p>
              )}
            </div>
            <div
              className='border-b'
              data-orientation='vertical'
              data-state='closed'
            >
              <h3
                className='flex'
                data-orientation='vertical'
                data-state='closed'
              >
                <button
                  aria-controls='radix-:r4q:'
                  aria-expanded='false'
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  data-orientation='vertical'
                  data-radix-collection-item=''
                  data-state='closed'
                  id='radix-:r4p:'
                  type='button'
                  onClick={() => {
                    setFaqSelected(2)
                    if (faqSelected === 2) {
                      setFaqSelected(0)
                    }
                  }}
                >
                  ¿Como Funciona Spoti Insights?
                  <svg
                    className='h-4 w-4 shrink-0 transition-transform duration-200'
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
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>
              </h3>
              <div
                aria-labelledby='radix-:r4p:'
                className='overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                data-orientation='vertical'
                data-state='closed'
                hidden
                id='radix-:r4q:'
                role='region'
              />
              {faqSelected === 2 && (
                <p className='p-5'>
                  Para Utilizar Spoti Insights solo tienes que registrarte o
                  Iniciar sesión, después, con la sesión iniciada desde la
                  dashboard solo tienes que seleccionar en el manu lateral de la
                  izquierda la opción deseada, y después solo tienes que empezar
                  a trackear la información deseada.
                </p>
              )}
            </div>
            <div
              className='border-b'
              data-orientation='vertical'
              data-state='closed'
            >
              <h3
                className='flex'
                data-orientation='vertical'
                data-state='closed'
              >
                <button
                  aria-controls='radix-:r4s:'
                  aria-expanded='false'
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  data-orientation='vertical'
                  data-radix-collection-item=''
                  data-state='closed'
                  id='radix-:r4r:'
                  type='button'
                  onClick={() => {
                    setFaqSelected(3)
                    if (faqSelected === 3) {
                      setFaqSelected(0)
                    }
                  }}
                >
                  ¿Es Spoti Insights gratis?
                  <svg
                    className='h-4 w-4 shrink-0 transition-transform duration-200'
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
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>
              </h3>
              <div
                aria-labelledby='radix-:r4r:'
                className='overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                data-orientation='vertical'
                data-state='closed'
                hidden
                id='radix-:r4s:'
                role='region'
              />
              {faqSelected === 3 && (
                <p className='p-5'>
                  Si, Spoti Insights es totalmente gratis y siempre lo será.
                </p>
              )}
            </div>
            <div
              className='border-b'
              data-orientation='vertical'
              data-state='closed'
            >
              <h3
                className='flex'
                data-orientation='vertical'
                data-state='closed'
              >
                <button
                  aria-controls='radix-:r4u:'
                  aria-expanded='false'
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  data-orientation='vertical'
                  data-radix-collection-item=''
                  data-state='closed'
                  id='radix-:r4t:'
                  type='button'
                  onClick={() => {
                    setFaqSelected(4)
                    if (faqSelected === 4) {
                      setFaqSelected(0)
                    }
                  }}
                >
                  ¿Cuando Se Actualizan los Datos?
                  <svg
                    className='h-4 w-4 shrink-0 transition-transform duration-200'
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
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>
              </h3>
              <div
                aria-labelledby='radix-:r4t:'
                className='overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                data-orientation='vertical'
                data-state='closed'
                hidden
                id='radix-:r4u:'
                role='region'
              />
              {faqSelected === 4 && (
                <p className='p-5'>
                  Los Datos se actualizan todos los dias a la vez que se
                  actualiza spotify. Desde el dashboard puedes ver si los datos
                  están actualizados al dia actual o no. (Es posible que a veces
                  ponga que este actualizado y tarde un poco más en actualizar)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
