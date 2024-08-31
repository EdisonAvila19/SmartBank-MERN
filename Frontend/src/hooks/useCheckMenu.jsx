import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function useCheckMenuOptions(path) {
  const { checkMenuOptions } = useAuth()

  useEffect(() => {
    checkMenuOptions(path)
  }, [])

  return null
}