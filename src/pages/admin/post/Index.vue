<template>
<!-- breadcrumb -->
<nav class="text-sm font-semibold mb-3" aria-label="Breadcrumb">
  <ol class="list-none p-0 inline-flex">
    <li class="flex items-center">
      <router-link :to="{name: 'AdminManagePost'} " class="text-gray-500">Manage Post</router-link>
    </li>
  </ol>
</nav>
<!-- breadcrumb end -->


<div class="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <div class="w-full">
            <h2 class="text-2xl leading-tight mb-4">
                All Posts
            </h2>
            <div class="flex flex-col sm:flex-row justify-between w-full">
              <div class="relative max-w-lg mb-2 sm:mb-0">
                <input aria-label="Search posts" type="text" placeholder="Search posts" class="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100" v-model="filter">

                <svg class="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

              </div>


              <router-link :to="{name: 'AdminCreatePost'}" class="py-2 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                  Create Posts
              </router-link>

            </div>
            </div>
          </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    Title
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
                          <tr v-if="fetchState === 'LOADING'">
                            <td 
                              colspan="5"
                              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
                              Loading data <i class="fa fa-spinner spin"></i>
                            </td>
                          </tr>
                          <tr v-else-if="fetchState === 'ERROR'">
                            <td
                              colspan="5"
                              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
                              An error occured
                            </td>
                          </tr>
                          <tr v-else-if="posts.length === 0">
                            <td
                              colspan="5"
                              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
                              You don't have any posts
                            </td> 
                          </tr>
                          <tr v-else-if="filteredPosts.length === 0">
                            <td
                              colspan="5"
                              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
                              No post found
                            </td> 
                          </tr>
                          <tr v-for="post in filteredPosts" :key="post.id">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ post.title }}</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap">{{ parseDate(post.createdAt) }}</td>
                            <td class="px-5 py-5 uppercase border-b border-gray-200 bg-white text-sm">
                                <Pill :type="getPillType(post.status)">{{ post.status }}</Pill>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <router-link 
                                    :to="{name: 'AdminUpdatePost', params:{id:post.id}}" 
                                    class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                                    <i class="fa fa-edit"></i>
                                    Edit
                                </router-link>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button class="text-red-600 hover:text-red-900 whitespace-nowrap" @click="openDeleteModal(post.id)">
                                    <i class="fa fa-trash"></i>
                                    Delete
                                </button>
                            </td>
                          </tr>
                        </tbody>

                        <!--
                        <tbody>
                            <tr>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0">
                                            <a href="#" class="block relative">
                                                <img alt="profil" src="/images/person/8.jpg" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                Jean marc
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        -->
                    </table>
                    <div class="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                        <div class="flex items-center">
                            <button type="button" class="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                            <button type="button" class="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                1
                            </button>
                            <button type="button" class="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                2
                            </button>
                            <button type="button" class="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                3
                            </button>
                            <button type="button" class="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                4
                            </button>
                            <button type="button" class="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    </div>

    <DeleteModal ref="deleteModalRef" @delete="removePost"/>

</template>

<script>

import { usePostsFetcher } from '@/mixins'
import { onMounted, ref, computed } from 'vue'
import { parseDate } from '@/util'
import DeleteModal from './Delete.vue'

export default {

  components: { DeleteModal },

  setup() {
    const { posts, fetchState, fetchPosts } = usePostsFetcher()
    const filter = ref('')
    const deleteModalRef = ref(null)

    const showModal = ref(false)
    //const deletePost = ref(null)

    const openDeleteModal = (id) => {
        deleteModalRef.value.open(id)
        /*deletePost.value = id
        showModal.value = true*/
    }

    const removePost = (id) => {
        posts.shift(posts.find(post => post.id === id))
    }

    const getPillType = (status) => {
        if (status === 'published') return 'success'
        if (status === 'draft') return 'warning'
        if (status === 'unpublished') return 'info'
        return 'danger'
    }


    const filteredPosts = computed(() => {
        return posts.filter(post => post.title.toUpperCase().includes(filter.value.toUpperCase()) )
    })

    onMounted(() => {
      fetchPosts()
    })

    return { 
        fetchState, 
        parseDate, 
        getPillType, 
        filter, 
        filteredPosts, 
        posts, 
        showModal,
        openDeleteModal,
        deleteModalRef,
        removePost
    }
  }
}

</script>