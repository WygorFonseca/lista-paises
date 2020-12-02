<template>
  <div class="container animate__animated animate__bounce py-3 h-100">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 mx-2 mb-3 rounded bg-white p-3 shadow-sm" v-if="!loading">
        <h6>Filtre por blocos regionais</h6>
        <v-select :options="regionalBlocs" v-model="regionalBlocsSelected" label="name" multiple ></v-select>
      </div>
    </div>
    <div class="row justify-content-center">
      <transition name="fade-transition" mode="out-in">
        <div class="col-lg-5 col-md-10 col-10 mx-2 rounded bg-white p-3 shadow-sm text-center" v-if="loading" key="loading">
          <i class="fas fa-spinner fa-spin"></i> Carregando países, por-favor aguarde.
        </div>
        <div class="table-responsive col-lg-8 col-md-10 mx-2 rounded bg-white p-3 shadow-sm" v-else key="afterLoading">
          <CountriesTable :countries="filteredCountries" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountriesTable from './CountriesTable'

export default {
  components: {
    CountriesTable
  },
  data () {
    return {
      loading: true,
      countries: [],
      regionalBlocsSelected: []
    }
  },
  computed: {
    filteredCountries () {
      // [0, 2, 3].some(el => [1, 2].includes(el))
      if(this.regionalBlocsSelected.length > 0)
        return this.countries.filter(country => country.regionalBlocs.some(bloc => this.regionalBlocsSelected.map(el => el.acronym).includes(bloc.acronym)))
      else
        return this.countries
    },
    regionalBlocs () {
      // Lista de blocos regionais
      const allRegionalBlocs = this.countries.map(country => {
        return country.regionalBlocs.map(({ acronym, name }) => Object({ acronym, name }))
      })

      // Faz um merge de todos em um unico array
      const mergedRegionalBlocs = [].concat.apply([], allRegionalBlocs);

      // Remove os blocos regionais repetidos
      return [...new Set(mergedRegionalBlocs.map(bloc => bloc.acronym))]
      .map(bloc => mergedRegionalBlocs.find(allBlocs => allBlocs.acronym == bloc));
    }
  },
  methods: {
    getCountries () {
      setTimeout(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(({ data }) => {
          this.countries = data
          console.log(data.map(el => el.timezones[0]))
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => this.loading = false)
      }, 500)
    }
  },
  mounted: function () {
    this.getCountries()
  }
}
</script>