/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import { ToggleVisibilityIcon } from './ToggleVisibilityIcon'

function WithAccounts({ handleBalance, showBalance, account }) {
  return ( <>
    <h4 className='text-xl font-semibold'>Saldo en cuenta</h4>
    <div className='flex flex-row justify-between gap-5'>
      <p className='text-4xl font-semibold sm:text-5xl'>$ { showBalance && account ? account.balance : '****' }</p>
      <ToggleVisibilityIcon handleClick={ handleBalance } condition={ showBalance } />
    </div>
    {
      account && 
      (
        <Link to={account && `/transactions/${account.id}`} target='_self' id='lnk_Movimientos' className='absolute text-lg bottom-5 right-5'>Ver resumen</Link>
      )
    }
  </>)
}

function WithNoAccounts() {
  return (
    <div className='absolute w-1/2 h-auto text-center top-1/3 left-1/4' id='noCountMssg'>
      <p className='text-xl'>
        No tienes cuentas asociadas. Para crear una 
        <br/> 
        <Link className='font-bold text-blue-900' to="/new-account">haz click aquí</Link>
      </p>
    </div>
  )
}

export function AccountCard({ hasAccounts, handleBalance, showBalance, account }) {
  return (<>
    {
      !hasAccounts 
        ? <WithAccounts handleBalance={ handleBalance } showBalance={ showBalance } account={ account } />
        : <WithNoAccounts />
    }
  </>)
}