import {
  axios
} from '@/utils/request'

// const userUrl = '/api'


const userUrl = '/user_center/api'
// const userUrl = 'http://192.168.10.33:10088'

export function getList (parameter) {
  return axios({
    url: userUrl+'/department/list',
    method: 'post',
    data: parameter
  })
}

export function modify (parameter) {
  return axios({
    url: userUrl+'/department/edit',
    method: 'post',
    data: parameter
  })
}

export function deleteLists (parameter) {
  return axios({
    url: userUrl+'/department/del/' + parameter,
    method: 'get'
  })
}


