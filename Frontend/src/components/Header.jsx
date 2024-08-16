import { SmartBankLogo } from './Icons'


export default function Header() {
  return (
    <header className='flex w-screen h-12 px-4 py-1 text-white bg-root-header bg-[#011f4f]'>
      <div>
        <SmartBankLogo />
      </div>
    </header>
  )
}