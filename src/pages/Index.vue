<template>

  <div class="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 pt-20">

    <div class="pt-6 pb-8 space-y-2 md:space-y-5">

      <h1 class="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">All Posts</h1>

      <div class="relative max-w-lg">
        <input aria-label="Search articles" type="text" placeholder="Search articles" class="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100">

        <svg class="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

      </div>
    </div>

    <div class="border-t border-gray-300 mb-8">
      <Post v-for="post in posts" :post="post" :key="post.id"/>

      <div v-if="posts.length === 0">
        No post has been published yet.  
      </div>

    </div>

  </div>

</template>


<script>

import { onMounted, computed } from 'vue'
import Post from './components/Post.vue'
import { scrollToTop, setPageTitle } from '@/util'
import { useStore } from 'vuex'

export default {

  components: {
    Post,
  },


  setup() {
    const store = useStore()
    const posts = computed(() => store.state.posts)

    onMounted(() =>{
      scrollToTop()
      setPageTitle("My Personal Blog")
    })

    return { posts }

  }
}
</script>