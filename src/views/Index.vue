<template>
  <div class="flex min-h-screen">
    <div
        class="cursor-pointer select-none w-1/3 lg:block hidden flex flex-col bg-gray-300 px-4 pt-8 rounded-lg h-screen overflow-scroll">
      <div class="w-full h-12 flex bg-green-200 px-5 mb-5 items-center rounded-full bg-gray-200"
           style="background: white">
        <div class="flex-1">
          <input id="search" v-model="search_value" type="text" class="w-full h-12 focus:outline-none"
                 placeholder="Search...">
        </div>
        <div class="px-2">
          <label for="search"><i class="fa fa-search" aria-hidden="true" style="font-size: 1.5rem"></i></label>
        </div>
      </div>
      <div>
        <div
            class="w-full px-2 py-4 flex justify-between items-center rounded-full border-b border-gray-400 hover:bg-white"
            @click="select(global)" :class="{'bg-blue-500' : global === selected_value }">
          <i class="fa fa-globe mr-2" aria-hidden="true" style="font-size: 2rem"></i>
          <div class="flex flex-1 justify-between">
            <span v-text="global.Country"></span>
            <span class="" v-text="global.TotalConfirmed"></span>
          </div>
          <i class="fa fa-angle-right pl-6 pr-2" aria-hidden="true"></i>
        </div>
        <div
            class="w-full px-2 py-4 flex justify-between items-center rounded-full border-b border-gray-400 hover:bg-white"
            @click="select(local)" :class="{'bg-blue-500' : local === selected_value }">
          <img class="h-6 mr-2" :src="`https://www.countryflags.io/mm/flat/64.png`">
          <div class="flex flex-1 justify-between">
            <span v-text="local.Country"></span>
            <span class="" v-text="local.TotalConfirmed"></span>
          </div>
          <i class="fa fa-angle-right pl-6 pr-2" aria-hidden="true"></i>
        </div>

        <div class="w-full p-4 my-2 flex flex-col justify-between items-center text-red-400">
          <h2 class="text-center w-full">Countries are sorted by confirmed cases</h2>
          <span class="text-sm flex items-center justify-center text-red-400">updated on {{date}}</span>
        </div>

        <div class="w-full p-4 my-10 flex justify-between items-center" v-if="searched_countries.length < 1">
          <h2 class="text-center w-full">Oops! Country not found</h2>
        </div>

        <div
            class="w-full px-2 py-4 flex justify-between items-center rounded-full border-b border-gray-400 hover:bg-white"
            v-for="(country, index) in searched_countries" :key="index" @click="select(country)" :class="{'bg-blue-500' : country === selected_value }">
          <img class="h-6 mr-2" :src="`https://www.countryflags.io/${country.CountryCode}/flat/64.png`">
          <div class="flex flex-1 justify-between">
            <span v-text="country.Country"></span>
            <span class="" v-text="country.TotalConfirmed"></span>
          </div>
          <i class="fa fa-angle-right pl-6 pr-2" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="lg:w-2/3 md:w-2/3 sm:flex-1 flex flex-1 flex-col px-3 mb-20">
      <div class="flex justify-between bg-gray-300 px-3 rounded-lg mb-4 mx-2 items-center hover:shadow-lg">
        <i class="fa fa-globe" aria-hidden="true" v-if="global_icon" style="font-size: 5rem"></i>
        <img class="h-20 border" :src="flag" v-if="!global_icon">
        <h1 class="text-2xl font-bold" v-text="selected_value.Country"></h1>
      </div>
      <country-component :country="selected_value" :header="false" expended="true"></country-component>
      <span class="text-sm flex items-center justify-center text-white">updated on {{date}}</span>

      <div class="bg-gray-200 h-20 py-2 flex flex-col items-center select-none shadow-xl lg:hidden block"
           style="position: fixed; left: 0; bottom: 0; width: 100%">
        <div class="flex-1 flex items-center w-full px-8">
          <div class="mx-2 cursor-pointer flex items-center flex-1 justify-center h-10 rounded-full outline-none" @click="select(global)" :class="{'bg-blue-500' : global === selected_value }">
            <i class="fa fa-globe mr-1" aria-hidden="true" style="font-size: 2rem"></i><span>Global</span>
          </div>
          <div class="mx-2 cursor-pointer flex items-center flex-1 justify-center h-10 rounded-full" @click="select(local)" :class="{'bg-blue-500' : local === selected_value }">
            <img class="h-10 mr-1" :src="`https://www.countryflags.io/mm/flat/64.png`"><span>Myanmar</span>
          </div>
        </div>
        <span class="text-sm text-red-300">updated on {{date}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import CountryComponent from "@/components/CountryComponent";

export default {
  name: "Global",
  data() {
    return {
      search_value: '',
      selected_value: '',
      searched_countries: [],
      countries: [],
      global: {},
      local: {},
      flag: '',
      date: '',

    }
  },
  components: {
    CountryComponent
  },

  created() {
    this.fetchGlobalData()
  },
  computed: {
    sortedCountries() {
      return _.sortBy(this.countries, ['TotalConfirmed']).reverse()
    },
    global_icon() {
      return this.flag === ''
    },
  },

  watch: {
    search_value() {
      if (!this.search_value) {
        this.selected_value = this.global
        this.flag = ''
      }
      this.search()
    },
  },

  methods: {
    fetchGlobalData() {
      window.axios.get('https://api.covid19api.com/summary')
          .then((response) => {
            this.global = response.data.Global
            this.global.Country = 'Global'
            this.countries = response.data.Countries
            this.date = response.data.Date
            this.setLocal()
            this.selected_value = this.global
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
    },
    setLocal() {
      this.local = this.countries.filter(country => {
        return country.Country.toLowerCase() === 'myanmar'
      })[0]
    },
    select(country) {
      this.selected_value = country
      if (country === this.global) {
        this.flag = ''
      } else {
        this.flag = `https://www.countryflags.io/${country.CountryCode}/flat/64.png`
      }
    }
  }

}
</script>

<style scoped>

</style>