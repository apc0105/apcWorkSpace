
import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysHeaderConfig/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveList (parameter) {
  return axios({
    url: '/sysHeaderConfig/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function modify (parameter) {
  return axios({
    url: '/sysHeaderConfig/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function deleteLists (parameter) {
  return axios({
    url: '/sysHeaderConfig/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getParamsList (parameter) {
  return axios({
    url: '/sysHeaderConfig/modifyProId',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveParam (parameter) {
  return axios({
    url: '/sysHeaderConfigFile/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteSysParam (parameter) {
  return axios({
    url: '/sysHeaderConfigFile/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function findCode (parameter) {
  return axios({
    url: '/sysHeaderConfigFile/findCode',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function findYear (parameter) {
  return axios({
    url: '/sysHeaderConfig/findYear',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
