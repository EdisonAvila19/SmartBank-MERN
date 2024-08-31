import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function useCheckMenuOptions(path) {
  const { checkMenuOptions } = useAuth()

  useEffect(() => {
    checkMenuOptions(path)
  }, [])

  return null
}