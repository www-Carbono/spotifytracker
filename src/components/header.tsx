import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion' // Importamos Framer Motion para las animaciones
import WaveComponent from './Wave' // Importamos el componente Wave

export const Header = (): JSX.Element => {
  // Variante para animaciones de botones
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  }

  // Variante para animaciones de imágenes
  const imageVariants = {
    initial: {
      x: -50,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Animación inicial de entrada
      animate={{ opacity: 1, y: 0 }} // Animación al entrar en la pantalla
      exit={{ opacity: 0, y: -50 }} // Animación al salir de la pantalla
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      <section className='bg-gray-900 text-white py-1 md:py-5 lg:py-12 xl:py-20 flex justify-center'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
            <div className='flex flex-col justify-center space-y-4'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                  Trackea los Datos de Spotify de tu Artista Favorito
                </h1>
                <p className='max-w-[600px] text-gray-300 md:text-xl dark:text-gray-400'>
                  Obten información avanzada sobre las canciones, Oyentes
                  mensuales y Followers de tus artistas favoritos en Spotify con
                  gráficas visuales
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <motion.a
                  variants={buttonVariants}
                  whileHover='hover'
                  className='inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 text-sm font-medium text-white shadow transition-all hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50'
                  href='/register'
                >
                  Comenzar
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileHover='hover'
                  className='inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-300 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50'
                  href='#howTo'
                >
                  Aprender Más
                </motion.a>
              </div>
            </div>
            <motion.div
              variants={imageVariants}
              initial='initial'
              animate='animate'
              whileHover='hover'
            >
              <Image
                alt='Hero'
                className='mx-auto w-4/5 object-left'
                height={414}
                src={'/header.png'}
                width={400}
              />
            </motion.div>
          </div>
        </div>
      </section>
      <WaveComponent /> {/* Añadimos el componente Wave */}
    </motion.div>
  )
}
