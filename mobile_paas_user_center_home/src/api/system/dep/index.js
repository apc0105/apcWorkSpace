import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysDepartment/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/sysDepartment/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/sysDepartment/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function findTree (parameter) {
  return axios({
    url: '/sysDepartment/sysDepartmentList',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/sysDepartment/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
