import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/proBiddingExtract/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function extract (parameter) {
  return axios({
    url: '/proBiddingInfo/extract',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/proBiddingExtract/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/proBiddingExtract/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function changeType (parameter) {
  return axios({
    url: '/proBiddingExtract/changeType',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function print (parameter) {
  return axios({
    url: 'proBiddingExtract/print',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function reExtract (parameter) {
  return axios({
    url: 'proBiddingExtract/reExtract',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
