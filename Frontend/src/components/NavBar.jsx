import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function NavBar() {
  const { authLogout }= useAuth()
  
  const handleLogout = () => {
    authLogout()
  }
  
  return (
    <>
      <nav className='px-10 py-5 bg-zinc-700'>
        <ul className='flex items-center justify-between'>
          <li><Link className='text-white' to='/'>Home</Link></li>
          <li><Link className='text-white' to='/dashboard'>Dashboard</Link></li>
          <li><Link className='text-white' to='/transactions/1'>Transactions</Link></li>
          <li><Link className='text-white' to='/new-account'>New Account</Link></li>
          <li><Link className='text-white' to='/new-transaction'>New Transaction</Link></li>
          <li><Link className='text-white' to='/' onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
