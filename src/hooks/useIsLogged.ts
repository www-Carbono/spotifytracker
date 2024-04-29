import { useContext } from 'react'
import { UserContext } from '../context/isUserLogged'
export const useIsLogged = (): any => {
  const userData = useContext(UserContext)
  return userData
}
