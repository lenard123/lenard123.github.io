<template>

  <div class="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 pt-20">

    <div class="pt-6 pb-8 space-y-2 md:space-y-5">

      <h1 class="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">Projects</h1>

      <div class="text-gray-500">
        This is the list of Projects that I have created using different technologies.
      </div>
    </div>

    <div class="border-t border-gray-300 pt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

      <span v-if="isLoading"> Loading Projects <i class="fa fa-spinner ml-2 spin"></i></span>
      <span v-else-if="projects.length === 0"> There is no project added yet.</span>

      <div v-for="project in projects" :key="project.id" class="border border-gray-300 rounded flex flex-col">
        <div class="w-full relative h-0" style="padding-bottom: 56.25%;">
          <img :src="project.image" class="h-full w-full absolute top-0 left-0"/>
        </div>
        <div class="p-5 flex-grow">
          <p class="mb-2 text-xs font-semibold text-gray-600 uppercase">
            {{ moment(project.createdAt.toDate()).format('MMMM DD, YYYY') }}
          </p>
          <router-link :to="{name: 'ViewProject', params: {id: project.id}}" aria-label="Article" class="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">
            <p class="text-2xl font-bold leading-5">{{ project.name }}</p>
          </router-link>
          <p class="text-gray-700">
            {{ project.description }}
          </p>
        </div>
        <div class="pr-10 mb-4 text-base font-medium leading-6 text-lg text-right">
          <router-link class="text-green-500 hover:text-green-600" :to="{name: 'ViewProject', params: {id: project.id}}">Read more →</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { fetchPublishedProjects } from '@/firebase/project.js'
import { ref, onMounted } from 'vue'
import moment from 'moment'

export default {
  setup() {

    const isLoading = ref(true)
    const projects = ref([])

    onMounted(async () => {
      try{
        projects.value = await fetchPublishedProjects()
        isLoading.value = false
      } catch (error) {
        console.log(error)
      }
    })

    return { isLoading, projects, moment }
  }
}
</script>