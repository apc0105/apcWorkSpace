import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/vehicleRecord/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
