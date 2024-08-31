import useCheckMenuOptions from '../hooks/useCheckMenu'

export default function Transactions() {
  useCheckMenuOptions(window.location.pathname)
  
  return (
    <div>
      <h1>Transactions</h1>
    </div>
  )
}