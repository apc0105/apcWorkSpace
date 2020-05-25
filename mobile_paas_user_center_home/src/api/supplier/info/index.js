import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/proSupplierInfo/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/proSupplierInfo/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/proSupplierInfo/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/proSupplierInfo/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function detail (parameter) {
  return axios({
    url: '/proSupplierInfo/view',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
