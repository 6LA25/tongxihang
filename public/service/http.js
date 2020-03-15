import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'element-ui'
// 设置默认的请求超时时间
axios.defaults.timeout = 60000

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // form-data参数配置
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  config.headers.common['AdminAuthorization'] = sessionStorage.getItem('ticket')
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
      // 登录报错及登录失效区分
      if (response.data.result_code !== 1000) {
        MessageBox.alert('请重新登录！', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            sessionStorage.removeItem('publickey')
            sessionStorage.removeItem('rsakey')
            sessionStorage.removeItem('userInfo')
            sessionStorage.removeItem('ticket')
            window.location.href = `//${window.location.host}/#/`
          }
        })
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
