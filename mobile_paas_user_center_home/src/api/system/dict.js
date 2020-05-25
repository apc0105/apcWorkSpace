import request from '@/utils/flowrRequest'

const namespace = 'admin/dicts'

export function getRemote(url) {
  const _url = `/bpm/proxy/list/${encodeURIComponent(url)}`
  return (params) => request({
    url: _url,
    method: 'get',
    params: params
  })
}

export function getList(type) {
  return request({
    // url: namespace + '/list',
    url: namespace + '/demo/dict/detai`',
    method: 'get',
    params: { type }
  })
}

export function getTree(type) {
  return request({
    // url: namespace + '/list',
    url: namespace + '/demo/dict`',
    method: 'get',
    params: { type }
  })
}

export function getTypePage({ filter, pager, sort }) {
  return request({
    url: namespace + '/types',
    method: 'get',
    params: { ...filter, ...pager, ...sort }
  })
}

export function getPage({ filter, pager, sort }) {
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

