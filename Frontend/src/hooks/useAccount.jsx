import { useContext } from 'react'
import { AccountContext } from '../context/AccountContext'

export const useAccount = () => {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount debe usarse dentro de un AccountProvider')
  }
  return context
}