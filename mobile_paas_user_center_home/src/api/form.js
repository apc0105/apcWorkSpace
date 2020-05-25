import request from '@/utils/flowrRequest'
var qs = require('qs')
// const bpmURL = 'http://localhost:10066'
const bpmURL = '/bpm'
export function fetchData(id, url, method) {
  // console.log(url)
  const URL = `${bpmURL}${url}`
  return request({
    url: URL,
    method,
    params: id
  })
}
export function fetchDataList(params, url, method) {
  // console.log(url)
  const URL = `${bpmURL}${url}`
  console.log('url========>' + URL)
  return request({
    url: URL,
    method,
    data: params

  })
}
export function postAction(params, url,){
  const URL = `${bpmURL}${url}`
  return request({
    url: URL,
    method:'post',
    data: params

  })
}
export function delAction(params, url,){
  const URL = `${bpmURL}${url}/${params}`
  return request({
    url: URL,
    method:'post',
    // data: params

  })
}
export function save(params, url,){
  const URL = `${bpmURL}${url}`
  return request({
    url: URL,
    method:'post',
    data: params

  })
}
export function fetchApply(params, url, method) {
  // console.log(url)
  const URL = `${bpmURL}${url}`
  return request({
    url: URL,
    method,
    data: params

  })
}
