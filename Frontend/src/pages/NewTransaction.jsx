import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAccount } from '../hooks/useAccount'
import useCheckMenuOptions from '../hooks/useCheckMenu'

export default function NewTransaction() {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0)
  const [validAccount, setValidAccount] = useState(true)
  const testRef = useRef(null)
  const { register, handleSubmit, watch, formState: { errors, isValid} } = useForm({ mode: 'onChange' })

  const { Accounts, getAccounts, createTransaction } = useAccount()
  
  const sourceAccount = watch('sourceAccount')
  useCheckMenuOptions(window.location.pathname)

  const handleAccountChange = () => {
    const sourceAccount = document.querySelector('select[name="sourceAccount"]').value
    console.log(testRef.current)
    console.log('sourceAccount: ', sourceAccount)
    if (!sourceAccount) return
    let currentAccount = [...Accounts].find(account => account.id === sourceAccount)
    if (!currentAccount) return
    const currentBalance = currentAccount.balance
    setBalance(currentBalance)
    setValidAccount(currentBalance >= 1000)
  }

  const onSubmit = handleSubmit(async (data) => {
    const transaction = {
      sourceAccount: data.sourceAccount,
      destinationAccount: data.destinationAccount,
      amount: +data.amount,
      description: data.description
    }
    const resp = await createTransaction(transaction)
    if (resp !== 200) return alert(resp.error)
    alert('Transacción creada exitosamente')
    getAccounts()
    navigate('/new-transaction')
  })
  
  useEffect(() => {
    getAccounts()
  }, [])
  
  useEffect(() => {
    handleAccountChange()
  }, [Accounts])
  
  return (
    <div className='max-w-full mx-auto mt-5 text-root-dark xl:w-5/6 xl:max-w-7xl'>
      <h1 className='pb-4 text-4xl'>Transferencia</h1>
      <form className='flex flex-col gap-2 w-96' onSubmit={ onSubmit } onChange={ handleAccountChange }>
        <label >
          Cuenta de Origen *
          <select name="sourceAccount" className="w-full px-3 py-2 mt-2 mb-3 border rounded border-zinc-300" ref={ testRef }
            {...register('sourceAccount', { required: true })}
          >
            <option value="">Selecciona una cuenta</option>
            {
              Accounts.map(act => {
                let hiddenAccount = act.id.slice(-4)
                return (<option key={act.id} value={act.id}>****{hiddenAccount} - {act.accounttype}</option>)
              })
            }
          </select>
        </label>
        { !validAccount && <p className='text-red-500'>El saldo actual en la cuenta de origen no es suficiente</p> }
        <label>
          Cuenta Destino *
          <input type="text" className="w-full px-3 py-2 mt-2 mb-3 border rounded border-zinc-300" disabled={!validAccount}
            {...register('destinationAccount', { required: true, validate: (value) => {
              if (!value) return 'Cuenta de destino es requerida'
              if (value === sourceAccount) return 'La cuenta de origen no puede ser la cuenta de destino'
            }})}
          />
        </label>
        { errors.destinationAccount && <p className='text-red-500'>{errors.destinationAccount.message}</p> }
        <label>
          Monto *
          <input type="number" min="1000" className="w-full px-3 py-2 mt-2 border rounded border-zinc-300" disabled={!validAccount}
            {...register('amount', { required: true, validate: (value) => {
              if (!value) return 'Monto es requerido'
              if (value < 1000) return 'Monto debe ser mayor o igual a 1000'
              if (value > balance) return 'El saldo actual en la cuenta de origen no es suficiente'
            }})}
          />
          <span className='text-xs'>El saldo actual en la cuenta de origen es de <b>${balance.toLocaleString('es-ES')}</b></span>
        </label>
        { errors.amount && <p className='text-red-500'> {errors.amount.message} </p> }
        <label>
          Descripción
          <input type="text" className="w-full px-3 py-2 mt-2 mb-3 border rounded border-zinc-300" disabled={!validAccount}
            {...register('description')}
          />
        </label>
        <input type="submit" className="w-full p-3 text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700 disabled:bg-blue-300" value="Enviar" disabled={!isValid} />
      </form>
    </div>
  )
}