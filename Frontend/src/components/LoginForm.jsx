/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

export default function LoginForm({ handleIsLogin }) {
  const { authLogin } = useAuth()
  const { register, handleSubmit, formState: { errors, isValid} } = useForm({ mode: 'onChange' })
  
  const handleToRegister = () => {
    handleIsLogin()
  }

  const onSubmit = handleSubmit(authLogin)

  return (  
      <form id="login" className="space-y-4" onSubmit={ onSubmit }>
        <input required type="text" placeholder="Nombre de usuario" autoComplete="username" className="w-full p-3 border"
          {...register('username', { required: true })}
        />
        {
          errors.username && <p className='text-red-500'>Nombre de usuario es requerido</p>
        }
        <input required type="password" id="passwordInput" placeholder="Contraseña" autoComplete="current-password" minLength="5" maxLength="10" className="w-full p-3 border rounded border-zinc-300" 
          {...register('password', { required: true, pattern: /^[a-z\d]{5,10}$/i })}
        />
        {
          errors.password && <p className='text-red-500'>Contraseña es requerida</p>
        }
        <div className="flex-col justify-between text-sm">
          <p className="text-center">
            ¿No tiene cuenta? <span id="registrarseBtn" onClick={handleToRegister} className="text-blue-600 hover:cursor-pointer">Registrarse</span>
          </p>
          <p className="text-center">
            <Link to='#' className="items-normal hover:text-blue-600">He perdido mi contraseña</Link>
          </p>
        </div>
        <button type="submit" disabled={!isValid} className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300">
          Ingresar
        </button>
      </form>
  )
}