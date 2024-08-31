/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, logOutRequest, registerRequest, verifyTokenRequest } from '../api/auth'
import { menuOptions } from '../helpers/const'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [menu, setMenu] = useState([])

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

  // CheckLogin
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const resp = await verifyTokenRequest()
        const data = await resp.json()
        if (resp.status !== 200) throw new Error(data.error)
        setUser(data)
        setIsAuthenticated(true)
        checkMenuOptions()
      } catch (error) {
        console.error(error.message)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      menu,
      authLogin,
      authRegister,
      authLogout,
      checkMenuOptions
    }}>
      {children}
    </AuthContext.Provider>
  )
}