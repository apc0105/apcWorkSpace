import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function getLists (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function modify (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function deleteList (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function view (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/view',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getSysParamByValue (parameter) {
  return axios({
    url: '/sysParamType/getSysParamByValue',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function chageState (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/chageState',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveEx (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/saveEx',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
