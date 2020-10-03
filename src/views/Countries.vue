<template>
  <div class="w-full flex flex-col -mt-2">
    <div class="w-full flex bg-white px-10 mb-5 items-center rounded-full bg-gray-200">
      <div class="flex-1">
        <input id="search" @keyup="search" v-model="search_value" type="text"
               class="w-full h-12 focus:outline-none bg-gray-200"
               placeholder="Search...">
      </div>
      <div class="px-4">
        <label for="search"><i class="fa fa-search" aria-hidden="true" style="font-size: 1.5rem"></i></label>
      </div>
    </div>

    <div class="w-full p-4 my-2 flex flex-col justify-between items-center text-red-400">
      <h2 class="text-center w-full">Countries are sorted by confirmed cases</h2>
      <span class="text-sm flex items-center justify-center">updated on {{date}}</span>
    </div>

    <div class="w-full p-4 my-10 flex justify-between items-center" v-if="searched_countries.length < 1">
      <h2 class="text-center w-full">Oops! Country not found</h2>
    </div>

    <country-component v-for="(country, index) in searched_countries" :header="true" :key="index" :country="country"
                       :expended="false"></country-component>

    <!--    <div id="search_icon" class="fixed bg-green-300 p-3 hidden" style="bottom: 2rem; right: 2rem; border-radius: 50%">-->
    <!--      <i class="fa fa-search" aria-hidden="true" style="font-size: 3rem"></i>-->
    <!--    </div>-->
  </div>
</template>

<script>
import _ from 'lodash'
import CountryComponent from "@/components/CountryComponent";

export default {
  name: "Countries",
  data() {
    return {
      search_value: '',
      searched_countries: [],
      countries: [],
      date:''
    }
  },
  components: {
    CountryComponent
  },

  created() {
    this.fetchCountriesData()
  },

  computed: {
    sortedCountries() {
      return _.sortBy(this.countries, ['TotalConfirmed']).reverse()
    }
  },

  methods: {
    fetchCountriesData() {
      window.axios.get('https://api.covid19api.com/summary')
          .then((response) => {
            this.countries = response.data.Countries
            this.date = response.data.Date
            this.search()
          })
          .catch(e => {
            console.log(e)
          })
    },
    search() {
      if (!this.search_value) {
        this.searched_countries = this.sortedCountries
      } else {
        this.searched_countries = this.sortedCountries.filter(country => {
          return country.Country.toLowerCase().indexOf(this.search_value.toLowerCase()) !== -1
        })
      }
    }

  }
}
</script>

<style scoped>

</style>