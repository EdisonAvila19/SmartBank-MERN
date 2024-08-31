import useCheckMenuOptions from '../hooks/useCheckMenu'

export default function NewTransaction() {
  useCheckMenuOptions(window.location.pathname)

  return (
    <div>
      <h1>New Transaction</h1>
    </div>
  )
}