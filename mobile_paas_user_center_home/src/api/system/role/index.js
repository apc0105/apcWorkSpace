import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysRole/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/sysRole/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/sysRole/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/sysRole/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 获取所有角色
export function roleList (parameter) {
  return axios({
    url: '/sysRole/roleList',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function reTree (parameter) {
  return axios({
    url: '/sysRole/reTree',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveReTree (parameter) {
  return axios({
    url: '/sysRole/saveReTree',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
