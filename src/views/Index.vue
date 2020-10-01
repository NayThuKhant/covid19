<template>
  <div class="flex min-h-screen">
    <div
        class="countries_list cursor-pointer select-none w-1/3 lg:block hidden flex flex-col bg-gray-300 px-4 pt-8 rounded-lg">
      <div class="w-full h-12 flex bg-green-200 px-5 mb-5 items-center rounded-full bg-gray-200"
           style="background: white">
        <div class="flex-1">
          <input v-model="search_value" type="text" class="w-full h-12 focus:outline-none"
                 placeholder="Search...">
        </div>
        <div class="px-2">
          <i class="fa fa-search" aria-hidden="true" style="font-size: 1.5rem"></i>
        </div>
      </div>
      <div>
        <div class="w-full px-2 py-4 flex justify-between items-center border-b border-gray-400 hover:bg-white"
             @click="select(global)">
          <i class="fa fa-globe mr-2" aria-hidden="true" style="font-size: 2rem"></i>
          <div class="flex flex-1 justify-between">
            <span v-text="global.Country"></span>
            <span class="" v-text="global.TotalConfirmed"></span>
          </div>
          <i class="fa fa-angle-right pl-6 pr-2" aria-hidden="true"></i>
        </div>

        <div class="w-full p-4 my-10 flex justify-between items-center" v-if="searched_countries.length < 1">
          <h2 class="text-center w-full">Oops! Country not found</h2>
        </div>

        <div class="w-full px-2 py-4 flex justify-between items-center border-b border-gray-400 hover:bg-white"
             v-for="(country, index) in searched_countries" :key="index" @click="select(country)">
          <img class="h-6 mr-2" :src="`https://www.countryflags.io/${country.CountryCode}/flat/64.png`" >
          <div class="flex flex-1 justify-between">
            <span v-text="country.Country"></span>
            <span class="" v-text="country.TotalConfirmed"></span>
          </div>
          <i class="fa fa-angle-right pl-6 pr-2" aria-hidden="true"></i>
        </div>
      </div>

    </div>

    <div class="lg:w-2/3 md:w-2/3 sm:flex-1 flex flex-1 flex-col px-3">
      <div class="flex justify-between bg-gray-300 px-3 rounded-lg mb-4 mx-2 items-center">
        <i class="fa fa-globe" aria-hidden="true" v-if="global_icon" style="font-size: 5rem"></i>
        <img class="h-20 border" :src="flag" v-if="!global_icon">
        <h1 class="text-2xl font-bold" v-text="selected_value.Country"></h1>
      </div>

      <country-component :country="selected_value" :header="false" expended="true"></country-component>


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
      global: [],
      flag: ''
    }
  },
  components : {
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
    }
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
            console.log(response.data)
            this.global = response.data.Global
            this.global.Country = 'Global'
            this.countries = response.data.Countries

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