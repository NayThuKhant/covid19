<template>
  <div class="w-full flex flex-col border-b border-gray-400 select-none shadow-none focus:outline-none outline-none focus:shadow-none cursor-pointer">
    <div class="flex py-3 px-2 justify-between items-center hover:bg-gray-300 rounded-full" @click="data_expended = !data_expended" v-if="header">
      <img class="h-6" :src="`https://www.countryflags.io/${country.CountryCode}/flat/64.png`">
      <div class="flex flex-1 justify-between items-center">
        <span v-text="country.Country" class="pl-2 lg:text-lg md:text-base text-sm"></span>
        <span class="lg:text-lg md:text-base text-sm" v-text="country.TotalConfirmed"></span>
      </div>
      <i class="fa fa-angle-right pl-2" aria-hidden="true"></i>
    </div>

    <div class="flex flex-wrap select-none focus:outline-none" v-if="data_expended">
      <div class="lg:w-1/3 md:w-full sm:w-full w-full mb-2 p-2 hover:shadow-lg rounded-lg">
        <div class="rounded-lg flex flex-col h-32 items-center justify-center bg-gray-200 text-gray-800 ">
          <span>New Confirmed</span>
          <span class="text-3xl font-bold" v-text="country.NewConfirmed"></span>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-full sm:w-full w-full mb-2 p-2 hover:shadow-lg rounded-lg">
        <div class="rounded-lg flex flex-col h-32 items-center justify-center bg-gray-200 text-gray-800 ">
          <span>Total Confirmed</span>
          <span class="text-3xl font-bold" v-text="country.TotalConfirmed"></span>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-full sm:w-full w-full mb-2 p-2 hover:shadow-lg rounded-lg">
        <div class="rounded-lg flex flex-col h-32 items-center justify-center bg-green-200 text-green-800 ">
          <span>New Recovered</span>
          <span class="text-3xl font-bold" v-text="country.NewRecovered"></span>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-full sm:w-full w-full mb-2 p-2 hover:shadow-lg rounded-lg">
        <div class="rounded-lg flex flex-col h-32 items-center justify-center bg-green-200 text-green-800 ">
          <span>Total Recovered</span>
          <span class="text-3xl font-bold" v-text="country.TotalRecovered"></span>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-full sm:w-full w-full mb-2 p-2 hover:shadow-lg rounded-lg">
        <div class="rounded-lg flex flex-col h-32 items-center justify-center bg-red-200 text-red-800 ">
          <span>New Death</span>
          <span class="text-3xl font-bold" v-text="country.NewDeaths"></span>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-full sm:w-full w-full mb-2 p-2 hover:shadow-lg rounded-lg">
        <div class="rounded-lg flex flex-col h-32 items-center justify-center bg-red-200 text-red-800 ">
          <span>Total Death</span>
          <span class="text-3xl font-bold" v-text="country.TotalDeaths"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CountryComponent",
  props: {
    country: Object,
    header: Boolean,
    expended: Boolean
  },
  data() {
    return {
      data_expended : this.expended,
    }
  },
}
</script>

<style scoped>

</style>