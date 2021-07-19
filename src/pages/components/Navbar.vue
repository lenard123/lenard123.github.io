<template>
  <nav class="navbar bg-white" :class="{'shadow': !isOnTop}">
    <div class="navbar-content-wrapper">

      <!-- Navbar Brand -->
      <router-link class="navbar-brand" to="/">
        Simple Blog
      </router-link>


      <!-- Toggler -->
      <div class="block md:hidden pr-4">
        <button id="nav-toggle" class="navbar-menu" @click="toggle">

          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" v-if="!isOn">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" v-else>
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>

        </button>
      </div>

      <!-- Navlinks -->
      <div 
        class="navbar-content bg-white" 
        :class="{'hidden': !isOn}" 
      >

        <ul class="navbar-links">

          <li class="mr-3">
            <router-link 
              :to="{name: 'Home'}"
              v-slot="{href, isExactActive}"
              custom
              >
              <a 
                :href="href" 
                class="navbar-links-item"
                :class="{'router-link-active':isExactActive}"
              >Home</a>
            </router-link>
          </li>

          <li class="mr-3">
            <router-link class="navbar-links-item" :to="{name: 'TagList'}">Tags</router-link>
          </li>

          <li class="mr-3">
            <router-link class="navbar-links-item" :to="{name: 'ProjectList'}">Projects</router-link>
          </li>

          <li class="mr-3">
            <router-link class="navbar-links-item" :to="{name: 'Contact'}">Contact</router-link>
          </li>

        </ul>        

      </div>

    </div>
  </nav>
</template>

<script>

import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToggler } from '@/mixins'

export default{

  setup() {

    const route = useRoute()
    const { isOn, setOff, toggle } = useToggler(false)

    const isOnTop = ref(true)

    onMounted(() => {
      document.addEventListener('scroll', function() {
        isOnTop.value = window.scrollY <= 10
      });
    })

    watch(() => route.path, () => {
      setOff()
    })

    return { isOnTop, isOn, toggle }
  }
}
</script>