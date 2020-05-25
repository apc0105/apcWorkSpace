import request from '@/utils/flowrRequest'
// var qs = require('qs')
const apiURL = '/api'
export function weatherStatus() {
  return request({
    url: `${apiURL}/weather/101160101011`,
    method: 'get'
  })
}
export function fetchData(id, url, method) {
  // console.log(url)
  const URL = `${apiURL}${url}`
  // console.log(URL)
  return request({
    url: URL,
    method,
    params: id
  })
}
export function fetchDataList(params, url, method) {
  // console.log(url)
  const URL = `${apiURL}${url}`
  return request({
    url: URL,
    method,
    data: params

  })
}
export function fetchApply(params, url, method) {
  // console.log(url)
  const URL = `${apiURL}${url}`
  return request({
    url: URL,
    method,
    data: params

  })
}
export function fetchSign(params) {
  // console.log(url)
  const URL = `/bpm/manage/user/getSign`
  return request({
    url: URL,
    method: 'POST',
    data: params

  })
}

