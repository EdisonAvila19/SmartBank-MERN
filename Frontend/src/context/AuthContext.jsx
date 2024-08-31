/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import { loginRequest, logOutRequest, registerRequest, verifyTokenRequest } from '../api/auth'
import { menuOptions } from '../helpers/const'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [menu, setMenu] = useState([])
  const [path, setPath] = useState('/dashboard')

  const authLogin = async (user) => {
    console.log('login', user)
    try {
      const resp = await loginRequest(user)
      const data = await resp.json()
      if (resp.status !== 200) throw new Error(data.error)
      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error.message)
    }
  }

  const authRegister = async (user) => {
    console.log('register', user)
    try {
      const resp = await registerRequest(user)
      const data = await resp.json()
      if (resp.status !== 200) throw new Error(data.error)
      setUser(data)
      setIsAuthenticated(true)
      console.log(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const authLogout = async () => {
    console.log('logout')
    try {
      const resp = await logOutRequest()
      const data = await resp.json()
      if (resp.status !== 200) throw new Error(data.error)
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  const checkMenuOptions = (path) => {
    console.log('checkMenuOptions')
    if (!path) return
    setMenu(menuOptions[user.role].filter(item => item.url !== path))
  }

  const checkPath = (path) => {
    console.log('checkPath', path)
    setPath(path)
  }

  // CheckLogin
  const checkLogin = async () => {
    try {
      const resp = await verifyTokenRequest()
      const data = await resp.json()
      if (resp.status !== 200) throw new Error(data.error)
      console.log('checkLogin')
      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const currentPath = window.location.pathname === '/' ? '/dashboard' : window.location.pathname
    checkPath(currentPath)
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      menu,
      path,
      authLogin,
      authRegister,
      authLogout,
      checkLogin,
      checkMenuOptions,
    }}>
      {children}
    </AuthContext.Provider>
  )
}