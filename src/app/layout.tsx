import React from 'react'
import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { IsUserLoggedContext } from './../context/isUserLogged'
import { TopBar } from '@/components/topbar'
const pageFont = Archivo({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <html lang='es'>
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
