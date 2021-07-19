<template>
  <div class="container w-full md:max-w-3xl mx-auto pt-20">
    
    <Loading class="py-40" v-if="isLoading"/>

    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" v-else>

      <div class="w-full relative h-0 border border-gray-300" style="padding-bottom: 56.25%;">
        <img :src="project.image" class="h-full w-full absolute top-0 left-0"/>
      </div>

      <div class="text-center lg:text-left">
        <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{{ project.name }}</h1>
        <p class="text-sm md:text-base font-normal text-gray-600">Published {{ moment(project.createdAt.toDate()).format('MMMM DD, YYYY') }}</p>
      </div>

      <p class="py-6 text-justify">
        {{ project.description }}
      </p>

      <div class="ck-content mb-4" v-html="convertOembed(project.details)">
      </div>

      <div class="py-4 xl:py-8">
        <h2 class="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Tags</h2>
        <div class="flex flex-wrap">
          <a class="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400">{{ project.tags }}</a>
        </div>
      </div>

      <p class="text-base md:text-sm text-green-500 font-bold">
        &lt; <router-link :to="{name:'ProjectList'}" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">BACK TO PROJECT LIST</router-link>
      </p>

    </div>
  </div>
</template>

<script>

import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProject } from '@/firebase/project.js'
import { convertOembed } from '@/util'
import moment from 'moment'

export default {

  components: { Loading },

  setup() {

    const route = useRoute()
    const id = route.params.id

    const isLoading = ref(true)
    const project = ref(null)

    onMounted(async() => {
      project.value = await fetchProject(id)
      isLoading.value = false
    })

    return { isLoading, project, moment, convertOembed }
  }
}
</script>