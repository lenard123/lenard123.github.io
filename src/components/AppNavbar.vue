<template>
<nav 
  class="fixed top-0 w-screen text-gray-100 bg-purple-900 z-20" 
  :class="{'shadow-md':showShadow}"
  :style="{minHeight: navbarHeight}"
  >
  <div class="container mx-auto px-5 flex flex-col md:flex-row justify-between">
    <div class="flex justify-between" :style="{minHeight: navbarHeight}">

      <!-- Brand -->
      <a href="#header" class="text-lg font-bold text-gray-50 max-h-8 my-auto">
        Lenard 
        <span class="md:hidden">M.</span>
        <span class="hidden md:inline">Mangay-ayam</span>
      </a>

      <!-- Toggler -->
      <a @click="isNavbarOpen = !isNavbarOpen" class="my-auto md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isNavbarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
        </svg>
      </a>

    </div>

    <!-- Nav links -->
    <div class="w-screen md:block md:w-auto -ml-5" :class="{'hidden': !isNavbarOpen }">
      <ul class="flex flex-col text-md py-12 md:flex-row md:py-0" :style="{minHeight: navbarHeight}">

        <AppNavbarLink
          label="About"
          link="#about"
          :isActive="activeLink === 'about'"
        />

        <AppNavbarLink 
          label="Skills" 
          link="#skills" 
          :isActive="activeLink === 'skills'"
        />
        
        <AppNavbarLink 
          label="Portfolio" 
          link="#portfolio" 
          :isActive="activeLink === 'portfolio'"
        />
        
        <AppNavbarLink 
          label="Contact"
          link="#contact"
          :isActive="activeLink === 'contact'"/>

        <AppNavbarLink label="Blog" link="/blog"/>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>

import { ref, computed } from 'vue'

import AppNavbarLink from './AppNavbarLink.vue'

import scrollSpy from '../features/scrollSpy.js'

export default {

  name: 'AppNavbar',

  components: { AppNavbarLink },

  props: {
    sections: {
      type: Array,
      default: []
    }
  },

  setup({ sections }){
    const isNavbarOpen = ref(false)

    const { scrollPosition, activeLink } = scrollSpy(sections)

    const navbarHeight = computed(()=> scrollPosition.value > 10 ? '60px' : '80px')
    const showShadow = computed(()=> scrollPosition.value > 10)

    return {
      isNavbarOpen,
      showShadow,
      navbarHeight,
      activeLink
    }
  }
}
</script>