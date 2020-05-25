import request from '@/utils/flowrRequest'

const namespace = 'flow/approvals'


export function getList(filter) {
  return request({
    url: namespace,
    method: 'get',
    params: { ...filter }
  })
}


export function getById(id) {
  return request({
    url: namespace + '/' + id,
    method: 'get',
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
    method: 'delete',
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

export function getVersionPages({ filter, pager, sort }) {
  return request({
    url: namespace + '/' + filter.approvalId + '/versions',
    method: 'get',
    params: { ...filter, ...pager, ...sort }
  })
}

export function postVersion(data) {
  return request({
    url: namespace + '/' + data.approvalId + '/versions',
    method: 'post',
    data
  })
}

export function putVersionRelease(data) {
  return request({
    url: namespace + '/' + data.approvalId + '/versions/' + data.versionId + '/release',
    method: 'put',
    data
  })
}

export function putVersionOffline(data) {
  return request({
    url: namespace + '/' + data.approvalId + '/versions/' + data.versionId + '/offline',
    method: 'put',
    data
  })
}

export function deleteVersion(data) {
  return request({
    url: namespace + '/' + data.approvalId + '/versions/' + data.versionId,
    method: 'delete',
  })
}


