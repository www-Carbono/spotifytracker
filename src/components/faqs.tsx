import React, { useState } from 'react'
import { motion } from 'framer-motion'

export const Faqs = (): JSX.Element => {
  const [faqSelected, setFaqSelected] = useState<number>(0)

  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 }
  }

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
              key={1}
              className='border-b'
            >
              <h3 className='flex'>
                <button
                  aria-controls={`radix-:r4o-${1}`}
                  aria-expanded={faqSelected === 1 ? 'true' : 'false'}
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  onClick={() => {
                    setFaqSelected((prevIndex) => (prevIndex === 1 ? 0 : 1))
                  }}
                >
                  ¿Que es Spoti Stats?
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
              <motion.div
                id={`radix-:r4o-${1}`}
                variants={variants}
                initial='closed'
                animate={faqSelected === 1 ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
                className='overflow-hidden text-sm'
              >
                <p className='p-5'>
                  Spoti Stats es una aplicación web con la que podrás gestionar
                  y trackear tanto las visualizaciones de las canciones como los
                  oyentes mensuales y los Followers en Spotify de tus artistas
                  favoritos, obteniendo gráficas visuales y tablas para ver el
                  comportamiento de sus perfiles de Spotify.
                </p>
              </motion.div>
            </div>
            <div
              key={2}
              className='border-b'
            >
              <h3 className='flex'>
                <button
                  aria-controls={`radix-:r4o-${2}`}
                  aria-expanded={faqSelected === 2 ? 'true' : 'false'}
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  onClick={() => {
                    setFaqSelected((prevIndex) => (prevIndex === 2 ? 0 : 2))
                  }}
                >
                  ¿Como Funciona Spoti Stats?
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
              <motion.div
                id={`radix-:r4o-${2}`}
                variants={variants}
                initial='closed'
                animate={faqSelected === 2 ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
                className='overflow-hidden text-sm'
              >
                <p className='p-5'>
                  Para utilizar Spoti Stats solo tienes que registrarte o
                  iniciar sesión. Después, con la sesión iniciada desde el
                  dashboard, solo tienes que seleccionar en el menú lateral de
                  la izquierda la opción deseada, y después solo tienes que
                  empezar a trackear la información deseada.
                </p>
              </motion.div>
            </div>
            <div
              key={3}
              className='border-b'
            >
              <h3 className='flex'>
                <button
                  aria-controls={`radix-:r4o-${3}`}
                  aria-expanded={faqSelected === 3 ? 'true' : 'false'}
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  onClick={() => {
                    setFaqSelected((prevIndex) => (prevIndex === 3 ? 0 : 3))
                  }}
                >
                  ¿Es Spoti Stats gratis?
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
              <motion.div
                id={`radix-:r4o-${3}`}
                variants={variants}
                initial='closed'
                animate={faqSelected === 3 ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
                className='overflow-hidden text-sm'
              >
                <p className='p-5'>
                  Sí, Spoti Stats es totalmente gratis y siempre lo será.
                </p>
              </motion.div>
            </div>
            <div
              key={4}
              className='border-b'
            >
              <h3 className='flex'>
                <button
                  aria-controls={`radix-:r4o-${4}`}
                  aria-expanded={faqSelected === 4 ? 'true' : 'false'}
                  className='flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-lg font-medium'
                  onClick={() => {
                    setFaqSelected((prevIndex) => (prevIndex === 4 ? 0 : 4))
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
              <motion.div
                id={`radix-:r4o-${4}`}
                variants={variants}
                initial='closed'
                animate={faqSelected === 4 ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
                className='overflow-hidden text-sm'
              >
                <p className='p-5'>
                  Los datos se actualizan todos los días a la vez que se
                  actualiza Spotify. Desde el dashboard puedes ver si los datos
                  están actualizados al día actual o no. (Es posible que a veces
                  ponga que esté actualizado y tarde un poco más en actualizar).
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
