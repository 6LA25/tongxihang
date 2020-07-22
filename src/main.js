import Vue from 'vue'
import ECharts from 'vue-echarts'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import permission from './assets/directives/permission'
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
Vue.component('v-chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
