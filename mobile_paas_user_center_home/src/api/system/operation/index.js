import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysOperation/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveList (parameter) {
  return axios({
    url: '/sysOperation/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function modify (parameter) {
  return axios({
    url: '/sysOperation/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function deleteList (parameter) {
  return axios({
    url: '/sysOperation/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
