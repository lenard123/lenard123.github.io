<template>
  <Loading v-if="isPageStatus('LOADING')" class="py-40"/>
  <NetworkError v-else-if="isPageStatus('ERROR')" :show-retry="true" @retry="fetchPost"/>
  <div v-else-if="isPageStatus('SUCCESS')" class=" container w-full md:max-w-3xl mx-auto pt-20">

    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">

      <!--Title-->
      <div class="font-sans">
        <div class="text-center lg:text-left">
          <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{{ post.title }}</h1>
          <p class="text-sm md:text-base font-normal text-gray-600">Published {{ parseDate(post.createdAt) }}</p>
        </div>

        <p class="py-6 text-justify">
          {{ post.description }}
        </p>

        <!-- <p class="py-6 text-justify" v-html="parsePost(post.content)"></p> -->
        <div class="ck-content mb-4" v-html="convertOembed(post.content)"></div>

        <div class="py-4 xl:py-8">
          <h2 class="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Tags</h2>
          <div class="flex flex-wrap">
            <Tag v-for="tag in post.tags" :key="tag" :tag="tag" />
            <!--
            <a class="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400" href="/tags/musings">musings</a>
            <a class="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400" href="/tags/notes">notes</a>-->
          </div>
        </div>

        <p class="text-base md:text-sm text-green-500 font-bold">&lt; <router-link to="/" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">BACK TO HOME</router-link></p>
      </div>

    </div>

  </div>

</template>

<script>

import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'

import Loading  from '@/components/Loading.vue'
import NetworkError from '@/components/NetworkError.vue'
import Tag from '@/components/Tag.vue'

import { getPost } from '@/firebase/post.js'

import { parseDate, scrollToTop, setPageTitle, convertOembed } from '@/util'
import { usePageStateManager } from '@/mixins'

export default{

  components: { Loading, NetworkError, Tag },

  setup() {

    const { setPageStatus, isPageStatus } = usePageStateManager()

    const route = useRoute()

    const id = route.params.id

    const post = reactive({})

    const fetchPost = async() => {
      try {
        setPageStatus('LOADING')

        const result = await getPost(id)
        Object.assign(post, result)

        setPageStatus('SUCCESS')
        setPageTitle(post.title)

      } catch (error) {
        console.log(error)
        setPageStatus('ERROR')
      }
    }

    onMounted(async () => {
      scrollToTop()
      await fetchPost()
    })

    return { post, fetchPost, parseDate, isPageStatus, convertOembed}
  }
}
</script>