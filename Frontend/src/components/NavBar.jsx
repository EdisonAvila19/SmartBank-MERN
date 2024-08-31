import { useEffect, useState, useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { BurguerMenu, BurguerMenuClose, PerfilActivo } from './Icons'

export default function NavBar() {
  const { authLogout, menu }= useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const UserMenuRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const MenuRef = useRef(null)
  
  const handleLogout = () => authLogout()
  
  const handleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)
  const handleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (UserMenuRef.current && !UserMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
      if (MenuRef.current && !MenuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
   }, [])

  return (
    <>
      <nav className="relative w-screen px-2 mx-auto sm:px-6 lg:px-8 bg-root-navBar">
        <div className="flex justify-between h-16">
          {/* <!-- Icono Menu desplegable --> */}
          <div className="flex items-center">
            {/* <!-- Menu button--> */}
            <button type="button" className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={ handleMenu }>
              {
                isMenuOpen 
                  ? <BurguerMenuClose />
                  : <BurguerMenu />
              }
            </button>
          </div>
          {/* <!-- Notificaciones y User Icon --> */}
          <div className="flex items-center pr-2 ">
            {/* <!-- 🔔 --> */}
            {/* <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> */}
      
            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3" >
              <button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={ handleUserMenu }>
                <PerfilActivo />
              </button>
              {
                isUserMenuOpen && (
                  <div className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-root-navBar ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" ref={ UserMenuRef } tabIndex="-1">
                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a> */}
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" tabIndex="-1" id="user-menu-item-1">Settings</a> */}
                    <Link onClick={ handleLogout } className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white" role="menuitem" tabIndex="-1" id="user-menu-sign-out">Sign out</Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/* <!-- Dropdown menu, show/hide based on menu state.--> */}
        {
          isMenuOpen && (
            <button className="absolute left-0 rounded-br-lg z-10w-full bg-root-navBar sm:w-1/3 max-w-[250px] px-2 pt-2 pb-3 space-y-1" onClick={ handleMenu } ref={ MenuRef }>
                {
                  menu.map(({ index, label, url }) => {
                    return (
                      <Link key={index} to={url} className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md text-start hover:bg-gray-700 hover:text-white">{label}</Link>
                    )
                  })
                }
            </button>
          )
        }
      </nav>
      <Outlet />
    </>
  )
}
