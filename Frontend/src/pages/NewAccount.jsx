import { useNavigate } from 'react-router-dom'

import useCheckMenuOptions from '../hooks/useCheckMenu'
import { useAccount } from '../hooks/useAccount'

export default function NewAccount() {
  const navigate = useNavigate()
  const { createAccount } = useAccount()
  useCheckMenuOptions(window.location.pathname)

  console.log('NewAccount')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    const formData = Object.fromEntries(new FormData(e.target))
    const resp = await createAccount(formData)
    if (resp !== 200 ) return alert(resp.error)
    alert('Cuenta creada exitosamente')
    navigate('/dashboard')
  }

  return (
    <div className='max-w-full mx-auto mt-5 text-root-dark xl:w-5/6 xl:max-w-7xl'>
      <h1 className='pb-4 text-4xl'>Crear Cuenta</h1>
      <form className='flex flex-col gap-2 w-96' onSubmit={ handleSubmit }>
        <label htmlFor="accounttype">Tipo de cuenta</label>
        <select name="accounttype" className="w-full px-3 py-2 mb-10 border rounded border-zinc-300">
          <option value="CTAAHORROS">Cuenta de Ahorros</option>
          <option value="CTACORRIENTE">Cuenta Corriente</option>
        </select>
        <input type="submit" className="w-full p-3 text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700 disabled:bg-blue-300" value="Crear Cuenta" />
      </form>
    </div>
  )
}