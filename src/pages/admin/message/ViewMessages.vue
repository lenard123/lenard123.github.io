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
  <div class="py-8">
    <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
      <h2 class="text-xl leading-tight text-gray-700">Message From: {{ email }}</h2>
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded bg-white p-4">
        <div class="flex border-b border-gray-100 py-4" v-for="message in messages" :key="message.createdAt">
          <img src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg" class="w-12 h-12 rounded-full shadow-lg mr-4"/>
          <div class="flex-grow">
            <div class="flex flex-col sm:flex-row sm:justify-between">
              <div class="text-xl text-gray-800">{{ message.name }}</div>
              <div class="text-sm text-gray-400 sm:self-center">
                {{ lastReceived(message) }}
              </div>
            </div>
            <div class="text-md text-gray-500">
              <p v-html="parseMessage(message.message)"></p>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { seenMessage } from '@/firebase/message.js'
import { escapeHTML } from '@/util'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    const email = computed(() => route.params.email)
    
    const messages = computed(() => {
      const allMessages = store.getters.messages
      const messages = allMessages.find(message => message.email === email.value)
      return messages ? messages.messages : []
    })

    const lastReceived = (message) => {
      return moment(message.createdAt.toDate()).from()
    }

    const parseMessage = (message) => {
      return escapeHTML(message).replaceAll('\n', '<br/>')
    }

    onMounted(() => {
      seenMessage(email.value)
    })

    return { email,  messages, lastReceived, parseMessage }
  }
}
</script>