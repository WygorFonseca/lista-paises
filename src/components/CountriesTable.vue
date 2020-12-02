<template>
  <div>
    <input type="text" class="form-control mb-3" placeholder="Digite o nome do país para buscar" :value="search" @input="e => search = e.target.value">
    <table class="table" v-if="pagedCountries.length != 0">
      <thead>
        <tr>
          <th>
            <i class="fas fa-flag"></i>
          </th>
          <th>País</th>
          <th>Regiao</th>
          <th></th>
        </tr>
      </thead>
      <transition-group name="countries-list" tag="tbody">
        <tr v-for="(country, index) in pagedCountries" v-bind:key="'pais_' + index">
          <!-- <td scope="row">{{ index }}</td> -->
          <td class="align-middle" v-if="canLoadImage">
            <img :src="country.flag" :alt="'Bandeira_' + country.name" width="25" class="rounded shadow-sm">
          </td>
          <td class="align-middle" v-else>
            <div style="width: 25px; height: 16px" class="css-selector rounded">

            </div>
          </td>
          <td class="align-middle">{{ country.translations.br }}</td>
          <td class="align-middle">{{ country.region }}</td>
          <td class="align-middle">
            <router-link :to="'/detalhes/' + country.alpha2Code" tag="button" class="btn btn-sm btn-primary">
              <div class="d-flex flex-row align-items-center">
                <i class="fas fa-eye"></i> <span class="d-none d-sm-block ml-2">Ver detalhes</span>
              </div>
            </router-link>
          </td>
        </tr>
      </transition-group>
    </table>
    <div class="text-center" v-else>
      <p class="mb-0">
        <i class="fas fa-frown"></i> Nenhum resultado encontrado
      </p>
    </div>
    <nav aria-label="Navegação por páginas" v-if="pages != 0">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="page == 1 ? 'disabled' : ''">
          <a class="page-link" @click="page != 1 ? page-- : ''"><i class="fas fa-angle-double-left"></i></a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            <b>{{ page }}</b> de <b>{{ pages }}</b>
          </a>
        </li>
        <li class="page-item" :class="page == pages ? 'disabled' : ''">
          <a class="page-link" @click="page >= pages ? '' : page++"><i class="fas fa-angle-double-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>  
</template>

<script>
export default {
  props: ['countries'],
  data () {
    return {
      page: 1,
      search: '',
      canLoadImage: true,
      pageTransitionFinished: true,
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.filteredCountries.length / 10)
    },
    filteredCountries () {
      const search = this.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

      return this.countries.filter(country => {
        const countryName = country.translations.br.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        return countryName.startsWith(search) || countryName.includes(search)
      }).sort((a, b) => {
        const A_brname = a.translations.br.toLowerCase()
        const B_brname = b.translations.br.toLowerCase()

        if(search != ''){
          return A_brname.startsWith(this.search.toLowerCase()) ? -1 : 1
        }

        return (A_brname > B_brname) ? 1 : (B_brname > A_brname) ? -1 : 1
      })
    },
    pagedCountries () {
      return this.filteredCountries.slice((this.page - 1) * 10, 10 * this.page)
    }
  },
  watch: {
    search (text) {
      this.page = 1

      this.canLoadImage = false

      setTimeout(() => {
        if(text == this.search) this.canLoadImage = true
      }, 800)
    },
    page (to) {
      this.canLoadImage = false
      this.pageTransitionFinished = false

      setTimeout(() => {
        if(to == this.page) {
          this.canLoadImage = true
          this.pageTransitionFinished = true
        }
      }, 500)
    }
  }
}
</script>