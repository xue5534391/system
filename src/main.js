import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 全局样式
import './assets/css/reset.css'
// 按需引入element-ui
import './plugin/element'
// 引入接口
import api from './api/api'
import Bus from './plugin/Bus'
Vue.prototype.$bus = Bus
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
