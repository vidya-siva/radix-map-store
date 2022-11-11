import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
