import axios from 'axios'



// 创建axios实例
const service = axios.create({

  baseURL: '/', // api的base_url
  headers: {'Content-type': 'multipart/form-data'}
})

// request拦截器
service.interceptors.request.use(config => {
 
  // config.headers['api-version'] = 'v1.0.0' // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  
  response => {
    
    const res = response
    // console.log(res)
    if (res.status !== 200) {

      alert('错误')
      if (res.code === 401 || res.code === 50008 || res.code === 50012 || res.code === 50014) {
        alert('服务器内部错误')
      } 
      // return Promise.reject('error')
    } else {
      // if (res.msg) {
      //   Notify(res.msg)
      // }
      return response.data
    }
  },
  error => {
    // debugger
    console.log('err' + error) // for debug
    console.log(error.message)
    return Promise.reject(error)
  }
)

export default service
