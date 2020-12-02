import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import './main.scss';

// Componentes
import Home from './components/Home';
import Detalhes from './components/Detalhes';
import Language from './components/Language';

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '*', redirect: '/' },
  { 
    path: '/',
    component: Home,
  },
  { path: '/detalhes/:countryCode', component: Detalhes, props: true },
  { path: '/idioma/:language', component: Language, props: true },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
