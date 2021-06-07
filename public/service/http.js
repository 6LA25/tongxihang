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
      const data = response.data
      // 登录报错及登录失效区分
      if (ajaxOptions.responseType === 'blob') {
        let type = ''
        const csvData = new Blob([data], { type: 'text/csv' })
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          const fileName = name || '培训考勤表.xls'
          window.navigator.msSaveOrOpenBlob(csvData, fileName)
        } else {
          const url = window.URL.createObjectURL(new Blob([data]), { type: 'application/octet-stream' })
          const link = document.createElement('a')
          if (response.headers['content-type'].includes('excel')) {
            type = 'xls' // excel文件
          }
          link.style.display = 'none'
          link.href = url
          // TODO：培训考勤模版下载暂时写死文件名
          link.download = name || `培训考勤表.${type}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      }
      if (response.data.result_code === 401) {
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
      } else if (response.data.result_code === 10001) {
        reject(response.data)
      } else {
        if (response.data.data && typeof response.data.data === 'string') {
          response.data.data = JSON.parse(response.data.data)
        }
        resolve(response.data)
      }
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}
