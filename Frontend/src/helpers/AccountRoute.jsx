import { Outlet } from 'react-router-dom'
import { AccountProvider } from '../context/AccountContext'

export default function AccountRoute() {
  return (
    <AccountProvider>
      <Outlet />
    </AccountProvider>
  )
}