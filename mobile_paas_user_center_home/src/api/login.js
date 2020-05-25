import api from './index'
import { axios } from '@/utils/request'
var qs = require('qs')

const authUrl = '/author/api'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (account, password) {
  return axios({
    url: `${authUrl}/user/login`,
    method: 'post',
    data: { account, password }
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: '/login/logOff',
    method: 'post'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function updatePwd (parameter) {
  return axios({
    url: '/user_center/api/user/user/update/password',
    method: 'post',
    data: parameter
  })
}

/**
 *  获取用户权限信息
 * @param parameter
 * @returns {*}
 */
export function getPermissionInfos (parameter) {
  return axios({
    url: `${authUrl}/permission/menuList`,
    method: 'post',
    data: parameter
  })
}
