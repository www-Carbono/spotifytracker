import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export const Features = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false) // Estado para controlar la visibilidad de los elementos

  // Variante para las animaciones de entrada
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  }

  const featuresRef = useRef<HTMLDivElement>(null) // Referencia al contenedor de características

  // Función para manejar la intersección con el viewport
  const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true) // Si el elemento es visible, establece isVisible en true
      }
    })
  }

  // Configuración del IntersectionObserver
  useEffect(() => {
    if (featuresRef.current) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.2
      })
      observer.observe(featuresRef.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <section
      className='bg-gray-100  py-12 md:py-24 lg:py-32 flex justify-center'
      id='features'
    >
      <div className='container px-4 md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl mb-10'>
          Caracteristicas
        </h2>
        <div
          ref={featuresRef}
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        >
          {isVisible && (
            <motion.div
              variants={itemVariants}
              className='rounded-lg border bg-card text-card-foreground shadow-lg'
              data-v0-t='card'
              initial='hidden'
              animate='visible'
            >
              <div className='flex flex-col space-y-1.5 p-6 pb-4'>
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
              <div className='p-6 pt-0'>
                <h3 className='text-xl font-bold'>Trackeo de Canciones</h3>
                <p className='text-gray-500'>
                  Trackea las canciones que desees y observa su aumento diario
                </p>
              </div>
            </motion.div>
          )}
          {isVisible && (
            <motion.div
              variants={itemVariants}
              className='rounded-lg border bg-card text-card-foreground shadow-lg'
              data-v0-t='card'
              initial='hidden'
              animate='visible'
            >
              <div className='flex flex-col space-y-1.5 p-6 pb-4'>
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
              <div className='p-6 pt-0'>
                <h3 className='text-xl font-bold'>
                  Trackeo de Oyentes Mensuales
                </h3>
                <p className='text-gray-500'>
                  Utiliza nuestro servicio para trackear los oyentes mensuales
                  de un tu artista favorito, con tablas para observar los
                  cambios diarios en sus oyentes.
                </p>
              </div>
            </motion.div>
          )}
          {isVisible && (
            <motion.div
              variants={itemVariants}
              className='rounded-lg border bg-card text-card-foreground shadow-lg'
              data-v0-t='card'
              initial='hidden'
              animate='visible'
            >
              <div className='flex flex-col space-y-1.5 p-6 pb-4'>
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
              <div className='p-6 pt-0'>
                <h3 className='text-xl font-bold'>Trackeo de Followers</h3>
                <p className='text-gray-500'>
                  Busca tu artista favorito y trackea las variaciones en
                  followers diarios en spotify
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
