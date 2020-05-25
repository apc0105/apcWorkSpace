import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/resLabel/queryResLabels',
    method: 'post',
    data: parameter
  })
}

export function addResLabel (parameter) {
  return axios({
    url: '/resLabel/addResLabel',
    method: 'post',
    data: parameter
  })
}

export function updateResLabel (parameter) {
  return axios({
    url: '/resLabel/updateResLabel',
    method: 'post',
    data: parameter
  })
}

export function deleteResLabel (parameter) {
  return axios({
    url: '/resLabel/deleteResLabel',
    method: 'post',
    data: parameter
  })
}
