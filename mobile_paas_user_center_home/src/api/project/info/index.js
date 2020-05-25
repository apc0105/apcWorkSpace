import { axios } from '@/utils/request'
var qs = require('qs')

export function getList (parameter) {
  return axios({
    url: '/proInfo/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveList (parameter) {
  return axios({
    url: '/proInfo/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
// 项目招标
export function proPackage (parameter) {
  return axios({
    url: '/proPackage/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function deletePackage (parameter) {
  return axios({
    url: '/proPackage/deletePackage',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modifyPackage (parameter) {
  return axios({
    url: '/proPackage/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function proContract (parameter) {
  return axios({
    url: '/proContract/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveByCheck (parameter) {
  return axios({
    url: '/proContract/saveByCheck',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modify (parameter) {
  return axios({
    url: '/proInfo/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function deleteList (parameter) {
  return axios({
    url: '/proInfo/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function detail (parameter) {
  return axios({
    url: '/proInfo/view',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function details (parameter) {
  return axios({
    url: '/proInfo/viewData',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function saveAudit (parameter) {
  return axios({
    url: '/proInfo/saveAudit',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function modifyYs (parameter) {
  return axios({
    url: '/proPackage/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function saveListYs (parameter) {
  return axios({
    url: '/proPackage/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getBidding (parameter) {
  return axios({
    url: '/proInfo/getBidding',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function proPackageModify (parameter) {
  return axios({
    url: '/proPackage/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function proContractModify (parameter) {
  return axios({
    url: '/proContract/modify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function proPackageDelete (parameter) {
  return axios({
    url: '/proPackage/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function proContractDelete (parameter) {
  return axios({
    url: '/proContract/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function view (parameter) {
  return axios({
    url: '/proPackage/view',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function getPackageAndContract (parameter) {
  return axios({
    url: '/proContract/getPackageAndContract',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function getProContractList (parameter) {
  return axios({
    url: '/proContract/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function viewByPackageId (parameter) {
  return axios({
    url: '/proContract/viewByPackageId',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getListByConId (parameter) {
  return axios({
    url: '/proContractPay/getListByConId',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function proContractPaySave (parameter) {
  return axios({
    url: '/proContractPay/save',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function proContractPayDelete (parameter) {
  return axios({
    url: '/proContractPay/delete',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function changeState (parameter) {
  return axios({
    url: '/proInfo/changeState',
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getBuyWayParamByParamType (parameter) {
  return axios({
    url: '/sysParamType/getBuyWayParamByParamType',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
