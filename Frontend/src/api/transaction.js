export function createTransactionRequest (transaction) {
  return fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(transaction)
  })
}