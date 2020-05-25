
import { axios } from '@/utils/request'
var qs = require('qs')

export function getExpert (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/getExpert',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function isCome (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/isCome',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function cancel (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/cancel',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function checkIsDidding (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/checkIsDidding',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getExperts (parameter) {
  return axios({
    url: '/proDiddingExpertInfo/getExperts',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
