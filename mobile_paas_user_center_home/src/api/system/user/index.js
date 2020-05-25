import { axios } from '@/utils/request'
var qs = require('qs')

export function getUserList (parameter) {
  return axios({
    url: '/sysUser/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveUserList (parameter) {
  return axios({
    url: '/sysUser/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/sysUser/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteUserList (parameter) {
  return axios({
    url: '/sysUser/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getAllResidence (parameter) {
  return axios({
    url: '/residenceInfo/findTree',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
