import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/proBiddingInfo/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/proBiddingInfo/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/proBiddingInfo/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/proBiddingInfo/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function detail (parameter) {
  return axios({
    url: '/proBiddingInfo/view',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function changeState (parameter) {
  return axios({
    url: '/proBiddingInfo/changeState',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
