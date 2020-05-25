import axios from '@/utils/request'

const userUrl = '/user_center/api'
const applyUrl = '/api'
// const userUrl = 'http://192.168.10.33:10088'

export function getApplyMessages (url) {
  return axios({
    url: applyUrl + url,
    method: 'post'
  })
}
export function fetchBarData (url) {
  return axios({
    url: userUrl + url,
    method: 'get'
  })
}

export function fetchRandomServices (url) {
  return axios({
    url: userUrl + url,
    method: 'get'
  })
}

export function fetchServiceUsers (url) {
  return axios({
    url: userUrl + url,
    // url: 'http://192.168.10.22:10088' + url,
    method: 'get'
  })
}

export function fetchTopServices (url) {
  return axios({
    url: userUrl + url,
    method: 'get'
  })
}

export function getTreeList (parameter) {
  return axios({
    url: userUrl + '/department/findByOrgId/' + parameter,
    method: 'get'
  })
}

export function getList (parameter) {
  return axios({
    url: userUrl + '/user/list',
    method: 'post',
    data: parameter
  })
}

export function modify (parameter) {
  return axios({
    url: userUrl + '/department/edit',
    method: 'post',
    data: parameter
  })
}
export function userModify (parameter) {
  return axios({
    url: userUrl + '/user/edit',
    method: 'post',
    data: parameter
  })
}
export function deleteLists (parameter) {
  return axios({
    url: userUrl + '/user/del/' + parameter,
    method: 'get'
  })
}

export function pwdReset (parameter) {
  return axios({
    url: userUrl + '/user/pwdReset',
    method: 'post',
    data: parameter
  })
}

export function detail (url, parameter) {
  return axios({
    url: userUrl + url,
    method: 'post',
    data: parameter
  })
}

export function fetchCustomerMessage (url) {
  return axios({
    url: userUrl + url,
    method: 'get',
  })
}

export function release (url) {

}