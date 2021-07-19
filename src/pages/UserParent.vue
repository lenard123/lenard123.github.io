<template>
  <Loading v-if="fetchState === ('LOADING')" class="h-screen"/>

  <NetworkError v-else-if="fetchState === ('ERROR')" :show-retry="true" @retry="fetchPosts"/>

  <div id="user-body" v-else-if="fetchState === 'SUCCESS'">
    <NavBar />
    <div class="w-full flex-grow">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>

import NavBar from './components/Navbar.vue'
import Footer from './components/Footer'
import Loading from '@/components/Loading.vue'
import NetworkError from '@/components/NetworkError.vue'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    NavBar, Footer, Loading, NetworkError
  },

  setup() {
    const store = useStore()

    const posts = computed(() => store.state.posts)
    const fetchState = ref('INIT')

    const fetchPosts = async() => {
      try {
        fetchState.value = 'LOADING'
        await store.dispatch('fetchPosts')
        fetchState.value = 'SUCCESS'
      } catch (err) {
        console.log(err)
        fetchState.value = 'ERROR'
      }
    }

    onMounted(() =>{
      fetchPosts()
    })

    return { posts, fetchPosts, fetchState }    
  }
}
</script>