<template>

<Loading v-if="!hasInitialized" class="h-screen"/>

<div class="leading-normal tracking-normal" id="admin-body" v-else>
  <div class="flex flex-wrap">

    <Sidebar :sideBarOpen="sideBarOpen"/>

    <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">

      <Navbar :sideBarOpen="sideBarOpen" @toggleSidebar="toggleSidebar"/>

      <div class="p-6 bg-gray-100 mb-20">
        <router-view />
      </div>

      <Footer />

    </div>
  </div>
</div>
</template>

<style type="text/css" scoped>
#admin-body {
    font-family: Poppins, sans-serif;
}

#admin-body::-webkit-scrollbar {
    display: none;
}

.overlay {
    position: relative; 
}

/* 1024 -1 so it doesnt show when it hits 1024px */
@media only screen and (max-width: 1023px) {
    .overlay:after {
        content: " ";
        z-index: 29;
        display: block;
        height: 100%;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        pointer-events: none;
        position: fixed;
    }
}
</style>

<script>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

import { ref, onMounted } from 'vue'
import { useAuthBinder } from '@/mixins'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'

import { unsubcribeToMessage } from '@/firebase/message.js'

export default {

  components: { Sidebar, Navbar, Footer, Loading },

  setup() {
    const store = useStore()
    const router = useRouter()
    const { hasInitialized, hasUser, userChanged } = useAuthBinder()

    const sideBarOpen = ref(false)

    //Route Guard
    if (hasInitialized.value && !hasUser.value) {
      router.push({name: 'AdminLogin'})
    }

    userChanged((hasUser) => {
      if (!hasUser) {
        router.push({name: 'AdminLogin'})
        unsubcribeToMessage()
      }
    })

    onMounted(()=>{
      store.dispatch('bindMessage')
    })

    const toggleSidebar = () => {
      sideBarOpen.value = !sideBarOpen.value
    }

    return {
      sideBarOpen,
      toggleSidebar,
      hasInitialized,
      userChanged
    }
  }
}
</script>