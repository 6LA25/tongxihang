import Vue from 'vue'
import ECharts from 'vue-echarts'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import permission from './assets/directives/permission'

import TIM from 'tim-js-sdk'
import TIMUploadPlugin from 'tim-upload-plugin'
let options = {
  SDKAppID: 1400511488 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
}
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options) // SDK 实例通常用 tim 表示
// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1) // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册腾讯云即时通信 IM 上传插件
tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
Vue.prototype.$$tim = tim
Vue.prototype.TIM = TIM

// 开始登录
tim.login({
  userID: 'webrtc11',
  userSig:
    '5d7290ad19b899bd32ec21c48f62fd824f4e6ffe8083c458e49d9aa0ec6096e4',
})

Vue.config.productionTip = false
Vue.directive('permission', permission)
Vue.use(ElementUI)
Vue.filter('YMDHMS_date', function (value) {
  // 2019-04-01T03:21:43.000+0000
  if (!value) {
    return '/'
  }
  let year = moment(value).year()
  let month = moment(value).month() + 1
  let date = moment(value).date()
  let hour = moment(value).hour() >= 10 ? moment(value).hour() : `0${moment(value).hour()}`
  let min = moment(value).minute() >= 10 ? moment(value).minute() : `0${moment(value).minute()}`
  let second = moment(value).second() >= 10 ? moment(value).second() : `0${moment(value).second()}`
  return `${year}-${month}-${date} ${hour}:${min}:${second}`
})
Vue.filter('YMD_date', function (value) {
  // 2019-04-01T03:21:43.000+0000
  if (!value) {
    return '/'
  }
  let year = moment(value).year()
  let month = moment(value).month() + 1
  let date = moment(value).date()
  return `${year}-${month}-${date}`
})
Vue.component('v-chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
