import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/sysLog/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
