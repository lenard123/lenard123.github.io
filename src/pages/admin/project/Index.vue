<template>
<!-- breadcrumb -->
<nav class="text-sm font-semibold mb-3" aria-label="Breadcrumb">
  <ol class="list-none p-0 inline-flex">
  <li class="flex items-center">
    <router-link :to="{name: 'AdminManageProjects'} " class="text-gray-500">Manage Projects</router-link>
  </li>
  </ol>
</nav>
<!-- breadcrumb end -->

<div class="container mx-auto px-4 sm:px-8 max-w-6xl">
  <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
    <h2 class="text-2xl leading-tight self-center">All Projects</h2>
    <router-link :to="{name: 'AdminAddProject'}" class="py-2 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
      Add Project
    </router-link>
  </div>

  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
              Name
            </th>
            <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
              Created at
            </th>
            <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
              status
            </th>
            <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
            </th>
            <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
            </th>
          </tr>
        </thead>

        <tbody>

          <tr v-if="isLoading">
            <td 
              colspan="5"
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
              Loading data <i class="fa fa-spinner spin"></i>
            </td>
          </tr>
          <tr v-else-if="projects.length === 0">
            <td 
              colspan="5"
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
              No projects added <i class="fa fa-spinner spin"></i>
            </td>
          </tr>
          <tr v-for="project in projects" :key="project.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div class="flex">
                <img :src="project.image" class="w-20 max-h-10 mr-2"/>
                <div class="flex flex-col">
                  <span class="text-md">{{ project.name }}</span>
                  <span class="text-sm text-gray-500">{{ project.tags }}</span>
                </div>
              </div>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ moment(project.createdAt.toDate()).format('MMMM DD, YYYY') }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <Pill :type="project.status">{{ project.status }}</Pill>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <router-link :to="{ name:'AdminEditProject', params: {id: project.id} }" class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                    <i class="fa fa-edit"></i>
                    Edit
                </router-link>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="text-red-600 hover:text-red-900 whitespace-nowrap">
                    <i class="fa fa-trash"></i>
                    Delete
                </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>

</div>

</template>

<script>
import { fetchProjects } from '@/firebase/project.js'
import { onMounted, ref } from 'vue'
import moment from 'moment'

export default {

  setup() {

    const isLoading = ref(true)
    const projects = ref([])

    onMounted(async() => {
      projects.value = await fetchProjects()
      isLoading.value = false
    })

    return { isLoading, projects, moment }
  }

}
</script>