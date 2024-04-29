'use client'
import React, { useEffect, createContext, useState } from 'react'
import isUserLogged from '../server/services/isUserLogged'

export const UserContext = createContext(null)

interface Props {
  children: JSX.Element
}

export const IsUserLoggedContext = ({ children }: Props): JSX.Element => {
  const [userData, setUserData] = useState<any>()
  const getUserLogged = async (): Promise<void> => {
    const userLogged = await isUserLogged()
    setUserData(userLogged)
  }
  useEffect(() => {
    getUserLogged().catch((error: any) => {
      console.log(error)
    })
  }, [])
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
