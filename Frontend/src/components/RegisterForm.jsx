/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

export default function RegisterForm({ handleIsLogin }) {
  const { authRegister } = useAuth()
  const {register, handleSubmit, watch, formState: { errors, isValid} } = useForm({ mode: 'onChange' })

  const password = watch('password')
  
  const handleToLogin = () => {
    handleIsLogin()
  }

  const onSubmit = handleSubmit(authRegister)

  return (
      <form id="signup" className="space-y-4" onSubmit={ onSubmit }>
        <input required type="text" placeholder="Nombre de usuario" className="w-full p-3 border" 
          {...register('username', { required: true })}
        />
        { errors.nombre && <p className='text-red-500'>El nombre es requerido</p> }
        
        <input required type="date" placeholder="" id="regNac" className="w-full p-3 border " 
          {...register('birthdate', { required: true, validate: (value) => {
            const currentDate = new Date()
            const date = new Date(value)
            return currentDate.getFullYear() - date.getFullYear() >= 18 ? true : 'Debes ser mayor de edad'
          } })}
        />
        { errors.fechaNacimiento && <p className='text-red-500'>{errors.fechaNacimiento.message}</p> }
        
        <input required type="email" placeholder="Email" autoComplete="email" className="w-full p-3 border" 
          {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/i })}
        />
        { errors.correo && <p className='text-red-500'>Un correo valido es requerido</p> }
        
        <input required type="password" placeholder="Contraseña" minLength="5" maxLength="10" autoComplete="current-password" className="w-full p-3 border " 
          {...register('password', { required: true, pattern: {
            value: /^[a-z\d]{5,10}$/i,
            message: 'La contraseña debe contener al menos 5 caracteres.'
          }})}
        />
        { errors.password && <p className='text-red-500'>{errors.password.message}</p> }
        
        <input required type="password" placeholder="Confirmar contraseña" minLength="5" maxLength="10" autoComplete="current-password" className="w-full p-3 border " 
          {...register('passw2', { required: true, validate: (value) => value === password || 'Las contraseñas no coinciden'})}
        />
        { errors.passw2 && <p className='text-red-500'>{errors.passw2.message}</p> }
        
        <label htmlFor="agree" className="block">
          <input required type="checkbox" id="agree" 
            {...register('agree', { required: true })}
          /> Acepto términos y condiciones 
        </label>
        <div className="flex-col justify-between text-sm">
          <span className="text-center">Ya tengo cuenta <a onClick={handleToLogin} className="text-blue-600 hover:cursor-pointer">Ingresa</a></span> 
        </div>
        <button type="submit" className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300" disabled={!isValid}>Registrarse</button>
      </form>
  )
}