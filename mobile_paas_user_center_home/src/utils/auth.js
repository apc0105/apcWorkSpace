export function getToken (data) {
  return window.localStorage.id
}
export function setToken (data) {
  window.localStorage.id = data
}
export function removeToken (data) {
  window.localStorage.removeItem('id')
}

export function getRole (data) {
  return window.localStorage.name
}
export function setRole (data) {
  window.localStorage.name = data
}
export function removeRole (data) {
  window.localStorage.removeItem('name')
}
export function getPermission (data) {
  return window.localStorage.permission
}
export function setPermission (data) {
  window.localStorage.permission = data
}
export function removePermission (data) {
  window.localStorage.removeItem('permission')
}
export function getResidenceId (data) {
  return window.localStorage.residenceId
}
export function setResidenceId (data) {
  window.localStorage.residenceId = data
}
export function removeResidenceId (data) {
  window.localStorage.removeItem('residenceId')
}
export function setUser (data) {
  window.localStorage.message = JSON.stringify(data)
}
