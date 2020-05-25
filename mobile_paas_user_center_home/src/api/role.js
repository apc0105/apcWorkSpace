
import { axios } from '@/utils/request'
const baseApi = '/author/api'
export const api = {
  list: baseApi + '/role/list',
  remove: baseApi + '/role/delete',
  save: baseApi + '/role/add',
  modify: baseApi + '/role/edit',
  find: baseApi + '/role/find',
  tree: baseApi + '/resource/list',
  assignResource: baseApi + '/permission/config',
  findResourceByRoleId: baseApi + '/permission/list',
  bindingRoles: baseApi + '/role/bindRoles',
  userRoles: baseApi + '/role/roles'
}
export function getList (params) {
  return axios({
    url: api.list,
    method: 'post',
    data: params
  })
}

export function save (params) {
  return axios({
    url: api.save,
    method: 'post',
    data: params
  })
}

export function modify (params) {
  return axios({
    url: api.modify,
    method: 'post',
    data: params
  })
}

export function deleteList (params) {
  return axios({
    url: api.remove,
    method: 'post',
    data: params
  })
}

export function getTree (params) {
  return axios({
    url: api.tree,
    method: 'post',
    data: params
  })
}

export function assignResource (params) {
  return axios({
    url: api.assignResource,
    method: 'post',
    data: params
  })
}

export function findResourceByRoleId (params) {
  return axios({
    url: api.findResourceByRoleId,
    method: 'post',
    data: params
  })
}

export function bindingRoles (params) {
  return axios({
    url: api.bindingRoles,
    method: 'post',
    data: params
  })
}

export function userRoles (params) {
  return axios({
    url: api.userRoles,
    method: 'post',
    data: params
  })
}
