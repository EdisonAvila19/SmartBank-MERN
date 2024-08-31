export function getAccountsRequest () {
  return fetch(`${import.meta.env.VITE_API_URL}/accounts`, {
    method: 'GET',
    credentials: 'include'
  })
}