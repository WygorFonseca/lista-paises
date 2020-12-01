import Vue from 'vue'
import App from './App.vue'
import './main.scss';
// import axios from 'axios';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mounted: function () {
    // axios.get('https://restcountries.eu/rest/v2/all')
    // .then(({ data }) => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }
}).$mount('#app')
