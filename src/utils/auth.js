const my_token = 'HR TOKEN'

export function getToken() {
  return localStorage.getItem(my_token)
}

export function setToken(token) {
  return localStorage.setItem(my_token, token)
}

export function removeToken() {
  return localStorage.removeItem(my_token)
}