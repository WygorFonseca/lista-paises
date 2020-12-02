<template>
  <div class="container py-3 h-100">
    <div class="row h-100 mt-auto mb-auto justify-content-center">
      <transition name="fade-transition" mode="out-in">
        <div class="col-lg-5 col-md-10 col-10 rounded bg-white p-3 shadow-sm my-auto text-center" v-if="loading" key="loading">
          <i class="fas fa-spinner fa-spin"></i> Carregando detalhes, por-favor aguarde.
        </div>
        <div class="col-lg-8 col-md-10 col-11 mb-3 rounded bg-white p-3 shadow-sm my-auto" v-else-if="!error && country" key="afterLoading">
          <div class="d-flex flex-row align-items-center border-bottom border-light mb-2 pb-2">
            <img :src="country.flag" alt="Bandeira" width="30" class="rounded mr-2 shadow-sm">
            <h6 class="mb-0">{{ country.translations.br }} &middot; {{ country.alpha2Code }}</h6>
            <router-link to="/" class="ml-auto btn btn-sm btn-primary" tag="button">
              <i class="fa fa-home"></i> Início
            </router-link>
          </div>
          <!-- Cards -->
          <section class="row no-gutters mb-2">
            <div class="col-6 col-sm-3 p-1 pl-sm-0">
              <div class="bg-light p-3 rounded text-center border-gray border">
                <i class="fas fa-lg fa-globe"></i>
                <h6 class="mb-0 mt-2">Região</h6>
                <small>{{ country.region ? country.region : "N/A" }}</small>
              </div>
            </div>
            <div class="col-6 col-sm-3 p-1">
              <div class="bg-light p-3 rounded text-center border-gray border">
                <i class="fas fa-lg fa-map"></i>
                <h6 class="mb-0 mt-2">Área</h6>
                <small>{{ formatArea(country.area) }}</small>
              </div>
            </div>
            <div class="col-6 col-sm-3 p-1">
              <div class="bg-light p-3 rounded text-center border-gray border">
                <i class="fas fa-lg fa-flag"></i>
                <h6 class="mb-0 mt-2">Capital</h6>
                <small>{{ country.capital ? country.capital : "N/A" }}</small>
              </div>
            </div>
            <div class="col-6 col-sm-3 p-1 pr-sm-0">
              <div class="bg-light p-3 rounded text-center border-gray border">
                <i class="fas fa-lg fa-users"></i>
                <h6 class="mb-0 mt-2">População</h6>
                <small>{{ country.population.toLocaleString('pt-BR') }}</small>
              </div>
            </div>
          </section>
          <section class="mb-4" v-if="country.altSpellings.length != 0">
            <h5>
              <i class="fas fa-sm fa-pen"></i> Ortografias
            </h5>
            <p class="mb-0">{{ commaSeparator(country.altSpellings) }}</p>
          </section>
          <section class="mb-3">
            <h5>
              <i class="fas fa-sm fa-money-bill"></i> Moeda utilizada
            </h5>
            <div v-for="(currency, index) in countryCurrencies" :key="'cur_'+index" class="bg-light rounded p-2 mb-2">
              {{ currency.name }} ({{ currency.code }}) - Símbolo: {{ currency.symbol }}
            </div>
          </section>
          <!-- Idiomas -->
          <section class="mb-4">
            <h5 class="mb-0">
              <i class="fas fa fa-language"></i> Idioma{{ country.languages.length === 1 ? "" : "s" }}
            </h5>
            <p class="mb-1 text-primary">
              <small><i class="fas fa-info-circle"></i> Selecione um idioma para ver mais países.</small>
            </p>
            <router-link tag="button" :to="`/idioma/${language.iso639_1}`" class="btn mt-1 btn-sm btn-primary mr-1" v-for="(language, index) in country.languages" v-bind:key="'language_' + index">
              {{ language.name }} - {{ language.nativeName }}
            </router-link>
          </section>
          <section class="mb-4" v-if="country.borders.length > 0">
            <h5 class="mb-0">
              <i class="fas fa-sm fa-map-signs"></i> Fronteira{{ country.borders.length === 1 ? "" : "s" }}
            </h5>
            <div v-if="!errorBorders && !loadingBorders">
              <p class="mb-1 text-primary">
                <small><i class="fas fa-info-circle"></i> Selecione para ver detalhes.</small>
              </p>
              <router-link tag="button" :to="`/detalhes/${borderCountry.alpha2Code}`" class="btn mt-1 btn-sm btn-light border-gray border mr-1" v-for="(borderCountry, index) in borderCountriesData" v-bind:key="'fronteira_' + index">
                <img :src="borderCountry.flag" alt="bandeira" width="20">
                {{ borderCountry .name}}
              </router-link>
            </div>
            <div class="text-danger mt-2" v-else-if="errorBorders">
              <i class="fas fa-exclamation-triangle"></i> Erro ao carregar fronteiras.
              <a @click="getBorderCountries()" class="cursor-pointer">Tente novamente</a>
            </div>
            <div class="mt-2" v-else>
              <i class="fas fa-spinner fa-spin"></i> Carregando fronteiras...
            </div>
          </section>
          <section class="mb-4">
            <h5>
              <i class="fas fa-sm fa-clock"></i> Fuso Horários
            </h5>
            <p class="mb-0" v-for="(timezone, index) in country.timezones" v-bind:key="'tz_' + index">
              <strong>{{ timezone }}:</strong> {{ dateFromTimeZone(timezone) }}
            </p>
          </section>
          <!-- Outras informações -->
          <section class="mb-4">
            <h5>
              <i class="fas fa-sm fa-info-circle"></i> Outras informações
            </h5>
            <p class="mb-1" v-if="country.subregion">
              <b>Sub-região: </b> {{ country.subregion }}
            </p>
            <p class="mb-1" v-if="country.latlng.length != 0">
              <b>Latitude e Longitude: </b> {{ commaSeparator(country.latlng) }} - 
              <a :href="'https://www.google.com/maps/place/' + country.name" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
            </p>
            <p class="mb-1" v-if="country.callingCodes.length != 0">
              <b>Código de chamada: </b> {{ country.callingCodes.map(el => el != '' ? ('+' + el) : 'Não possui').join(', ') }}
            </p>
            <p class="mb-1" v-if="country.topLevelDomain.length != 0">
              <b>Top Level Domain (TLD): </b> {{ commaSeparator(country.topLevelDomain) }}
            </p>
            <!-- {{ country.altSpellings.join(', ') }} -->
          </section>
          <section class="mb-4" v-if="country.regionalBlocs.length != 0">
            <h5>
              <i class="fas fa-sm fa-landmark"></i> Blocos Regionais
            </h5>
            <p class="mb-1">
              <b>Abreviação: </b> {{ country.regionalBlocs[0].acronym }} - {{ country.regionalBlocs[0].name }}
            </p>
            <p class="mb-1" v-if="country.regionalBlocs[0].otherAcronyms.length != 0">
              <b>Outras abreviações: </b>
              <span class="badge badge-secondary mr-1" v-for="(acronym, index) in country.regionalBlocs[0].otherAcronyms" :key="`rboa_${index}`">{{ acronym }}</span>
            </p>
            <p class="mb-1" v-if="country.regionalBlocs[0].otherNames.length != 0">
              <b>Outros nomes: </b> {{ commaSeparator(country.regionalBlocs[0].otherNames) }}
            </p>
          </section>
        </div>
        <div class="col-lg-5 col-md-10 col-10 rounded bg-white p-3 shadow-sm my-auto text-center" v-else key="afterLoadingError">
          <p>
            <i class="fas fa-times"></i> Ops! Houve um erro ao carregar!
          </p>
          <router-link to="/" tag="button" class="btn btn-sm btn-primary">
            <i class="fa fa-home"></i> Voltar ao início
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['countryCode'],
  data () {
    return {
      error: false, // Erro ao carregar
      errorBorders: false, // Erro ao carregar fronteiras
      country: '',
      loading: true,
      loadingBorders: false, // Carregando fronteiras
      borderCountriesData: [] // Dados das fronteiras
    }
  },
  computed: {
    countryCurrencies () {
      return this.country.currencies.filter(currency => currency.code != null &&  currency.name != null)
    }
  },
  methods: {
    dateFromTimeZone (timezone) {
      let date = new Date();

      const hours = parseInt(timezone.substring(3, 6))
      const minutes = parseInt(timezone.substring(7, 9))

      if( !isNaN(hours) ) date.setHours(date.getHours() + hours)
      if( !isNaN(minutes) ) date.setMinutes(date.getMinutes() + minutes)

      return date.toLocaleString('pt-BR', { timeZone: 'UTC' })
    },
    formatArea (area) {
      if(area == null) return "Não definido";
      return area.toLocaleString('pt-BR') + ' m²'
    },
    commaSeparator (array) {
      return array.join(', ')
    },
    getBorderCountries () {
      if(this.country.borders.length > 0){
        this.errorBorders = false;
        this.loadingBorders = true;

        axios.get("https://restcountries.eu/rest/v2/alpha?codes=" + this.country.borders.join(';'))
        .then(({ data }) => {
          this.borderCountriesData = data.map(({ alpha2Code, translations, flag }) => {
            return { alpha2Code, name: translations.br, flag }
          });
        })
        .catch(() => {
          this.errorBorders = true;
        })
        .then(() => this.loadingBorders = false)
      }
    },
    getCountryByCode () {
      axios.get(`https://restcountries.eu/rest/v2/alpha/${this.countryCode}`)
      .then(response => {
        this.country = response.data
        this.getBorderCountries()
      })
      .catch(() => {
        this.error = true
      })
      .then(() => this.loading = false)
    }
  },
  mounted: function () {
    this.getCountryByCode()
  },
  watch: {
    $route: function () {
      this.loading = true;
      this.error = false;
      this.getCountryByCode()
    }
  }
}
</script>