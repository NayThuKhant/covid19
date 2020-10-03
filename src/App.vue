<template>
  <div class="relative">
    <navigation></navigation>
    <div class="container-fluid p-5 flex justify-between">
      <div class="w-full mx-auto min-h-screen m-3">
        <router-view></router-view>
      </div>
    </div>



  </div>
</template>
<script>
import Navigation from "@/components/Navigation";


export default {
  name: 'App',
  data() {
    return {
      Countries: []
    }
  },
  components: {
    Navigation,

  },

  created() {

  },
}
</script>
<style>

</style>
