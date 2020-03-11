import Vue from 'vue'
import ECharts from 'vue-echarts'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import permission from './assets/directives/permission'
Vue.config.productionTip = false
Vue.directive('permission', permission)
Vue.use(ElementUI)
Vue.component('v-chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
