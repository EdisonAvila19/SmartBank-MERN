import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const useAuth = useContext(AuthContext)
  if (useAuth === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return useAuth
}