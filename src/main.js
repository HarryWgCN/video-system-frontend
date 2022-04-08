// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
Vue.config.productionTip = false

Vue.use(ElementUI)

// eslint-disable-next-line no-new
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
