import Storage from 'vue-ls'
import config from '@/config/defaultSettings'
Vue.use(Storage, config.storageOptions)
// export const previewBaseUrl = 'http://ow365.cn/?i=20721&furl='
// 政务网环境
// export const previewBaseUrl = 'http://139.170.149.42:8805/?furl='
// export const previewDownloadURL = 'http://172.18.61.16:8080/'
// 外网环境
export const previewBaseUrl = 'http://60.165.54.113:9099/?furl='
export const previewDownloadURL = 'http://139.170.149.42:8081/'
export const imageDataRelationURL = 'http://139.170.149.42:8081/'
export const dataViewUrl ='http://139.170.149.42:8881'
export const uploadBaseUrl = '/jeecg-boot/file/uploadWithInputStream'
export const uploadUrl = `${uploadBaseUrl}/upload`

export const downloadUrl = `${uploadBaseUrl}/download/` // ${uploadBaseUrl}/download/
// gis项目根目录
// export const projectGisSearch = 'http://139.170.149.42:8881/gis/#/' // `http://192.168.10.147:3001/#/`
export const projectGisSearch = 'http://139.170.149.42:8881/gis/#/' // ``
// export const projectGisSearch = 'http://192.168.1.23:3001/#/'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import Vue from 'vue'

// console.log(Vue.ls)
export const token = Vue.ls.get(ACCESS_TOKEN)
export const wordURL='http://192.168.20.79:8888/'
// import { getAction} from '@/api/manage'
// import moment from 'moment'

// export const loginURL = `http://192.168.10.123:10000/login?redirect_url=http://192.168.10.147:9999`
export const loginURL = `http://sso.xtgss.cn/login?redirect_url=http://eip.xtgss.cn`
