
import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysHeaderConfig/findProConfigYear',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function savePro (parameter) {
  return axios({
    url: '/sysHeaderConfig/savePro',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
