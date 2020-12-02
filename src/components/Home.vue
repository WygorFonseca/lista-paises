<template>
  <div class="container animate__animated animate__bounce py-3 h-100">
    <div class="row h-100 mt-auto mb-auto justify-content-center">
      <transition name="fade-transition" mode="out-in">
        <div class="col-lg-5 col-md-10 col-10 mx-2 rounded bg-white p-3 shadow-sm my-auto text-center" v-if="loading" key="loading">
          <i class="fas fa-spinner fa-spin"></i> Carregando países, por-favor aguarde.
        </div>
        <div class="table-responsive col-lg-8 col-md-10 mx-2 rounded bg-white p-3 pt-4 shadow-sm my-auto" v-else key="afterLoading">
          <CountriesTable :countries="countriesFilter"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountriesTable from './CountriesTable'

export default {
  data () {
    return {
      page: 1,
      loading: true,
      searchCountry: '',
      countries: []
    }
  },
  computed: {
    countriesFilter () {
      return this.countries.filter(country => {
        const countryName = country.translations.br.toLowerCase();
        const search = this.searchCountry.toLowerCase();

        return countryName.startsWith(search) || countryName.includes(search)
      })
    }
  },
  components: {
    CountriesTable
  },
  methods: {
    getCountries () {
      setTimeout(() => {
      axios.get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => {
        this.countries = data
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => this.loading = false)
      }, 1500)
    }
  },
  mounted: function () {
    this.getCountries()
  }
}
</script>