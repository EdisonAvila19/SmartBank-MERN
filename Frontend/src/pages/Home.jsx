import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { CallCenterLogo, SeguridadLogo, SistemaLogo, UsuariosLogo } from '../components/Icons'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const { isAuthenticated, path } = useAuth()
  const navigate =useNavigate()

  const handleIsLogin = () => {
    setIsLogin(!isLogin)
  }

  useEffect(() => {
    console.log('HOME')
    if (isAuthenticated) navigate(path)
  }, [isAuthenticated])

  return (
    <main className='flex flex-wrap items-center justify-center w-screen min-h-full mx-auto my-auto lg:flex-nowrap lg:gap-5 lg:px-5 xl:max-w-7xl'>
      <section className='flex flex-col items-center justify-center w-11/12 m-1 align-middle md:flex-row sm:w-3/4 md:w-1/2 mas-w-6xl'>
        <div className="w-11/12 p-2 m-2 md:w-full sm:max-w-96">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Bienvenido a <br /> <span className="text-blue-600">SmartBank</span>
          </h2>
          {
            isLogin 
              ? <LoginForm handleIsLogin={handleIsLogin} /> 
              : <RegisterForm handleIsLogin={handleIsLogin} />
          }
        </div>
      </section>
      <section className='w-11/12  md:w-[700px] lg:w-1/2 hidden sm:block mt-8 md:mt-0'>
        <div className='flex flex-col justify-center p-8'>
          <h1 className='mb-4 text-4xl font-bold'>
            Tu
            <span className='text-blue-600'> seguridad</span>
            , <br />
            nuestro compromiso.
          </h1>
          <p className='mb-8 text-zinc-700'>
            Toda tu información respaldada por la mejor tecnología en seguridad informática y con la calidad humana que nos caracteriza.
          </p>
          <div className='flex justify-between space-x-8'>
            <CallCenterLogo />
            <SistemaLogo />
            <SeguridadLogo />
            <UsuariosLogo />
          </div>
        </div>
      </section>
    </main>
  )
}