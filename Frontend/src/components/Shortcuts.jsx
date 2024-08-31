import { useAccount } from '../hooks/useAccount'

import { QRActivo, CashActivo, TransferActivo, PercentActivo, AddActivo } from '../components/Icons'
import SmallCard from '../components/SmallCard'

export default function Shortcuts() {

  const { Accounts } = useAccount()
  
  return (
    <section className='h-auto mx-32 my-4 text-root-dark xl:w-5/6 xl:max-w-7xl'>
        <h3 className='mb-4 text-2xl font-semibold'>Accesos rápidos</h3>
        <div className='flex flex-row flex-wrap h-auto gap-7 justify-evenly xl:justify-between'>
          <SmallCard label={'Generar QR'} url={'#QR'} active={false}>
            <QRActivo />
          </SmallCard>
          <SmallCard label={'Préstamos'} url={'#prestamos'} active={false}>
            <CashActivo />
          </SmallCard>
          <SmallCard label={'Transferencias'} url={'/new-transaction'} active={Accounts.length !== 0}>
            <TransferActivo />
          </SmallCard>
          <SmallCard label={'Promociones'} url={'#promociones'} active={false}>
            <PercentActivo />
          </SmallCard>
          <SmallCard label={'Agregar cuenta'} url={'/new-account'} active={true}>
            <AddActivo /> 
          </SmallCard>
        </div>
      </section>
  )
}