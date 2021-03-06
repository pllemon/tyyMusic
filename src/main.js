import Vue from 'vue'
import $ from 'jquery'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import common from './utils/common.js'
Vue.prototype.$common = common


import UploadPic from '@/components/Upload/index'
Vue.component('UploadPic', UploadPic)
import GdUpload from '@/components/Upload/index3'
Vue.component('GdUpload', GdUpload)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
