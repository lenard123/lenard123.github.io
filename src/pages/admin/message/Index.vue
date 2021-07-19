<template>

<!-- breadcrumb -->
<nav class="text-sm font-semibold mb-3" aria-label="Breadcrumb">
  <ol class="list-none p-0 inline-flex">
    <li class="flex items-center">
      <a href="#" class="text-gray-500">Inbox</a>
    </li>
  </ol>
</nav>
<!-- breadcrumb end -->

<div class="container mx-auto px-4 sm:px-8 max-w-6xl">
    <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
      <h2 class="text-2xl leading-tight">All Messages</h2>
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Email Address
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                Message
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                Date Received
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-right text-sm uppercase font-normal">
              </th>
            </tr>
          </thead>
          <tbody>

            <tr v-if="messages.length === 0">
              <td
                colspan="4"
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center mr-4">
                You don't have any messages
              </td>
            </tr>

            <tr v-for="message in messages" :key="message.email">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <router-link 
                  :to="{name: 'AdminViewMessages', params: { email: message.email }}" 
                  class="text-blue-500 hover:text-blue-700">{{ message.email }}
                </router-link>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <span class="font-bold" v-if="unreadMessages(message) > 0">
                  ({{ unreadMessages(message) }}) unread messages
                </span>
                <span v-else>
                  No unread message
                </span>  
              </td>              
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                {{ lastReceived(message) }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button class="text-red-600 hover:text-red-900 whitespace-nowrap">
                      <i class="fa fa-trash"></i>
                      Delete
                  </button>
              </td>        
            </tr>

            <!--
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href="#" class="text-blue-500 hover:text-blue-700">lenard.mangayayam@gmail.com</a>
              </td>
              <td class="px-5 font-bold py-5 border-b border-gray-200 bg-white text-sm text-center">
                (5) unread messages
              </td>              
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                2 days ago
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button class="text-red-600 hover:text-red-900 whitespace-nowrap">
                      <i class="fa fa-trash"></i>
                      Delete
                  </button>
              </td>              
            </tr>
            -->
            <!--
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
            -->
          </tbody>
        </table>
      </div>
    </div>
</div>

</template>

<script>

import { useStore } from 'vuex'
import { computed } from 'vue'
import moment from 'moment'

export default {
  setup() {
    const store = useStore()
    const messages = computed(() => store.getters.messages)

    window.moment = moment
    const lastReceived = (message) => {
      return moment(message.messages[0].createdAt.toDate()).from()
    }

    const unreadMessages = (message) => {
      return message.messages.reduce((accm, message)=>{
        return message.hasSeen ? accm : accm + 1
      }, 0)
    }


    return { messages, lastReceived, unreadMessages }
  }
}

</script>