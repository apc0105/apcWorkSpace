import { axios } from '@/utils/request'

export function getList (parameter) {
  return axios({
    url: '/resFileIcon/queryResFileIcons',
    method: 'post',
    data: parameter
  })
}

export function addResLabel (parameter) {
  return axios({
    url: '/resFileIcon/addResFileIcon',
    method: 'post',
    data: parameter
  })
}

export function updateResLabel (parameter) {
  return axios({
    url: '/resFileIcon/updateResFileIcon',
    method: 'post',
    data: parameter
  })
}

export function deleteResLabel (parameter) {
  return axios({
    url: '/resFileIcon/deleteResFileIcon',
    method: 'post',
    data: parameter
  })
}
