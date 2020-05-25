import axios from '@/utils/request'

export function uploadFile (url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

