import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/vehicleInfo/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/vehicleInfo/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/vehicleInfo/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/vehicleInfo/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 获取所有小区

export function findTree (parameter) {
  return axios({
    url: '/residenceInfo/findTree',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 根据小区获取设备
export function findAllresidenceId (parameter) {
  return axios({
    url: '/residenceEqu/findAllresidenceId',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 车牌颜色
export function licencePlateColour (parameter) {
  return axios({
    url: '/vehicleInfo/licencePlateColour',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
