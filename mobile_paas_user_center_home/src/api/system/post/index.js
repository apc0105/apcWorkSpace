import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysInterface/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function save (parameter) {
  return axios({
    url: '/sysInterface/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/sysInterface/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/sysInterface/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function findTree (parameter) {
  return axios({
    url: '/sysInterface/findTree',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
