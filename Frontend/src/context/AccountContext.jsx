/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { createAccountRequest, getAccountsRequest } from '../api/account'
import { createTransactionRequest } from '../api/transaction'

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

  const createAccount = async (account) => {
    console.log('createAccount', account)
    try {
      const resp = await createAccountRequest(account)
      const data = await resp.json()
      // console.log(data)
      if (resp.status !== 200) throw data
      return resp.status
    } catch (error) {
      return error
    }
  }

  const createTransaction = async (transaction) => {
    console.log('createTransaction', transaction)
    try {
      const resp = await createTransactionRequest(transaction)
      const data = await resp.json()
      if (resp.status !== 200) throw data
      return resp.status
    } catch (error) {
      return error
    }
  }

  return (
    <AccountContext.Provider value={{
      Accounts,
      getAccounts,
      createAccount,
      createTransaction
    }}>
      { children }
    </AccountContext.Provider>
  )
}