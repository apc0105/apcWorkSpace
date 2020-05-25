// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// import { VueAxios } from './utils/request'

// mock
import moment from 'moment'
import 'moment/locale/zh-cn'
import '@/style/reset.css' // global css
import '@/style/index.css' // global css
import '@/style/index.less' // global css
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import UPLOAD_URL from '@/views/image'
import DOWNLOAD_URL from '@/views/image'
import utils from '@/utils/index'

import { permissionHandle } from '@/utils/permissions'
import VueLazyload from 'vue-lazyload'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'

import Print from 'vue-print-nb-jeecg' // 打印
import loading from '@/assets/loading.gif'
import error from '@/assets/error.png'
Vue.use(Print)

Vue.use(VueFullPage)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: error,
  loading: loading,
  attempt: 1
})
moment.locale('zh-cn')
Vue.prototype.$UPLOAD_URL = UPLOAD_URL
Vue.prototype.$DOWNLOAD_URL = DOWNLOAD_URL
Vue.prototype.$permissionHandle = permissionHandle
Vue.config.productionTip = false
Vue.prototype.$moment = moment

// mount axios Vue.$http and this.$http
// Vue.use(VueAxios)

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
