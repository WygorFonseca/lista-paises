<template>
  <div class="container py-3 h-100">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 mx-2 mb-3 rounded bg-white p-3 shadow-sm" v-if="!loading && !error">
        <h6>Filtre por blocos regionais</h6>
        <v-select :options="regionalBlocs" v-model="regionalBlocsSelected" label="name" multiple ></v-select>
      </div>
    </div>
    <div class="row justify-content-center">
      <transition name="fade-transition" mode="out-in">
        <div class="col-lg-5 col-md-10 col-10 mx-2 rounded bg-white p-3 shadow-sm text-center" v-if="loading" key="loading">
          <i class="fas fa-spinner fa-spin"></i> Carregando países, por-favor aguarde.
        </div>
        <div class="col-lg-5 col-md-10 col-10 mx-2 rounded bg-white p-3 shadow-sm text-center" v-else-if="error" key="afterLoadingError">
          <p><i class="fas fa-times"></i> Ops. Houve um erro ao carregar.</p>
          <button class="btn btn-sm btn-primary" @click="getCountries()">
            <i class="fa fa-sync"></i> Tentar novamente.
          </button>
        </div>
        <div class="table-responsive-sm col-lg-8 col-md-10 mx-2 rounded bg-white p-3 shadow-sm mb-5" v-else key="afterLoading">
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
      error: false,
      loading: true,
      countries: [],
      regionalBlocsSelected: []
    }
  },
  computed: {
    filteredCountries () {
      if(this.regionalBlocsSelected.length > 0) // Filtra por blocos regionais caso algum tenha sido selecionado
        return this.countries.filter(country => {
          return country.regionalBlocs.some(bloc => this.regionalBlocsSelected.map(el => el.acronym).includes(bloc.acronym))
        })
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
      this.loading = true;
      this.error = false;

      setTimeout(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(({ data }) => {
          this.countries = data
        })
        .catch(() => {
          this.error = true
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