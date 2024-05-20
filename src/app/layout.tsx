import React from 'react'
import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { IsUserLoggedContext } from './../context/isUserLogged'
import { TopBar } from '@/components/topbar'
const pageFont = Archivo({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Spoti Insights',
  description: 'Trackea los datos en Spotify de tus artistas Favoritos'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <html lang='es'>
      <head>
        <link
          rel='icon'
          href='/favicon.svg'
        />
      </head>
      <IsUserLoggedContext>
        <body className={pageFont.className}>
          <TopBar />
          {children}
        </body>
      </IsUserLoggedContext>
    </html>
  )
}

export default RootLayout
