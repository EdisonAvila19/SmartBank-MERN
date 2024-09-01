export function getAccountsRequest () {
  return fetch(`${import.meta.env.VITE_API_URL}/accounts`, {
    method: 'GET',
    credentials: 'include'
  })
}

export function createAccountRequest (account) {
  console.log(account)
  return fetch(`${import.meta.env.VITE_API_URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(account)
  })
}
