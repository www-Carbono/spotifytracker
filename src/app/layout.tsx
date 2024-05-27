import React from 'react'
import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { IsUserLoggedContext } from './../context/isUserLogged'
import { TopBar } from '@/components/topbar'
import { GoogleAnalytics } from '@next/third-parties/google'
const pageFont = Archivo({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Spoti Tracker',
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
      <GoogleAnalytics gaId='G-D627LWYL4S' />
    </html>
  )
}

export default RootLayout
