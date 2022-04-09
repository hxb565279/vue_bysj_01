// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
import './plugins/element.js'
import $ from 'jquery'
import axios from "axios";
import 'jquery'
import VueParticles from 'vue-particles'
Vue.use(router)
Vue.use(echarts)
Vue.use(VueParticles)
Vue.use(ElementUI)

// Vue.prototype.$router =router

Vue.prototype.$axios= axios;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
