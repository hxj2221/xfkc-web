import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
//
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 数据字典
import dict from './components/Dict'

// 权限指令
import permission from './components/Permission'
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App'
import store from './store'
import router from './router/routers'

import echarts from 'echarts'

import avatar from './components/avatar/avatar.vue'
import comm from './utils/common.js'
import commactive from './utils/commonactive.js'

// 引用视频插件
import Video from 'video.js'
import 'video.js/dist/video-js.css'

import './assets/icons' // icon
import './router/index' // permission control
// import 'echarts-gl'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.component('avatar', avatar)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$comm = comm
Vue.prototype.$commactive = commactive
Vue.prototype.$video = Video

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
