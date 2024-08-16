export async function loginRequest (user) {
  return await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
}

export async function registerRequest (user) {
  return await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
}

export async function logOutRequest () {
  return await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}