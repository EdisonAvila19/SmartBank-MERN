import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { useAccount } from '../hooks/useAccount'
import Promos from '../components/Promos'
import Shortcuts from '../components/Shortcuts'
import { HideSVG, ShowSVG } from '../components/Icons'
import useCheckMenuOptions from '../hooks/useCheckMenu'

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true)
  const AccountRef = useRef(null)

  useCheckMenuOptions(window.location.pathname)
  const { getAccounts, Accounts } = useAccount()
  const [account, setAccount] = useState(null)

  useEffect(() => {
    getAccounts()
  }, [])
  
  
  const handleAccountChange = () => {
    console.log('AccountRef', AccountRef.current.value)
    let currentAccount = [...Accounts].find(account => account.id === AccountRef.current.value)
    if (currentAccount){
      const currentBalance = currentAccount.balance.toLocaleString('es-ES')
      currentAccount = {
        ...currentAccount,
        balance: currentBalance
      }
    }
    setAccount(currentAccount)
  }
  
  const handleBalance = () => {
    console.log('handleBalance')
    setShowBalance(!showBalance)
  }
  
  useEffect(() => {
    console.log('Accounts', Accounts)
    handleAccountChange()
  }, [Accounts])
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <section className='flex flex-col items-center max-w-full mx-auto mt-5 lg:items-start text-root-dark xl:w-5/6 xl:max-w-7xl'>
        <select ref={AccountRef} onChange={ handleAccountChange } className='outline outline-1 p-3 lg:ml-32 xl:ml-0 mt-4 max-w-[80vw] w-96 lg:w-[17rem] xl:min-w-[475px] rounded-xl text-lg bg-transparent' disabled={Accounts.length === 0}>
          {
            Accounts.length === 0 
              ? (<option value="">No tienes cuentas asociadas</option>) 
              : (
                Accounts.map(act => {
                  let hiddenAccount = act.id.slice(-4)
                  return (<option key={act.id} value={act.id}>{hiddenAccount} - {act.accounttype}</option>)
                })
              )
          }
          
        </select>
        <div className='flex flex-wrap justify-center lg:justify-between w-96 sm:w-full max-w-[80vw] xl:max-w-full lg:mx-32 xl:mx-0 py-4 gap-10'>
          <article id='tarjetaCuenta' className='relative bg-root-bg-card w-full sm:w-96 lg:w-[45%] xl:min-w-[475px] max-w-1/2 h-72 rounded-2xl p-5'>
            {
              Accounts.length !== 0
              ? (<>
                <h4 className='text-xl font-semibold'>Saldo en cuenta</h4>
                <div className='flex flex-row justify-between gap-5'>
                  <p className='text-4xl font-semibold sm:text-5xl'>$ { showBalance && account ? account.balance : '****' }</p>
                  {
                    showBalance 
                      ? (
                        <button id='saldo-activo' onClick={ handleBalance }>
                          <HideSVG />
                        </button>
                      )
                      : (
                        <button id='saldo-oculto' className='w-9 sm:w-auto' onClick={ handleBalance }>
                          <ShowSVG />
                        </button>
                      )
                  }
                </div>
                {
                  account && 
                  (
                    <Link to={account && `/transactions/${account.id}`} target='_self' id='lnk_Movimientos' className='absolute text-lg bottom-5 right-5'>Ver resumen</Link>
                  )
                }
              </>)
              : (
                <div className='absolute w-1/2 h-auto text-center top-1/3 left-1/4' id='noCountMssg'>
                  <p className='text-xl'>
                    No tienes cuentas asociadas. Para crear una 
                    <br/> 
                    <Link className='font-bold text-blue-900' to="/new-account">haz click aquí</Link>
                  </p>
                </div>
              )
            }
            
            
            
          </article>
          
          <article className='bg-root-bg-card w-96 lg:w-[45%] xl:min-w-[475px] h-72 rounded-2xl p-5 relative flex justify-center '>
            <h4 className='font-semibold text-xl absolute top-[-30px] left-5'>Mis Inversiones</h4>
            <img className='max-h-full opacity-40' src="/Inversiones.svg" alt="Grafico inversiones" id='invGraph' />
            <div className='absolute h-auto px-5 text-center sm:w-2/3 top-1/3' id='noInvMssg'>
              <p className='text-xl'>
                No tienes inversiones registradas en este momento. Para comenzar 
                <br/> 
                <Link className='font-bold text-blue-900 pointer-events-none'>haz click aquí</Link>
              </p>
            </div>
          </article>
        </div>
      </section>

      < Shortcuts />

      <Promos />
      
    </div>
  )
}