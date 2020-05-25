import request from '@/utils/flowrRequest'

const namespace = 'flow/defflows'

export function getPages({ filter, pager, sort }) {
  return request({
    url: namespace,
    method: 'get',
    params: { ...filter, ...pager, ...sort }
  })
}
export function getById(id) {
  return request({
    url: namespace + '/' + id,
    method: 'get'
  })
}

export function getMatchDefformFields(id) {
  return request({
    url: namespace + '/' + id + '/defformFields',
    method: 'get'
  })
}

export function post(data) {
  return request({
    url: namespace,
    method: 'post',
    data
  })
}

export function put(data) {
  return request({
    url: namespace + '/' + data.id,
    method: 'put',
    data
  })
}

export function delete1(id) {
  return request({
    url: namespace + '/' + id,
    method: 'delete'
  })
}

export function deletes(ids) {
  return request({
    url: namespace,
    method: 'delete',
    data: { ids }
  })
}

export function updateStatus(data) {
  return request({
    url: namespace,
    method: 'put',
    data
  })
}
