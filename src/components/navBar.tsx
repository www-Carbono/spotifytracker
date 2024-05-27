import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Stats } from './stats'

export const NavBar = (userData: any): JSX.Element => {
  const infoData = {
    canciones: 'canciones',
    oyentes: 'oyentes',
    seguidores: 'seguidores'
  }
  const [component, setComponent] = useState<JSX.Element>(
    <Stats
      type={infoData.canciones}
      database='spotifytracker'
      userData={userData}
    />
  )
  const [selected, setSelected] = useState<number>(1)

  const changeComponent = (component: JSX.Element): void => {
    setComponent(component)
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1 bg-gray-100 '>
        <div className='max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12'>
          <div className='flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-8'>
            <motion.div
              className='bg-white rounded-lg shadow-lg md:w-[460px]'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='p-4'>
                <h2 className='text-2xl font-bold mb-4 pt-4'>Dashboard</h2>
                <nav className='space-y-2'>
                  <li
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer ${
                      selected === 1 ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      changeComponent(
                        <Stats
                          type={infoData.canciones}
                          database='spotifytracker'
                          userData={userData}
                        />
                      )
                      setSelected(1)
                    }}
                  >
                    <svg
                      className='h-5 w-5'
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
                    Trackear Canción
                  </li>
                  <li
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer${
                      selected === 2 ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      changeComponent(
                        <Stats
                          type={infoData.oyentes}
                          database='monthlylistenerstracker'
                          userData={userData}
                        />
                      )
                      setSelected(2)
                    }}
                  >
                    <svg
                      className='h-5 w-5'
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
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle
                        cx='9'
                        cy='7'
                        r='4'
                      />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                    Trackear Oyentes Mensuales
                  </li>
                  <li
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer ${
                      selected === 3 ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      changeComponent(
                        <Stats
                          type={infoData.seguidores}
                          database='followerstracker'
                          userData={userData}
                        />
                      )
                      setSelected(3)
                    }}
                  >
                    <svg
                      className='h-5 w-5'
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
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle
                        cx='9'
                        cy='7'
                        r='4'
                      />
                      <line
                        x1='19'
                        x2='19'
                        y1='8'
                        y2='14'
                      />
                      <line
                        x1='22'
                        x2='16'
                        y1='11'
                        y2='11'
                      />
                    </svg>
                    Trackear Seguidores
                  </li>
                </nav>
              </div>
            </motion.div>
            <motion.div
              className='mx-auto w-[100%] h-9'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {component}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
