import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import './main.scss';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Detalhes from './components/Detalhes';
import Language from './components/Language';
// import axios from 'axios';

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
  routes // short for `routes: routes`
})


new Vue({
  router,
  render: h => h(App),
  // data: {
  //   loading: true,
  //   countries: []
  // },
  // render: function (h){
  //   return h(App, {
  //     props: {
  //       countries: this.countries,
  //       loading: this.loading
  //     }
  //   })
  // },
  // methods: {
  //   getCountries () {
  //     axios.get('https://restcountries.eu/rest/v2/all')
  //     .then(({ data }) => {
  //       this.loading = false
  //       this.countries = data
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }
  // },
  // mounted: function () {
  //   this.getCountries()
  // }
}).$mount('#app')
