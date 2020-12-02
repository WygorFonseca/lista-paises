<template>
  <div class="container py-3 h-100">
    <transition name="fade-transition" mode="out-in">
      <div class="row h-100 mt-auto mb-auto justify-content-center" v-if="loading" key="loading">
        <div class="col-lg-5 col-md-10 col-10 rounded bg-white p-3 shadow-sm my-auto text-center">
          <i class="fas fa-spinner fa-spin"></i> Carregando países, por-favor aguarde.
        </div>
      </div>
      <div class="row h-100 mt-auto mb-auto justify-content-center" v-else key="afterLoading">
        <div class="col-lg-8 table-responsive my-auto col-md-10 col-11 rounded bg-white p-3 pt-4 shadow-sm">
          <CountriesTable :countries="countries" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import CountriesTable from './CountriesTable'

export default {
  props: ['language'],
  components: {
    CountriesTable
  },
  data () {
    return {
      countries: '',
      loading: true
    }
  },
  methods: {
    getCountries () {
      axios.get(`https://restcountries.eu/rest/v2/lang/${this.language}`)
      .then(response => {
        this.countries = response.data
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => this.loading = false)
    }
  },
  mounted: function () {
    this.getCountries()
  },
  watch: {
    $route: function () {
      this.loading = true;
      this.getCountries()
    }
  }
}
</script>