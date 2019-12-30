import axios from 'axios'
import qs from 'qs'

// 设置默认的请求超时时间
axios.defaults.timeout = 60000

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // form-data参数配置
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  // config.headers.common['AdminAuthorization'] = sessionStorage.getItem('token') || ''
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  return Promise.resolve(response)
}, (error) => {
  return Promise.reject(error)
})

export function Fetch (ajaxOptions = {}, name = '') {
  // 默认post
  ajaxOptions.method = ajaxOptions.method || 'post'
  return new Promise((resolve, reject) => {
    axios(ajaxOptions).then((response) => {
      if (response.data.result_code !== 1000) {
        reject(response.data)
      } else {
        if (response.data.data && typeof response.data.data === 'string') {
          response.data.data = JSON.parse(response.data.data)
        }
        resolve(response.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
