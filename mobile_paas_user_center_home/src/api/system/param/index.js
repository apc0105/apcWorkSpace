
import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysParamType/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveList (parameter) {
  return axios({
    url: '/sysParamType/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function modify (parameter) {
  return axios({
    url: '/sysParamType/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function deleteLists (parameter) {
  return axios({
    url: '/sysParamType/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getParamsList (parameter) {
  return axios({
    url: '/sysParamType/paramList',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveParam (parameter) {
  return axios({
    url: '/sysParamType/saveParam',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteSysParam (parameter) {
  return axios({
    url: '/sysParamType/deleteSysParam',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
