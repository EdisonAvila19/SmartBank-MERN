import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute() {
  const { isAuthenticated, checkPath } = useAuth()

  console.log(window.location.pathname)
  checkPath(window.location.pathname)
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}