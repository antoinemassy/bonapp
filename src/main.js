import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

var vm = new Vue({
  render: h => h(App),
  router
})
vm.$mount('#app')
global.vm = vm
