import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VuePaginate from 'vue-paginate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
//variable global
Vue.prototype.$url='http://localhost:4201/api';
Vue.prototype.$token=localStorage.getItem('token');
Vue.prototype.$categorias = ['Musica','Celulares','Computadoras'];
Vue.prototype.$ganancia = 30;


import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-select/dist/vue-select.css";
Vue.use(Notifications)
Vue.use(VuePaginate)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
