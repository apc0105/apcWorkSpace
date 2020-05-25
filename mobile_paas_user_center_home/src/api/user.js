import request from '@/utils/flowrRequest'


export function getFlowVar(token) {
  return request({
    url: '/bpm/manage/process/getVariable',
    method: 'post'
  })
}
export function saveProcess(data) {
  return request({
    url: '/bpm/manage/applyForm/saveProcess',
    method: 'post',
    data
  })
}

export function findOrg() {
  return request({
    url: '/bpm/manage/process/getOrgList',
    method: 'post'
  })
}

export function findUser() {
  return request({
    url: '/bpm/manage/process/getUserAndOrgTreeList',
    method: 'post'
  })
}

export function findPost() {
  return request({
    url: '/bpm/manage/process/getPostList',
    method: 'post'
  })
}

export function findApp() {
  return request({
    url: '/portal/app/find',
    method: 'get'
  })
}
export function findIfs() {
  return request({
    url: '/portal/ifs/page',
    method: 'post',
    data: {
      pageNumber: 0,
      pageSize: 10000
    }
  })
}

export function findListeners() {
  return request({
    url: '/bpm/manage/process/getListeners',
    method: 'post'
  })
}
export function findInterceptor() {
  return request({
    url: '/bpm/manage/process/getInterceptor',
    method: 'post'
  })
}
export function findExpireHandler() {
  return request({
    url: '/bpm/manage/process/getExpireHandler',
    method: 'post'
  })
}

export function getProcessById(id) {
  return request({
    url: `/bpm/manage/applyForm/getProcessById/${id}`,
    method: 'post'
  })
}

export function getFormAuth(id) {
  return request({
    url: `/bpm/manage/applyForm/getFormAuth/${id}`,
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url: '/bpm/manage/process/getUserAndOrgTreeListByUser',
    method: 'post'
  })
}

export function getProjectTeam() {
  return request({
    url: '/bpm/manage/process/getGroupList',
    method: 'post'
  })
}


export function getUserOrg() {
  return request({
    url: '/bpm/manage/process/getOrgListByUser',
    method: 'post'
  })
}
