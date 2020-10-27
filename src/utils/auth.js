import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('dsf_token')
}

export function setToken(token) {
  return Cookies.set('dsf_token', token)
}

export function removeToken() {
  return Cookies.remove('dsf_token')
}

export function getAccountId() {
  return Cookies.get('account_id')
}

export function setAccountId(id) {
  return Cookies.set('account_id', id)
}

export function removeAccountId() {
  return Cookies.remove('account_id')
}

export function getLoginStorage() {
  const username = localStorage.getItem('dsfUser') || ''
  const password = localStorage.getItem('dsfPwd') || ''
  let remember = false
  if (username) {
    remember = true
  }
  return {
    username,
    password,
    remember
  }
}

export function setLoginStorage(mes) {
  localStorage.setItem('dsfUser', mes.username)
  localStorage.setItem('dsfPwd', mes.password)
}

export function removeLoginStorage() {
  localStorage.removeItem('dsfUser')
  localStorage.removeItem('dsfPwd')
}
