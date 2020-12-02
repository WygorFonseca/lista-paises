<template>
  <div class="container py-3 h-100">
    <transition name="fade-transition" mode="out-in">
      <div class="row h-100 mt-auto mb-auto justify-content-center" v-if="loading" key="loading">
        <div class="col-lg-5 col-md-10 col-10 rounded bg-white p-3 shadow-sm my-auto text-center">
          <i class="fas fa-spinner fa-spin"></i> Carregando países, por-favor aguarde.
        </div>
      </div>
      <div class="row h-100 my-auto justify-content-center" v-else-if="!error" key="afterLoading">
        <div class="col-lg-8 table-responsive my-auto col-md-10 col-11 rounded bg-white p-3 shadow-sm">
          <div class="d-flex flex-row align-items-center mb-3">
            <button @click="$router.go(-1)" class="btn btn-sm">
              <i class="fa fa-arrow-left"></i>
            </button>
            <h6 class="mb-0 ml-1" v-if="languageName">
              {{ countries.length }} País{{ countries.length != 1 ? 'es' : '' }} que fala{{ countries.length != 1 ? 'm' : '' }} {{ languageName }}
            </h6>
          </div>
          <CountriesTable :countries="countries" />
        </div>
      </div>
      <div class="row h-100 my-auto justify-content-center" v-else key="afterLoadingError">
        <div class="col-lg-5 col-md-10 col-10 rounded bg-white p-3 shadow-sm my-auto text-center">
          <p>
            <i class="fas fa-times"></i> Ops! Houve um erro ao carregar!
          </p>
          <router-link to="/" tag="button" class="btn btn-sm btn-primary">
            <i class="fa fa-home"></i> Voltar ao início
          </router-link>
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
      loading: true,
      error: false,
    }
  },
  computed: {
    languageName () {
      const firstCountry = this.countries[0];

      if(firstCountry){
        return firstCountry.languages[0].name + " - " + firstCountry.languages[0].nativeName
      }

      return null
    }
  },
  methods: {
    getCountries () {
      axios.get(`https://restcountries.eu/rest/v2/lang/${this.language}`)
      .then(response => {
        this.countries = response.data
      })
      .catch(error => {
        this.error = true
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
      this.error = false;
      this.getCountries()
    }
  }
}
</script>