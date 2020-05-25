// import { axios } from '@/utils/request'
import request from '@/utils/mockRequest'
// import baserUrl from '../mock'
// console.log('---------------------------------')
// console.log(baserUrl)
// //post
export function postAction(url,parameter) {
  return request({
    url: url,
    method:'post' ,
    data: parameter
  })
}
//get
export function getAction(url) {
  return request({
    url: url,
    method: 'get',
  })
}