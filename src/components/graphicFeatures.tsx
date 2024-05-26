import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export const GraphicsFeatures = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false) // Estado para controlar la visibilidad de los elementos

  const graphicsRef = useRef<HTMLDivElement>(null) // Referencia al contenedor de características

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
    if (graphicsRef.current) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.2 // Umbral de visibilidad del elemento
      })
      observer.observe(graphicsRef.current) // Observar el elemento
      return () => {
        observer.disconnect() // Detener la observación cuando el componente se desmonta
      }
    }
  }, []) // Ejecutar solo una vez al montar el componente

  return (
    <section className='bg-gray-100 flex justify-center -mt-20'>
      <div className='container px-4 md:px-6'>
        <div
          ref={graphicsRef}
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
        >
          {isVisible && (
            <motion.div
              className='rounded-lg border bg-card text-card-foreground shadow-lg'
              data-v0-t='card'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                  <path d='M3 3v18h18' />
                  <path d='m19 9-5 5-4-4-3 3' />
                </svg>
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold'>
                  Gráficas Visuales para los Totales
                </h3>
                <p className='text-gray-500 dark:text-gray-400 mb-10'>
                  Contamos con gráficas visuales con las cuales puedes ver la
                  tendencia y el aumento de las reproduciones/Oyentes
                  Mensuales/Followers de Spotify
                </p>
                <img
                  src='/totalReproducciones.png'
                  alt='Reproducciones Totales'
                  width={500}
                  height={500}
                />
              </div>
            </motion.div>
          )}
          {isVisible && (
            <motion.div
              className='rounded-lg border bg-card text-card-foreground shadow-lg'
              data-v0-t='card'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                  Gráficas Visuales para las Variaciones
                </h3>
                <p className='text-gray-500 dark:text-gray-400 mb-10'>
                  Con nuestra gráficas visuales, puedes ver las variaciones
                  diarias tanto en las reproducciones de una canción, como en
                  Oyentes Mensuales y Seguidores
                </p>
                <img
                  src='/ReproduccionesDiarias.png'
                  alt='Reproducciones Diarias'
                  width={500}
                  height={500}
                />
              </div>
            </motion.div>
          )}
          {isVisible && (
            <motion.div
              className='rounded-lg border bg-card text-card-foreground shadow-lg'
              data-v0-t='card'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                <h3 className='text-xl font-bold'>Tabla Resumen</h3>
                <p className='text-gray-500 dark:text-gray-400 mb-10'>
                  Con nuestra tabla resumen puedes ver desglosado por dias tanto
                  las datos obtenidos cada dia como la variacion diaria,
                  teniendo asi una tabla con toda la información detallada
                </p>
                <img
                  src='https://i.imgur.com/HeRGKzo_d.webp?maxwidth=760&fidelity=grand'
                  alt='Tabla Resumen'
                  width={500}
                  height={500}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
