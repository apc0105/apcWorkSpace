import { axios } from '@/utils/request'
var qs = require('qs')

// 小区信息接口
export function findResidenceInfo (parameter) {
  return axios({
    url: '/index/findResidenceInfo',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 实时人脸
export function findSnapUserAndResidenceId (parameter) {
  return axios({
    url: '/index/findSnapUserAndResidenceId',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 人脸报警（重点人员）
export function findAKeyUser (parameter) {
  return axios({
    url: '/index/findAKeyUser',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 人车流量
export function findPeopleCarAmount (parameter) {
  return axios({
    url: '/index/findPeopleCarAmount',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 实时车辆
export function findCarAmount (parameter) {
  return axios({
    url: '/index/findCarAmount',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 设备类型
export function findDeviceCount (parameter) {
  return axios({
    url: '/index/findDeviceCount',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 车辆报警
export function findVehicleRecord (parameter) {
  return axios({
    url: '/index/findVehicleRecord',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 设备状态
export function findEquimentCount (parameter) {
  return axios({
    url: '/index/findEquimentCount',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 性别年龄
export function findAgeCount (parameter) {
  return axios({
    url: '/index/findAgeCount',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function findVehicleRecordNum (parameter) {
  return axios({
    url: '/index/findVehicleRecordNum',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function findCarNum (parameter) {
  return axios({
    url: '/index/findCarNum',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function findUserNum (parameter) {
  return axios({
    url: '/index/findUserNum',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
