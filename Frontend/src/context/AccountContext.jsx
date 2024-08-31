/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { getAccountsRequest } from '../api/account'

export const AccountContext = createContext()

export function AccountProvider({ children }) {
  const [Accounts, setAccounts] = useState([])

  const getAccounts = async () => {
    console.log('getAccounts')
    try {
      const resp = await getAccountsRequest()
      const data = await resp.json()
      if (resp.status !== 200) throw new Error(data.error)
      setAccounts(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AccountContext.Provider value={{
      Accounts,
      getAccounts
    }}>
      { children }
    </AccountContext.Provider>
  )
}