<template>
  <div class="container-fluid flex flex-col sticky top-0 shadow-lg relative">
    <div class="container-fluid bg-gray-300 flex items-center">
      <ul class="container mx-auto flex flex-wrap justify-between h-16 text-xl items-center select-none flex-1">
        <a href="/" class="flex items-center jump">
          <img src="../../public/img/coronavirus.png" class="w-12 h-12"/>
          <span>COVID 19</span>
        </a>

        <router-link :to="{name : 'Index'}" class="lg:block hidden">
          <i class="fa fa-home mr-2" aria-hidden="true" style="font-size: 1.5rem"></i>HOME
        </router-link>

        <router-link :to="{name : 'Countries'}" class="lg:block hidden">
          <i class="fa fa-globe mr-2" aria-hidden="true" style="font-size: 1.5rem"></i>COUNTRIES
        </router-link>

        <router-link :to="{name : 'About'}" class="lg:block hidden">
          <i class="fa fa-users mr-2" aria-hidden="true" style="font-size: 1.5rem"></i>ABOUT US
        </router-link>


        <div class="lg:hidden block">
          <i class="cursor-pointer fa fa-bars px-10" aria-hidden="true" style="font-size: 2rem"
             v-if="!expanded" @click="expanded=true"></i>
          <i class="cursor-pointer fa fa-times px-10" aria-hidden="true" style="font-size: 2rem"
             v-if="expanded" @click="expanded=false"></i>
        </div>
      </ul>
    </div>

    <div
        class="lg:hidden block container-fluid bg-gray-300 flex flex-col items-center absolute w-full transition duration-200 ease-in-out"
        style="top:4rem" v-if="expanded">
      <router-link @click="expanded=false" :to="{name : 'Index'}"
                   class="w-full flex justify-center items-center h-16 py-2 border-b border-white">
        <i class="fa fa-home mr-2" aria-hidden="true" style="font-size: 1.5rem"></i>HOME
      </router-link>
      <router-link @click="expanded=false" :to="{name : 'Countries'}"
                   class="w-full flex justify-center items-center h-16 py-2 border-b border-white">
        <i class="fa fa-globe mr-2" aria-hidden="true" style="font-size: 1.5rem"></i>COUNTRIES
      </router-link>
      <router-link @click="expanded=false" :to="{name : 'About'}"
                   class="w-full flex justify-center items-center h-16 py-2 border-b border-white">
        <i class="fa fa-users mr-2" aria-hidden="true" style="font-size: 1.5rem"></i>ABOUT US
      </router-link>

    </div>

  </div>
</template>

<script>
export default {
  name: "Navigation",
  created() {

  },
  data() {
    return {
      expanded: false
    }
  },
  computed() {

  }
}
</script>

<style scoped>
@keyframes jump {
  0% {
    transform: translate3d(0, -30, 0) scale3d(1, 1, 1);
  }
  50% {
    transform: translate3d(0, 0%, 0) scale3d(.7, 1.2, 1);
  }
  100% {
    transform: translate3d(0, 30%, 0) scale3d(1.5, .7, 1);
  }
}

.jump {
  transform-origin: 50% 50%;
  animation: jump .5s linear alternate infinite;
}

.router-link-active{
  color:green;
}
</style>