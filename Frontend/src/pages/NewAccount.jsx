import useCheckMenuOptions from '../hooks/useCheckMenu'

export default function NewAccount() {
  useCheckMenuOptions(window.location.pathname)

  return (
    <div>
      <h1>New Account</h1>
    </div>
  )
}