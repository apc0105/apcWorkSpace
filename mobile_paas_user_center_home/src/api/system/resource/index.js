import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysResource/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/sysResource/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function modify (parameter) {
  return axios({
    url: '/sysResource/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function deleteList (parameter) {
  return axios({
    url: '/sysResource/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function findTree (parameter) {
  return axios({
    url: '/sysResource/findTree',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
